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

    // Filter for finalists (which are kept in status 'interviewed' but marked by selectedCandidates? 
    // Wait, previous phase logic: nextPhase -> setCandidates status to 'interviewed' if selected.
    // Actually in nextPhase for interviews->decision, we didn't filtering logic change much?
    // Let's check GameContext nextPhase logic.
    // Ah, logic: setPhase('decision'). Candidates are still 'interviewed'.
    // We need to filter by those ID's that were selected in previous phase?
    // Actually no, we cleared selectedCandidates in nextPhase('screening'). 
    // In nextPhase('interviews'), we didn't clear selectedCandidates yet?
    // Let's look at GameContext logic later. Assuming `selectedCandidates` holds the 3 finalists?
    // Wait, in PhaseInterviews we select 3. then click next.
    // in GameContext nextPhase: 
    // if (phase === 'interviews') { setPhase('decision'); } 
    // It does NOT clear selectedCandidates. So `selectedCandidates` are the 3 finalists.

    // BUT `selectedCandidates` might be cleared in `nextPhase` if I was following pattern.
    // Let's assume for now `selectedCandidates` contains the 3 finalists from previous round.
    // However, usually we might want to store them separately or mark them as finalists.
    // Let's check `PhaseInterviews` again. It uses `toggleCandidateSelection`.

    // Workaround: We find candidates whose IDs are in `selectedCandidates`.
    // BUT `PhaseDecision` needs to allow selecting ONE final choice.
    // If we reuse `selectedCandidates` for the final choice, we conflict with the list of finalists.

    // FIX: In `GameContext.tsx` (viewed earlier), `nextPhase` for `interviews` -> `decision`:
    // It did NOT clear selectedCandidates.
    // But `PhaseDecision` uses `makeFinalDecision` which sets `finalChoice`.
    // So `selectedCandidates` still holds the shortlist.

    const finalists = candidates.filter(c => selectedCandidates.includes(c.id));

    return (
        <div className="space-y-6 pb-24">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-serif font-bold mb-2">Phase 3: Final Decision</h2>
                    <p className="text-muted max-w-xl">
                        This is it. You have 3 finalists. Comparing them against the budget and team fit. Make the offer.
                    </p>
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                actionLabel="Hire This Candidate"
                isActionSelected={false} // Action immediately converts to 'reveal' usually
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
            <div className="p-6 border-b border-stone-100 bg-stone-50/50">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-serif font-bold leading-tight">{candidate.name}</h3>
                    <button
                        onClick={onView}
                        className="p-2 hover:bg-stone-200 rounded-full text-stone-400 hover:text-ink transition-colors"
                        title="View Full Profile"
                    >
                        <Eye className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted">Salary Request</span>
                        <span className={cn("font-bold", isOverBudget ? "text-red-500" : "text-green-700")}>
                            ${candidate.attributes.salary.toLocaleString()}
                        </span>
                    </div>
                    {isOverBudget && (
                        <div className="flex items-center gap-1 text-xs text-red-500 font-bold">
                            <AlertTriangle className="w-3 h-3" /> Over Budget
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 flex-grow space-y-4">
                <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Interview Score</div>
                    <div className="text-3xl font-bold font-serif">{candidate.interviewNotes?.score}/10</div>
                </div>

                <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Top Strength</div>
                    <div className="text-sm">{candidate.interviewNotes?.strengths[0]}</div>
                </div>

                <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Main Concern</div>
                    <div className="text-sm text-red-700">{candidate.interviewNotes?.weaknesses[0]}</div>
                </div>
            </div>

            <div className="p-4 bg-stone-100">
                <button
                    onClick={onSelect}
                    className="w-full py-3 bg-ink text-white rounded-lg font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                    <Check className="w-4 h-4" /> Use Final Offer
                </button>
            </div>
        </motion.div>
    );
}
