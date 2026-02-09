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
    avatar?: string; // URL or placeholder
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
        interviewerStart: string; // "Impressed by..." or "Concerns about..."
        score: number; // 1-10 hidden score? Or just qualitative.
    };
    attributes: CandidateAttributes;
    outcome: CandidateOutcome;
    flags: {
        red: string[];
        green: string[];
    };
    status: 'pool' | 'screened' | 'interviewed' | 'rejected' | 'hired';
}

export interface Message {
    id: string;
    sender: string;
    role: string;
    content: string;
    triggerPhase: Phase;
    effect?: {
        type: 'budget_cut' | 'urgency_increase' | 'force_interview';
        value?: any;
    };
    isRead: boolean;
}

export interface GameState {
    phase: Phase;
    candidates: Candidate[];
    messages: Message[];
    budget: number;
    urgency: number; // 0-100
    selectedCandidates: string[]; // IDs
    finalChoice: string | null;
}
