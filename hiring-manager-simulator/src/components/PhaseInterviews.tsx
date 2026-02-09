import { useState } from 'react';
import { useGame } from '../context/GameContext';
import type { Candidate } from '../types';
import { CandidateProfileModal } from './CandidateProfileModal';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ThumbsUp, ThumbsDown, Eye } from 'lucide-react';
import { cn } from '../lib/utils';

export function PhaseInterviews() {
    const { candidates, selectedCandidates, toggleCandidateSelection, nextPhase } = useGame();
    const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);

    const interviewPool = candidates.filter(c => c.status === 'interviewed');
    const canProceed = selectedCandidates.length === 3;

    return (
        <div className="space-y-6 pb-24">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-serif font-bold mb-2">Phase 2: Interviews</h2>
                    <p className="text-muted max-w-xl">
                        The team has interviewed your shortlist. Review their notes and pick <strong>3 finalists</strong> for the final round.
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-bold font-serif">{selectedCandidates.length} / 3</div>
                    <div className="text-sm text-muted uppercase tracking-wider">Finalists</div>
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-6">
                {interviewPool.map(candidate => (
                    <InterviewCard
                        key={candidate.id}
                        candidate={candidate}
                        isSelected={selectedCandidates.includes(candidate.id)}
                        onSelect={() => toggleCandidateSelection(candidate.id)}
                        onView={() => setViewingCandidate(candidate)}
                    />
                ))}
            </div>

            {/* Proceed Button */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-paper via-paper to-transparent pointer-events-none flex justify-end z-40">
                <button
                    onClick={nextPhase}
                    disabled={!canProceed}
                    className={cn(
                        "pointer-events-auto flex items-center gap-2 px-8 py-4 rounded-full font-bold shadow-lg transition-all",
                        canProceed
                            ? "bg-highlight text-white hover:bg-highlight/90 hover:scale-105"
                            : "bg-stone-300 text-stone-500 cursor-not-allowed"
                    )}
                >
                    Select Finalist <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            <CandidateProfileModal
                candidate={viewingCandidate}
                onClose={() => setViewingCandidate(null)}
                // In Interview phase, action is selecting/deselecting as finalist
                onAction={toggleCandidateSelection}
                actionLabel={selectedCandidates.includes(viewingCandidate?.id || '') ? "Remove Finalist" : "Select as Finalist"}
                isActionSelected={selectedCandidates.includes(viewingCandidate?.id || '')}
            />
        </div>
    );
}

function InterviewCard({ candidate, isSelected, onSelect, onView }: { candidate: Candidate, isSelected: boolean, onSelect: () => void, onView: () => void }) {
    if (!candidate.interviewNotes) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "bg-white p-6 rounded-lg border-2 transition-all cursor-pointer relative group",
                isSelected ? "border-highlight shadow-lg bg-highlight/5" : "border-transparent hover:border-stone-200 shadow-sm"
            )}
            onClick={onSelect}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center transition-colors",
                        isSelected && "bg-highlight border-highlight text-white"
                    )}>
                        {isSelected && <Check className="w-4 h-4" />}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold font-serif">{candidate.name}</h3>
                        <p className="text-sm text-muted">{candidate.role}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onView();
                        }}
                        className="p-2 hover:bg-stone-100 rounded-full text-stone-400 hover:text-ink transition-colors"
                        title="View Full Profile"
                    >
                        <Eye className="w-5 h-5" />
                    </button>
                    <div className="text-2xl font-bold font-serif bg-stone-100 px-3 py-1 rounded">
                        {candidate.interviewNotes.score}/10
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 md:col-span-3 italic text-ink/80 border-b border-stone-100 pb-4 mb-2">
                    "{candidate.interviewNotes.interviewerStart}"
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-green-700">
                        <ThumbsUp className="w-4 h-4" /> Strengths
                    </div>
                    <ul className="text-sm space-y-1">
                        {candidate.interviewNotes.strengths.map(s => <li key={s}>• {s}</li>)}
                    </ul>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-red-700">
                        <ThumbsDown className="w-4 h-4" /> Weaknesses
                    </div>
                    <ul className="text-sm space-y-1">
                        {candidate.interviewNotes.weaknesses.map(s => <li key={s}>• {s}</li>)}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}
