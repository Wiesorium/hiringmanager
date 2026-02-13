// No strict enum for role in the file, it is string.
// However, let's verify if 'jobs.ts' uses a specific type.
// It uses 'Job' interface where ID is string.
// So we should be safe.
// I will just add a comment to index.ts to force a refresh if needed, 
// or I can improve the type safety.
// Actually, I'll update the Candidate interface to be more descriptive if possible, 
// but for now, I'll just leave it as is to avoid breaking changes.
// I'll update the 'Job' interface to include the new IDs in a comment for documentation?
// No, I'll just skip this if no changes are needed.
// Wait, I see I already made a mistake in the previous tool call thinking I was editing index.ts but I didn't actually submit a valid edit because I was "checking".
// Let's actually look at the file content I just viewed.
// 'role' in Candidate is `string`.
// 'id' in Job is `string`.
// So no type updates are strictly necessary for the code to run.
// I can proceed to verification.

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
    status: 'pool' | 'screened' | 'interviewed' | 'hired' | 'rejected';
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

export interface Job {
    id: string;
    title: string;
    description: string;
    salaryRange: string;
    requirements: string[];
    budget: number;
}

export interface GameState {
    phase: Phase;
    candidates: Candidate[];
    messages: Message[];
    budget: number;
    urgency: number; // 0-100
    selectedCandidates: string[]; // IDs
    finalChoice: string | null;
    selectedJobId: string | null;
}
