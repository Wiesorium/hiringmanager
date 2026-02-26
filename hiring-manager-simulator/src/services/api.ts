/**
 * API service layer for communicating with the Hiring Manager Simulator backend.
 *
 * Base URL: https://app.thediary.games/api/hiring
 *
 * Falls back gracefully: if the API is unavailable, callers should use
 * the static data from jobs.ts / scenarios.ts / candidates.ts.
 */

const BASE_URL = 'https://app.thediary.games/api/hiring';

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
    };
    /** Scenario object: messages + applicantEvents */
    scenario: {
        jobId: string;
        messages: any[];
        applicantEvents: any[];
    };
    /** Array of candidate objects */
    candidates: any[];
    createdAt: string;
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

/**
 * Generate a new simulation from a job description via the backend GPT pipeline.
 * This can take 10-30 seconds – use with a loading indicator.
 * Returns the full simulation object on success, null on error.
 */
export async function generateSimulation(jobDescription: string): Promise<ApiSimulation | null> {
    try {
        const res = await fetch(`${BASE_URL}/generate_sim_from_jobdescription`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ job_description: jobDescription }),
        });
        if (!res.ok) return null;
        const json = await res.json();
        if (json.result_state !== 'success') return null;
        return json.result as ApiSimulation;
    } catch {
        return null;
    }
}
