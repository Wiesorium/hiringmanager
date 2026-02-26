import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Candidate, GameState, Phase, Message, ApplicantEvent } from '../types';
import { getCandidatesForJob } from '../data/candidates';
import { scenarios as staticScenarios } from '../data/scenarios';
import { jobs as staticJobs } from '../data/jobs';
import { fetchSimulations, joinNewsletter, generateSimulation, type ApiSimulation } from '../services/api';

// ─── Types ────────────────────────────────────────────────────────────────────

interface GameContextType extends GameState {
    gameState: 'company_home' | 'b2c_home' | 'applicant_intro' | 'job_posting' | 'playing';
    setGameState: (state: 'company_home' | 'b2c_home' | 'applicant_intro' | 'job_posting' | 'playing') => void;
    selectJob: (jobId: string) => void;
    startGame: () => void;
    resetGame: () => void;
    nextPhase: () => void;
    toggleCandidateSelection: (id: string) => void;
    makeFinalDecision: (id: string) => void;
    markMessageRead: (id: string) => void;
    markApplicantEventRead: (id: string) => void;
    /** All available jobs (static + API-generated, deduplicated by id) */
    availableJobs: typeof staticJobs;
    /** True while fetching simulations from the API */
    simulationsLoading: boolean;
    /** Subscribe an email to the newsletter via the backend */
    subscribeNewsletter: (email: string) => Promise<{ is_new: boolean; message: string } | null>;
    /** Call the GPT endpoint to generate a new simulation, add it to the pool, and select it */
    generateAndAddSimulation: (jobDescription: string) => Promise<string | null>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const GameContext = createContext<GameContextType | undefined>(undefined);

function sampleApplicantEvents(events: ApplicantEvent[], phase: Phase): ApplicantEvent[] {
    return events.filter(e => e.triggerPhase === phase && Math.random() < 0.6);
}

/** Convert an ApiSimulation's candidates array to the typed Candidate[] shape */
function normalizeCandidates(raw: any[]): Candidate[] {
    return raw.map(c => ({ ...c, status: 'pool' as const }));
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function GameProvider({ children }: { children: React.ReactNode }) {
    // Game UI state
    const [gameState, setGameState] = useState<'company_home' | 'b2c_home' | 'applicant_intro' | 'job_posting' | 'playing'>('company_home');
    const [phase, setPhase] = useState<Phase>('screening');
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [applicantEvents, setApplicantEvents] = useState<ApplicantEvent[]>([]);
    const [budget, setBudget] = useState(0);
    const [urgency, setUrgency] = useState(0);
    const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
    const [finalChoice, setFinalChoice] = useState<string | null>(null);

    // API-loaded simulations (merged with static data)
    const [apiSimulations, setApiSimulations] = useState<ApiSimulation[]>([]);
    const [simulationsLoading, setSimulationsLoading] = useState(true);

    // ── Fetch API simulations on mount ──────────────────────────────────────
    useEffect(() => {
        fetchSimulations()
            .then(sims => setApiSimulations(sims))
            .finally(() => setSimulationsLoading(false));
    }, []);

    // ── Derived: merged job list (API jobs + static, API takes priority) ────
    const availableJobs = React.useMemo(() => {
        const apiJobs = apiSimulations
            .filter(s => s.job)
            .map(s => s.job)
            .filter(Boolean);

        // Keep static jobs that don't have an API equivalent
        const apiJobIds = new Set(apiJobs.map(j => j.id));
        const filteredStatic = staticJobs.filter(j => !apiJobIds.has(j.id));

        return [...apiJobs, ...filteredStatic];
    }, [apiSimulations]);

    // ── Helpers to resolve scenario/candidates (API first, static fallback) ─

    const resolveScenario = useCallback((jobId: string) => {
        const apiSim = apiSimulations.find(s => s.jobId === jobId || s.job?.id === jobId);
        // Guard: must be a real object with a messages array, not a raw JSON string
        if (
            apiSim?.scenario &&
            typeof apiSim.scenario === 'object' &&
            Array.isArray((apiSim.scenario as any).messages)
        ) {
            return apiSim.scenario as { jobId: string; messages: Message[]; applicantEvents: ApplicantEvent[] };
        }
        return staticScenarios.find(s => s.jobId === jobId) ?? null;
    }, [apiSimulations]);

    const resolveCandidates = useCallback((jobId: string): Candidate[] => {
        const staticOnes = getCandidatesForJob(jobId).map(c => ({ ...c, status: 'pool' as const }));
        const apiSim = apiSimulations.find(s => s.jobId === jobId || s.job?.id === jobId);
        const apiOnes = apiSim?.candidates?.length ? normalizeCandidates(apiSim.candidates) : [];

        // Merge: static first, then API additions – deduplicate by id
        const seen = new Set(staticOnes.map(c => c.id));
        const merged = [...staticOnes, ...apiOnes.filter(c => !seen.has(c.id))];
        return merged;
    }, [apiSimulations]);

    const resolveJob = useCallback((jobId: string) => {
        const apiSim = apiSimulations.find(s => s.jobId === jobId || s.job?.id === jobId);
        if (apiSim?.job) return apiSim.job;
        return staticJobs.find(j => j.id === jobId) ?? null;
    }, [apiSimulations]);

    // ── Game actions ──────────────────────────────────────────────────────────

    const resetGame = () => {
        setGameState('company_home');
        setPhase('screening');
        setSelectedJobId(null);
        setCandidates([]);
        setMessages([]);
        setApplicantEvents([]);
        setBudget(0);
        setUrgency(0);
        setSelectedCandidates([]);
        setFinalChoice(null);
    };

    const selectJob = (jobId: string) => {
        setSelectedJobId(jobId);
        setCandidates(resolveCandidates(jobId));
        setGameState('job_posting');
    };

    const startGame = () => {
        if (!selectedJobId) return;

        setGameState('playing');
        setPhase('screening');
        setSelectedCandidates([]);
        setFinalChoice(null);

        const job = resolveJob(selectedJobId);
        setBudget(job?.budget ?? 80000);
        setUrgency(10);

        setCandidates(resolveCandidates(selectedJobId));

        const scenario = resolveScenario(selectedJobId);
        if (scenario) {
            setMessages(scenario.messages.filter((m: Message) => m.triggerPhase === 'screening'));
            setApplicantEvents(sampleApplicantEvents(scenario.applicantEvents, 'screening'));
        }
    };

    const nextPhase = () => {
        const scenario = resolveScenario(selectedJobId!);

        if (phase === 'screening') {
            setCandidates(prev => prev.map(c => ({
                ...c,
                status: selectedCandidates.includes(c.id) ? 'interviewed' : 'rejected'
            })));
            setPhase('interviews');
            setSelectedCandidates([]);

            if (scenario) {
                const newMsgs = scenario.messages.filter((m: Message) => m.triggerPhase === 'interviews');
                setMessages(prev => [...prev, ...newMsgs]);

                newMsgs.forEach((msg: Message) => {
                    if (msg.effect?.type === 'budget_cut') {
                        setBudget(b => b - (msg.effect?.value ?? 0));
                    }
                });

                setApplicantEvents(prev => [...prev, ...sampleApplicantEvents(scenario.applicantEvents, 'interviews')]);
            }
        } else if (phase === 'interviews') {
            setPhase('decision');

            if (scenario) {
                const newMsgs = scenario.messages.filter((m: Message) => m.triggerPhase === 'decision');
                setMessages(prev => [...prev, ...newMsgs]);

                newMsgs.forEach((msg: Message) => {
                    if (msg.effect?.type === 'urgency_increase') {
                        setUrgency(u => u + (msg.effect?.value ?? 0));
                    }
                });

                setApplicantEvents(prev => [...prev, ...sampleApplicantEvents(scenario.applicantEvents, 'decision')]);
            }
        } else if (phase === 'decision') {
            if (finalChoice) {
                setPhase('reveal');
                setCandidates(prev => prev.map(c => ({
                    ...c,
                    status: c.id === finalChoice ? 'hired' : c.status
                })));
            }
        }
    };

    const toggleCandidateSelection = (id: string) => {
        if (phase === 'screening') {
            setSelectedCandidates(prev =>
                prev.includes(id) ? prev.filter(cid => cid !== id)
                    : prev.length < 6 ? [...prev, id] : prev
            );
        } else if (phase === 'interviews') {
            setSelectedCandidates(prev =>
                prev.includes(id) ? prev.filter(cid => cid !== id)
                    : prev.length < 3 ? [...prev, id] : prev
            );
        }
    };

    const makeFinalDecision = (id: string) => {
        setFinalChoice(id);
        // nextPhase reads finalChoice from state, but state hasn't updated yet –
        // so we inline the reveal transition here instead.
        setPhase('reveal');
        setCandidates(prev => prev.map(c => ({
            ...c,
            status: c.id === id ? 'hired' : c.status
        })));
    };

    const markMessageRead = (id: string) => {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
    };

    const markApplicantEventRead = (id: string) => {
        setApplicantEvents(prev => prev.map(e => e.id === id ? { ...e, isRead: true } : e));
    };

    const subscribeNewsletter = useCallback((email: string) => {
        return joinNewsletter(email);
    }, []);

    const generateAndAddSimulation = useCallback(async (jobDescription: string): Promise<string | null> => {
        const sim = await generateSimulation(jobDescription);
        if (!sim) return null;
        // Normalise: backend returns { job, scenario, candidates } — map to ApiSimulation shape
        const normalised: ApiSimulation = {
            jobId: sim.job?.id ?? (sim as any).jobId ?? 'generated',
            jobTitle: sim.job?.title ?? '',
            description: sim.job?.description ?? '',
            salaryRange: sim.job?.salaryRange ?? '',
            budget: sim.job?.budget ?? 80000,
            requirements: sim.job?.requirements ?? [],
            job: sim.job ?? (sim as any).job,
            scenario: (sim as any).scenario,
            candidates: (sim as any).candidates ?? [],
            createdAt: new Date().toISOString(),
        };
        setApiSimulations(prev => [normalised, ...prev]);
        return normalised.jobId;
    }, []);

    return (
        <GameContext.Provider value={{
            gameState, setGameState, phase, candidates, messages, applicantEvents,
            budget, urgency, selectedCandidates, finalChoice, selectedJobId,
            availableJobs, simulationsLoading, subscribeNewsletter, generateAndAddSimulation,
            selectJob, startGame, resetGame, nextPhase,
            toggleCandidateSelection, makeFinalDecision,
            markMessageRead, markApplicantEventRead,
        }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) throw new Error('useGame must be used within a GameProvider');
    return context;
}
