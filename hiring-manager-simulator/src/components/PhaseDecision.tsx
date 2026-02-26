import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Check, AlertTriangle, Eye } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Candidate } from '../types';
import { CandidateProfileModal } from './CandidateProfileModal';

export function PhaseDecision() {
    const { candidates, selectedCandidates, makeFinalDecision, budget } = useGame();
    const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);

    const finalists = candidates.filter(c => selectedCandidates.includes(c.id));

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Phase 3: Finale Entscheidung</h2>
                <p className="text-muted max-w-xl text-sm sm:text-base">
                    Das ist es. Sie haben 3 Finalisten. Vergleichen Sie sie mit dem Budget und der Team-Passung. Machen Sie das Angebot.
                </p>
            </div>

            {/* List — single column on mobile, 3 cols on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {finalists.map(candidate => (
                    <DecisionCard
                        key={candidate.id}
                        candidate={candidate}
                        currentBudget={budget}
                        onSelect={() => makeFinalDecision(candidate.id)}
                        onView={() => setViewingCandidate(candidate)}
                    />
                ))}
            </div>

            <CandidateProfileModal
                candidate={viewingCandidate}
                onClose={() => setViewingCandidate(null)}
                onAction={makeFinalDecision}
                actionLabel="Diesen Kandidaten einstellen"
                isActionSelected={false}
            />
        </div>
    );
}

function DecisionCard({ candidate, currentBudget, onSelect, onView }: { candidate: Candidate, currentBudget: number, onSelect: () => void, onView: () => void }) {
    const isOverBudget = candidate.attributes.salary > currentBudget;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col hover:translate-y-[-4px] transition-transform"
        >
            <div className="p-4 sm:p-6 border-b border-stone-100 bg-stone-50/50">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold leading-tight">{candidate.name}</h3>
                    <button
                        onClick={onView}
                        className="p-2 hover:bg-stone-200 rounded-full text-stone-400 hover:text-ink transition-colors flex-shrink-0"
                        title="Profil ansehen"
                    >
                        <Eye className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted">Gehaltswunsch</span>
                        <span className={cn("font-bold", isOverBudget ? "text-red-500" : "text-green-700")}>
                            € {candidate.attributes.salary.toLocaleString()}
                        </span>
                    </div>
                    {isOverBudget && (
                        <div className="flex items-center gap-1 text-xs text-red-500 font-bold">
                            <AlertTriangle className="w-3 h-3" /> Über Budget
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4 sm:p-6 flex-grow space-y-4">
                <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Interview Punktzahl</div>
                    <div className="text-3xl font-bold font-serif">{candidate.interviewNotes?.score}/10</div>
                </div>

                <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Top Stärke</div>
                    <div className="text-sm">{candidate.interviewNotes?.strengths[0]}</div>
                </div>

                <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Hauptbedenken</div>
                    <div className="text-sm text-red-700">{candidate.interviewNotes?.weaknesses[0]}</div>
                </div>
            </div>

            <div className="p-4 bg-stone-100">
                <button
                    onClick={onSelect}
                    className="w-full py-3 bg-ink text-white rounded-lg font-bold hover:bg-black transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                    <Check className="w-4 h-4" /> Angebot machen
                </button>
            </div>
        </motion.div>
    );
}
