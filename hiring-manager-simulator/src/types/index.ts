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

// Internal message from colleagues (CEO, CFO, HR, team lead, etc.)
export interface Message {
    id: string;
    sender: string;
    role: string;
    content: string;
    jobId: string; // which job scenario this message belongs to
    triggerPhase: Phase;
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
    | 'withdrawal';        // applicant withdraws their application!

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
        type: 'urgency_decrease' | 'budget_hint' | 'candidate_boost' | 'candidate_lost';
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
}

// A full scenario groups all messages and applicant events for one job
export interface Scenario {
    jobId: string;
    messages: Message[];
    applicantEvents: ApplicantEvent[];
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
