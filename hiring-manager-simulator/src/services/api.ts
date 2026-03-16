/**
 * API service layer for communicating with the Hiring Manager Simulator backend.
 *
 * Base URL: https://app.thediary.games/api/hiring
 *
 * Falls back gracefully: if the API is unavailable, callers should use
 * the static data from jobs.ts / scenarios.ts / candidates.ts.
 */

// Allow TypeScript to reference the Meta Pixel global
declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

const BASE_URL = 'https://app.thediary.games/api/hiring';

export interface ApiQuestion {
    id: 'q1' | 'q2' | 'q3';
    text: string;
}

export interface ApiSimulation {
    jobId: string;
    jobTitle: string;
    description: string;
    salaryRange: string;
    budget: number;
    requirements: string[];
    /** Full job object as stored */
    job: {
        id: string;
        title: string;
        description: string;
        salaryRange: string;
        requirements: string[];
        budget: number;
        hiringManagerNote?: string;
        daysOnline?: number;
    };
    /** Scenario object: messages + applicantEvents + questions */
    scenario: {
        jobId: string;
        messages: any[];
        applicantEvents: any[];
        questions?: ApiQuestion[];
    };
    /** Array of candidate objects */
    candidates: any[];
    /** 3 shared interview questions */
    questions?: ApiQuestion[];
    /** Current image generation status */
    imageStatus?: 'pending' | 'generating' | 'done' | 'partial';
    createdAt: string;
    /** The raw job description input that was used to generate this simulation */
    sourcePrompt?: string;
}

/**
 * Fetch all stored simulations from the backend, newest first.
 * Returns an empty array on any network / server error.
 */
export async function fetchSimulations(): Promise<ApiSimulation[]> {
    try {
        const res = await fetch(`${BASE_URL}/get_simulations`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) return [];
        const json = await res.json();
        if (json.result_state !== 'success') return [];
        return json.result as ApiSimulation[];
    } catch {
        return [];
    }
}

/**
 * Fetch simulations filtered by a specific job id.
 */
export async function fetchSimulationForJob(jobId: string): Promise<ApiSimulation | null> {
    try {
        const res = await fetch(`${BASE_URL}/get_simulations?job_id=${encodeURIComponent(jobId)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) return null;
        const json = await res.json();
        if (json.result_state !== 'success' || !json.result?.length) return null;
        return json.result[0] as ApiSimulation;
    } catch {
        return null;
    }
}

/**
 * Join the Hiring Manager newsletter.
 * Returns { is_new: boolean } on success, null on error.
 */
export async function joinNewsletter(
    email: string,
    metadata?: { rejected_count?: number; monthly_price?: number; source?: string }
): Promise<{ is_new: boolean; message: string } | null> {
    try {
        const res = await fetch(`${BASE_URL}/join_newsletter`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, ...metadata }),
        });
        if (!res.ok) return null;
        const json = await res.json();
        if (json.result_state !== 'success') return null;
        return { is_new: json.is_new, message: json.message };
    } catch {
        return null;
    }
}

export interface GenerateSimulationResult {
    simulation: ApiSimulation;
    jobId: string;
    imageStatus?: string;
    message?: string;
    remaining?: number;
}

/**
 * Generate a new simulation from a job description via the backend GPT pipeline.
 * Stage 1 (~10–20s): returns the full simulation + jobId immediately.
 * Stage 2 (background): images are generated separately; poll via pollSimulationStatus().
 *
 * email is now required — the server sends a notification email when images are ready.
 */
export async function generateSimulation(
    jobDescription: string,
    accessCode?: string,
    email?: string
): Promise<GenerateSimulationResult | null> {
    try {
        const body: Record<string, string> = { job_description: jobDescription };
        if (accessCode) body.access_code = accessCode;
        if (email) body.email = email;
        const res = await fetch(`${BASE_URL}/generate_sim_from_jobdescription`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!res.ok) return null;
        const json = await res.json();
        if (json.result_state !== 'success') return null;
        return {
            simulation: json.result as ApiSimulation,
            jobId: json.jobId ?? (json.result?.job?.id ?? 'generated'),
            imageStatus: json.imageStatus,
            message: json.message,
            remaining: json.remaining,
        };
    } catch {
        return null;
    }
}

export interface SimulationStatusResult {
    jobId: string;
    imageStatus: 'pending' | 'generating' | 'done' | 'partial';
    candidates: { id: string; name: string; imageUrl: string | null }[];
}

/**
 * Poll image generation status for a simulation.
 * Call every 5s after generateSimulation() returns. Stop when imageStatus is 'done' or 'partial'.
 */
export async function pollSimulationStatus(jobId: string): Promise<SimulationStatusResult | null> {
    try {
        const res = await fetch(`${BASE_URL}/simulation_status/${encodeURIComponent(jobId)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) return null;
        const json = await res.json();
        if (json.result_state !== 'success') return null;
        return {
            jobId: json.jobId,
            imageStatus: json.imageStatus,
            candidates: json.candidates ?? [],
        };
    } catch {
        return null;
    }
}

/**
 * Validate an access code and get remaining generation count.
 * Returns { valid, remaining } on success, null on network error.
 */
export async function validateAccessCode(code: string): Promise<{ valid: boolean; remaining: number } | null> {
    try {
        const res = await fetch(`${BASE_URL}/validate_code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
        });
        if (!res.ok) return null;
        const json = await res.json();
        if (json.result_state !== 'success') return null;
        return { valid: json.valid, remaining: json.remaining };
    } catch {
        return null;
    }
}

/**
 * Create an access code after Stripe payment.
 * Sends the Stripe session_id to the backend which verifies payment and generates a code.
 */
export async function createAccessCode(stripeSessionId: string): Promise<{ code: string; remaining: number } | null> {
    try {
        const res = await fetch(`${BASE_URL}/create_code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stripe_session_id: stripeSessionId }),
        });
        if (!res.ok) return null;
        const json = await res.json();
        if (json.result_state !== 'success') return null;
        return { code: json.code, remaining: json.remaining };
    } catch {
        return null;
    }
}

/**
 * Track a single user interaction — creates one :Interaction node in Neo4j.
 * Fire-and-forget — never throws, never blocks gameplay.
 */
export type InteractionEvent =
    | 'cta_clicked'
    | 'job_selection_viewed'
    | 'stripe_link_clicked'
    | 'code_validated'
    | 'simulation_generation_started'
    | 'free_job_selected'
    | 'simulation_started'
    | 'screening_done'
    | 'interviews_done'
    | 'decision_done'
    | 'newsletter_submitted'
    | 'podcast_request_submitted'
    | 'feedback_submitted';

// ── Session tracking ─────────────────────────────────────────────────────────
// Generates a UUID once per browser session (resets when tab is closed).
// Stored in sessionStorage — no PII, GDPR-safe.
function getSessionId(): string {
    const key = 'hms_session_id';
    let id = sessionStorage.getItem(key);
    if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem(key, id);
    }
    return id;
}

export async function trackInteraction(
    event: InteractionEvent,
    meta?: Record<string, unknown>
): Promise<void> {
    try {
        await fetch(`${BASE_URL}/track_interaction`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event,
                meta: {
                    ...(meta ?? {}),
                    sessionId: getSessionId(),
                    clientTs: Date.now(),   // ms since epoch — use for time-between-steps
                },
            }),
        });
    } catch {
        // Fire-and-forget — never breaks the game
    }
}

/**
 * Submit player feedback from the final reveal screen.
 * Returns true on success, false on any error.
 */
export async function submitFeedback(payload: {
    feedback: string;
    email?: string;
}): Promise<boolean> {
    try {
        const res = await fetch(`${BASE_URL}/submit_feedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!res.ok) return false;
        const json = await res.json();
        return json.result_state === 'success';
    } catch {
        return false;
    }
}
