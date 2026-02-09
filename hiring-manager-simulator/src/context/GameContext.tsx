import React, { createContext, useContext, useState } from 'react';
import type { Candidate, GameState, Phase, Message } from '../types';
import { candidates as initialCandidates } from '../data/candidates';
import { messages as initialMessages } from '../data/scenarios';

interface GameContextType extends GameState {
    gameState: 'landing' | 'job_posting' | 'playing';
    showJobPosting: () => void;
    startGame: () => void;
    resetGame: () => void;
    nextPhase: () => void;
    toggleCandidateSelection: (id: string) => void;
    makeFinalDecision: (id: string) => void;
    markMessageRead: (id: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [gameState, setGameState] = useState<'landing' | 'job_posting' | 'playing'>('landing');
    const [phase, setPhase] = useState<Phase>('screening');
    const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
    const [messages, setMessages] = useState<Message[]>([]);
    const [budget, setBudget] = useState(120000);
    const [urgency, setUrgency] = useState(0);
    const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
    const [finalChoice, setFinalChoice] = useState<string | null>(null);

    const resetGame = () => {
        setGameState('landing');
        setPhase('screening');
        setCandidates(initialCandidates);
        setMessages([]);
        setBudget(120000);
        setUrgency(0);
        setSelectedCandidates([]);
        setFinalChoice(null);
    };

    const showJobPosting = () => {
        setGameState('job_posting');
    };

    const startGame = () => {
        setGameState('playing');
        setPhase('screening');
        setCandidates(initialCandidates.map(c => ({ ...c, status: 'pool' })));
        setMessages([]);
        setBudget(120000);
        setUrgency(10);
        setSelectedCandidates([]);
        setFinalChoice(null);

        // Trigger initial messages
        const initialMsgs = initialMessages.filter(m => m.triggerPhase === 'screening');
        setMessages(initialMsgs);
    };

    const nextPhase = () => {
        if (phase === 'screening') {
            // Move selected candidates to interview stage
            setCandidates(prev => prev.map(c => ({
                ...c,
                status: selectedCandidates.includes(c.id) ? 'interviewed' : 'rejected'
            })));
            setPhase('interviews');
            setSelectedCandidates([]);

            // Trigger interview messages
            const newMsgs = initialMessages.filter(m => m.triggerPhase === 'interviews');
            setMessages(prev => [...prev, ...newMsgs]);

            // Apply effects
            newMsgs.forEach(msg => {
                if (msg.effect?.type === 'budget_cut') {
                    setBudget(b => b - (msg.effect?.value || 0));
                }
            });

            // Special Scenario: Inject "Brett Johnson" (The Nephew) if triggered
            // We force him into the list if he wasn't already selected (he wasn't visible before)
            // Assuming his ID is known or we find him by name/role
            const nephew = candidates.find(c => c.name.includes("Nephew"));
            if (nephew) {
                setCandidates(prev => prev.map(c =>
                    c.id === nephew.id ? { ...c, status: 'interviewed' } : c
                ));
            }
        } else if (phase === 'interviews') {
            // Ready for decision
            setPhase('decision');
            // Trigger decision messages
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
        // Logic depends on phase
        if (phase === 'screening') {
            // Allow selecting up to 6
            if (selectedCandidates.includes(id)) {
                setSelectedCandidates(prev => prev.filter(cid => cid !== id));
            } else {
                if (selectedCandidates.length < 6) {
                    setSelectedCandidates(prev => [...prev, id]);
                }
            }
        } else if (phase === 'interviews') {
            // Allow selecting up to 3 finalists (or just moving to decision)
            // Let's say in interview phase we select the 3 finalists? 
            // Or we just review notes and then move to decision where we pick 1 from the pool of interviewed.
            // The prompt says: "Review interview notes for your 5-6 candidates, select 3 for final round"
            // So we need another filter step.
            // Let's implement logic: Screening -> Interview Pool (5-6) -> Finalist Pool (3) -> Decision (1)
            // But keeping it simple: Screening -> Interview Pool -> Decision (from Interview Pool)
            // Actually user requested: "Select 3 for final round".
            // So Interview Phase should filter 'interviewed' down to 'finalist'?
            // Let's stick to the simpler flow first: Screen -> Interview (Review Notes) -> Decision (Pick 1).
            // Or do we want to strictly follow the prompt? "select 3 for final round".
            // If so, we need 'finalist' status.
            // Let's implicitly assume the ones NOT rejected in interview phase are finalists.
            // But wait, the context has `selectedCandidates`. We can use that.

            // During interview phase, selecting a candidate means they go to final round.
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

    // Initialize game on mount - REMOVED to allow Landing Page
    // useEffect(() => {
    //     startGame();
    // }, []);

    return (
        <GameContext.Provider value={{
            gameState, phase, candidates, messages, budget, urgency, selectedCandidates, finalChoice,
            showJobPosting, startGame, resetGame, nextPhase, toggleCandidateSelection, makeFinalDecision, markMessageRead
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
