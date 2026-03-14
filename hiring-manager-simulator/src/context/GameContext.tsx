import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { Candidate, GameState, Phase, Message, ApplicantEvent, Question } from '../types';
import { getCandidatesForJob } from '../data/candidates';
import { scenarios as staticScenarios } from '../data/scenarios';
import { jobs as staticJobs } from '../data/jobs';
import { fetchSimulations, joinNewsletter, generateSimulation, pollSimulationStatus, trackEvent, type ApiSimulation } from '../services/api';

// ─── Types ────────────────────────────────────────────────────────────────────

interface GameContextType extends GameState {
    gameState: 'b2c_home' | 'applicant_intro' | 'job_posting' | 'playing' | 'impressum' | 'datenschutz';
    setGameState: (state: 'b2c_home' | 'applicant_intro' | 'job_posting' | 'playing' | 'impressum' | 'datenschutz') => void;
    selectJob: (jobId: string) => void;
    startGame: () => void;
    resetGame: () => void;
    nextPhase: () => void;
    toggleCandidateSelection: (id: string) => void;
    rejectCandidate: (id: string) => void;
    makeFinalDecision: (id: string) => void;
    markMessageRead: (id: string) => void;
    markApplicantEventRead: (id: string) => void;
    /** All available jobs (static + API-generated, deduplicated by id) */
    availableJobs: typeof staticJobs;
    /** True while fetching simulations from the API */
    simulationsLoading: boolean;
    /** Subscribe an email to the newsletter via the backend */
    subscribeNewsletter: (email: string) => Promise<{ is_new: boolean; message: string } | null>;
    generateAndAddSimulation: (jobDescription: string, accessCode?: string, email?: string) => Promise<{ jobId: string; remaining?: number; message?: string } | null>;
    /** The 3 shared interview questions for the currently selected simulation */
    activeQuestions: Question[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const GameContext = createContext<GameContextType | undefined>(undefined);

/** Sample applicant events for this phase, only for candidates still active (unless it's a withdrawal) */
function sampleApplicantEvents(
    events: ApplicantEvent[],
    phase: Phase,
    activeCandidateIds?: Set<string>
): ApplicantEvent[] {
    return events.filter(e => {
        if (e.triggerPhase !== phase) return false;
        // Withdrawals can fire for any candidate regardless of active status
        if (e.type === 'withdrawal') return Math.random() < 0.6;
        // Other events: only fire if candidate is still in the active pool (or no filter provided)
        if (activeCandidateIds && e.candidateId && !activeCandidateIds.has(e.candidateId)) return false;
        return Math.random() < 0.6;
    });
}

/** Convert an ApiSimulation's candidates array to the typed Candidate[] shape */
function normalizeCandidates(raw: any[]): Candidate[] {
    return raw.map(c => ({ ...c, status: 'pool' as const }));
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function GameProvider({ children }: { children: React.ReactNode }) {
    // Game UI state
    const [gameState, setGameStateRaw] = useState<'b2c_home' | 'applicant_intro' | 'job_posting' | 'playing' | 'impressum' | 'datenschutz'>(() => {
        return 'b2c_home'; // always start on the B2C landing page
    });
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

    // Image polling ref so we can clear the interval
    const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // ── Sync URL hash with landing page state ────────────────────────────────
    const setGameState = useCallback((state: 'b2c_home' | 'applicant_intro' | 'job_posting' | 'playing' | 'impressum' | 'datenschutz') => {
        setGameStateRaw(state);
        // No special hash handling needed — B2B page is gone
    }, []);

    // ── Fetch API simulations on mount ──────────────────────────────────────
    useEffect(() => {
        fetchSimulations()
            .then(sims => setApiSimulations(sims))
            .finally(() => setSimulationsLoading(false));
    }, []);

    // Cleanup image polling on unmount
    useEffect(() => {
        return () => {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        };
    }, []);

    // ── Start polling a simulation for image URL updates ────────────────────
    const startImagePolling = useCallback((jobId: string) => {
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

        pollIntervalRef.current = setInterval(async () => {
            const status = await pollSimulationStatus(jobId);
            if (!status) return;

            // Patch the imageUrl for each candidate that now has one
            setApiSimulations(prev => prev.map(sim => {
                if (sim.jobId !== jobId && sim.job?.id !== jobId) return sim;
                const updatedCandidates = sim.candidates.map((c: any) => {
                    const freshData = status.candidates.find((sc: any) => sc.id === c.id);
                    if (freshData?.imageUrl && !c.imageUrl) {
                        return { ...c, imageUrl: freshData.imageUrl };
                    }
                    return c;
                });
                return { ...sim, candidates: updatedCandidates, imageStatus: status.imageStatus };
            }));

            // Also patch the live candidates state if this is the active job
            if (jobId === selectedJobId || status.jobId === selectedJobId) {
                setCandidates(prev => prev.map(c => {
                    const freshData = status.candidates.find((sc: any) => sc.id === c.id);
                    if (freshData?.imageUrl && !c.imageUrl) {
                        return { ...c, imageUrl: freshData.imageUrl };
                    }
                    return c;
                }));
            }

            // Stop polling when done or partial
            if (status.imageStatus === 'done' || status.imageStatus === 'partial') {
                if (pollIntervalRef.current) {
                    clearInterval(pollIntervalRef.current);
                    pollIntervalRef.current = null;
                }
            }
        }, 5000);
    }, [selectedJobId]);

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
            return apiSim.scenario as { jobId: string; messages: Message[]; applicantEvents: ApplicantEvent[]; questions?: any[] };
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

    // ── Derived: questions for the active simulation ──────────────────────
    const activeQuestions = React.useMemo((): Question[] => {
        if (!selectedJobId) return [];
        const apiSim = apiSimulations.find(s => s.jobId === selectedJobId || s.job?.id === selectedJobId);
        // Prefer top-level questions, fall back to scenario.questions
        const qs = apiSim?.questions ?? (apiSim?.scenario as any)?.questions ?? [];
        return qs as Question[];
    }, [apiSimulations, selectedJobId]);

    // ── Game actions ──────────────────────────────────────────────────────────

    const resetGame = () => {
        setGameState('b2c_home');
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

        // Track funnel: user started a simulation
        trackEvent('simulation_started');
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
            trackEvent('screening_done');

            if (scenario) {
                const newMsgs = scenario.messages.filter((m: Message) => m.triggerPhase === 'interviews');
                setMessages(prev => [...prev, ...newMsgs]);
                newMsgs.forEach((msg: Message) => {
                    if (msg.effect?.type === 'budget_cut') setBudget(b => b - (msg.effect?.value ?? 0));
                });
                // Only fire events for candidates being promoted to interviews
                const interviewIds = new Set(selectedCandidates);
                setApplicantEvents(prev => [...prev, ...sampleApplicantEvents(scenario.applicantEvents, 'interviews', interviewIds)]);
            }
        } else if (phase === 'interviews') {
            setPhase('decision');
            trackEvent('interviews_done');

            if (scenario) {
                const newMsgs = scenario.messages.filter((m: Message) => m.triggerPhase === 'decision');
                setMessages(prev => [...prev, ...newMsgs]);
                newMsgs.forEach((msg: Message) => {
                    if (msg.effect?.type === 'urgency_increase') setUrgency(u => u + (msg.effect?.value ?? 0));
                });
                // Only fire events for finalists
                const finalistIds = new Set(selectedCandidates);
                setApplicantEvents(prev => [...prev, ...sampleApplicantEvents(scenario.applicantEvents, 'decision', finalistIds)]);
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

    const rejectCandidate = (id: string) => {
        setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' as const } : c));
        setSelectedCandidates(prev => prev.filter(cid => cid !== id));
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
        trackEvent('decision_done'); // funnel: hire made
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

    const generateAndAddSimulation = useCallback(async (
        jobDescription: string,
        accessCode?: string,
        email?: string
    ): Promise<{ jobId: string; remaining?: number; message?: string } | null> => {
        const result = await generateSimulation(jobDescription, accessCode, email);
        if (!result) return null;
        const sim = result.simulation;
        // Normalise: backend returns { job, scenario, candidates } — map to ApiSimulation shape
        const resolvedJobId = result.jobId ?? sim.job?.id ?? (sim as any).jobId ?? 'generated';
        const normalised: ApiSimulation = {
            jobId: resolvedJobId,
            jobTitle: sim.job?.title ?? '',
            description: sim.job?.description ?? '',
            salaryRange: sim.job?.salaryRange ?? '',
            budget: sim.job?.budget ?? 80000,
            requirements: sim.job?.requirements ?? [],
            job: sim.job ?? (sim as any).job,
            scenario: (sim as any).scenario,
            candidates: (sim as any).candidates ?? [],
            questions: (sim as any).questions ?? (sim as any).scenario?.questions ?? [],
            imageStatus: (result.imageStatus as any) ?? 'pending',
            createdAt: new Date().toISOString(),
            sourcePrompt: jobDescription,
        };
        setApiSimulations(prev => [normalised, ...prev]);

        // Start polling for images in the background
        if (normalised.imageStatus === 'pending' || normalised.imageStatus === 'generating') {
            startImagePolling(resolvedJobId);
        }

        return { jobId: resolvedJobId, remaining: result.remaining, message: result.message };
    }, [startImagePolling]);

    return (
        <GameContext.Provider value={{
            gameState, setGameState, phase, candidates, messages, applicantEvents,
            budget, urgency, selectedCandidates, finalChoice, selectedJobId,
            availableJobs, simulationsLoading, subscribeNewsletter, generateAndAddSimulation,
            selectJob, startGame, resetGame, nextPhase,
            toggleCandidateSelection, rejectCandidate, makeFinalDecision,
            markMessageRead, markApplicantEventRead,
            activeQuestions,
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
