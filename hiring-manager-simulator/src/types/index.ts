export type Phase = 'screening' | 'interviews' | 'decision' | 'reveal';

export interface CandidateAttributes {
    experience: number; // Years
    salary: number; // Expected salary
    skills: string[];
    culture: string[];
}

export interface CandidateOutcome {
    title: string;
    description: string;
    type: 'success' | 'mixed' | 'failure';
}

export interface Candidate {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    /** Age of the candidate (22–58). Available on API-generated simulations. */
    age?: number;
    /** Country of origin code, e.g. AT / DE / TR / PL. API-generated only. */
    originCountry?: string;
    /** Internal DALL-E prompt used to generate the profile image. Not displayed. */
    profileImagePrompt?: string;
    /** Profile photo URL (1024×1024 on server, display at 512×512). Null until DALL-E generation completes. */
    imageUrl?: string | null;
    /** True if this candidate was referred via personal connection. */
    nepotismFlag?: boolean;
    /** Candidate's answers to the 3 shared interview questions. */
    questionResponses?: { q1: string; q2: string; q3: string };
    resume: {
        lastRole: string;
        company: string;
        education: string;
        summary: string;
        yearsOfExperience: number;
    };
    coverLetter: string;
    interviewNotes?: {
        strengths: string[];
        weaknesses: string[];
        interviewerStart: string;
        score: number;
    };
    attributes: CandidateAttributes;
    outcome: CandidateOutcome;
    flags: {
        red: string[];
        green: string[];
    };
    status: 'pool' | 'screened' | 'interviewed' | 'hired' | 'rejected';
}

// One of the 3 shared interview questions
export interface Question {
    id: 'q1' | 'q2' | 'q3';
    text: string;
}

// Internal message from colleagues (CEO, CFO, HR, team lead, etc.)
export interface Message {
    id: string;
    sender: string;
    role: string;
    content: string;
    jobId: string; // which job scenario this message belongs to
    triggerPhase: Phase;
    /** Message type: standard colleague/HR message, or a casual flurfunk side-note about a candidate */
    type?: 'standard' | 'flurfunk';
    /** For flurfunk messages: the candidate this message refers to */
    candidateId?: string;
    effect?: {
        type: 'budget_cut' | 'urgency_increase' | 'force_interview';
        value?: any;
    };
    isRead: boolean;
}

// Random event initiated by an applicant (thank-you mails, questions, withdrawals, etc.)
export type ApplicantEventType =
    | 'thank_you_mail'     // after interview — applicant expresses enthusiasm
    | 'question_email'     // before first interview — applicant asks about role/company
    | 'portfolio_link'     // applicant sends additional work samples
    | 'reference_letter'   // applicant sends unsolicited reference
    | 'withdrawal'         // applicant withdraws their application!
    | 'appearance_note';   // interviewer notes candidate looked different from profile photo (no score effect)

export interface ApplicantEvent {
    id: string;
    candidateId: string;       // which applicant sends it (used to highlight them)
    jobId: string;
    triggerPhase: Phase;
    type: ApplicantEventType;
    sender: string;            // display name of the applicant
    subject: string;
    body: string;
    effect?: {
        type: 'urgency_decrease' | 'budget_hint' | 'candidate_boost' | 'candidate_lost' | 'none';
        candidateId?: string;
        value?: number;
    };
    isRead: boolean;
}

export interface Job {
    id: string;
    title: string;
    description: string;
    salaryRange: string;
    requirements: string[];
    budget: number;
    hiringManagerNote?: string;
    /** How many days the posting has been live (7–28). Used as urgency context. */
    daysOnline?: number;
}

// A full scenario groups all messages and applicant events for one job
export interface Scenario {
    jobId: string;
    messages: Message[];
    applicantEvents: ApplicantEvent[];
    /** The 3 shared interview questions the player can ask any candidate */
    questions?: Question[];
}

export interface GameState {
    phase: Phase;
    candidates: Candidate[];
    messages: Message[];
    applicantEvents: ApplicantEvent[];
    budget: number;
    urgency: number; // 0-100
    selectedCandidates: string[]; // IDs
    finalChoice: string | null;
    selectedJobId: string | null;
}
