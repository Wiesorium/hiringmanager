import React, { createContext, useContext, useState } from 'react';
import type { Candidate, GameState, Phase, Message } from '../types';
import { getCandidatesForJob } from '../data/candidates';
import { messages as initialMessages } from '../data/scenarios';
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
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [gameState, setGameState] = useState<'company_home' | 'b2c_home' | 'applicant_intro' | 'job_posting' | 'playing'>('company_home');
    const [phase, setPhase] = useState<Phase>('screening');
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
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
        setBudget(0);
        setUrgency(0);
        setSelectedCandidates([]);
        setFinalChoice(null);
    };

    const selectJob = (jobId: string) => {
        setSelectedJobId(jobId);
        // Initialize candidates based on job
        const jobCandidates = getCandidatesForJob(jobId);
        setCandidates(jobCandidates);
        setGameState('job_posting');
    };

    const startGame = () => {
        setGameState('playing');
        setPhase('screening');

        // Start Budget depends on role? Let's verify scenarios or just set default
        // Scenarios mention 120k for marketing manager, but our roles are cheaper.
        // Let's set budget dynamically based on job if needed, or just a safe pool.
        // For simplicity, we'll set it high enough for 2 hires or just ignore strict budget for now?
        // The messages mention specific numbers (120k). We should probably make that dynamic or ignore.
        // Let's set a generic budget.
        // Set budget based on job or default to 80k
        const job = jobs.find(j => j.id === selectedJobId);
        setBudget(job?.budget || 80000);

        setUrgency(10);
        setSelectedCandidates([]);
        setFinalChoice(null);

        // MAP candidates to 'pool' status explicitly just in case
        if (selectedJobId) {
            setCandidates(getCandidatesForJob(selectedJobId).map(c => ({ ...c, status: 'pool' })));
        }

        // Trigger initial messages
        const initialMsgs = initialMessages.filter(m => m.triggerPhase === 'screening');
        setMessages(initialMsgs);
    };

    const nextPhase = () => {
        if (phase === 'screening') {
            setCandidates(prev => prev.map(c => ({
                ...c,
                status: selectedCandidates.includes(c.id) ? 'interviewed' : 'rejected'
            })));
            setPhase('interviews');
            setSelectedCandidates([]);

            const newMsgs = initialMessages.filter(m => m.triggerPhase === 'interviews');
            setMessages(prev => [...prev, ...newMsgs]);

            newMsgs.forEach(msg => {
                if (msg.effect?.type === 'budget_cut') {
                    setBudget(b => b - (msg.effect?.value || 0));
                }
            });

            // Neffe Logic - Generic if needed
        } else if (phase === 'interviews') {
            setPhase('decision');
            const newMsgs = initialMessages.filter(m => m.triggerPhase === 'decision');
            setMessages(prev => [...prev, ...newMsgs]);

            newMsgs.forEach(msg => {
                if (msg.effect?.type === 'urgency_increase') {
                    setUrgency(u => u + (msg.effect?.value || 0));
                }
            });
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

    return (
        <GameContext.Provider value={{
            gameState, setGameState, phase, candidates, messages, budget, urgency, selectedCandidates, finalChoice, selectedJobId,
            selectJob, startGame, resetGame, nextPhase, toggleCandidateSelection, makeFinalDecision, markMessageRead
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
