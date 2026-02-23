import React, { createContext, useContext, useState } from 'react';
import type { Candidate, GameState, Phase, Message, ApplicantEvent } from '../types';
import { getCandidatesForJob } from '../data/candidates';
import { scenarios } from '../data/scenarios';
import { jobs } from '../data/jobs';

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
}

const GameContext = createContext<GameContextType | undefined>(undefined);

/** Pick applicant events for the current phase with a 60% trigger chance each */
function sampleApplicantEvents(events: ApplicantEvent[], phase: Phase): ApplicantEvent[] {
    return events.filter(e => e.triggerPhase === phase && Math.random() < 0.6);
}

export function GameProvider({ children }: { children: React.ReactNode }) {
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
        const jobCandidates = getCandidatesForJob(jobId);
        setCandidates(jobCandidates);
        setGameState('job_posting');
    };

    const startGame = () => {
        setGameState('playing');
        setPhase('screening');

        const job = jobs.find(j => j.id === selectedJobId);
        setBudget(job?.budget || 80000);
        setUrgency(10);
        setSelectedCandidates([]);
        setFinalChoice(null);

        if (selectedJobId) {
            setCandidates(getCandidatesForJob(selectedJobId).map(c => ({ ...c, status: 'pool' })));
        }

        // Load scenario for selected job
        const scenario = scenarios.find(s => s.jobId === selectedJobId);
        if (scenario) {
            // Trigger screening-phase internal messages
            const initialMsgs = scenario.messages.filter(m => m.triggerPhase === 'screening');
            setMessages(initialMsgs);

            // Trigger screening-phase applicant events (60% chance each)
            const triggered = sampleApplicantEvents(scenario.applicantEvents, 'screening');
            setApplicantEvents(triggered);
        }
    };

    const nextPhase = () => {
        const scenario = scenarios.find(s => s.jobId === selectedJobId);

        if (phase === 'screening') {
            setCandidates(prev => prev.map(c => ({
                ...c,
                status: selectedCandidates.includes(c.id) ? 'interviewed' : 'rejected'
            })));
            setPhase('interviews');
            setSelectedCandidates([]);

            if (scenario) {
                const newMsgs = scenario.messages.filter(m => m.triggerPhase === 'interviews');
                setMessages(prev => [...prev, ...newMsgs]);

                newMsgs.forEach(msg => {
                    if (msg.effect?.type === 'budget_cut') {
                        setBudget(b => b - (msg.effect?.value || 0));
                    }
                });

                const triggered = sampleApplicantEvents(scenario.applicantEvents, 'interviews');
                setApplicantEvents(prev => [...prev, ...triggered]);
            }
        } else if (phase === 'interviews') {
            setPhase('decision');

            if (scenario) {
                const newMsgs = scenario.messages.filter(m => m.triggerPhase === 'decision');
                setMessages(prev => [...prev, ...newMsgs]);

                newMsgs.forEach(msg => {
                    if (msg.effect?.type === 'urgency_increase') {
                        setUrgency(u => u + (msg.effect?.value || 0));
                    }
                });

                const triggered = sampleApplicantEvents(scenario.applicantEvents, 'decision');
                setApplicantEvents(prev => [...prev, ...triggered]);
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
            if (selectedCandidates.includes(id)) {
                setSelectedCandidates(prev => prev.filter(cid => cid !== id));
            } else {
                if (selectedCandidates.length < 6) {
                    setSelectedCandidates(prev => [...prev, id]);
                }
            }
        } else if (phase === 'interviews') {
            if (selectedCandidates.includes(id)) {
                setSelectedCandidates(prev => prev.filter(cid => cid !== id));
            } else {
                if (selectedCandidates.length < 3) {
                    setSelectedCandidates(prev => [...prev, id]);
                }
            }
        }
    };

    const makeFinalDecision = (id: string) => {
        setFinalChoice(id);
        nextPhase();
    };

    const markMessageRead = (id: string) => {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
    };

    const markApplicantEventRead = (id: string) => {
        setApplicantEvents(prev => prev.map(e => e.id === id ? { ...e, isRead: true } : e));
    };

    return (
        <GameContext.Provider value={{
            gameState, setGameState, phase, candidates, messages, applicantEvents, budget, urgency,
            selectedCandidates, finalChoice, selectedJobId,
            selectJob, startGame, resetGame, nextPhase, toggleCandidateSelection,
            makeFinalDecision, markMessageRead, markApplicantEventRead
        }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
