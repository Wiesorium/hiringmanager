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
    const requiredFinalists = Math.min(3, interviewPool.length);
    const canProceed = selectedCandidates.length === requiredFinalists;

    return (
        <div className="space-y-6 pb-32">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Phase 2: Interviews</h2>
                    <p className="text-muted max-w-xl text-sm sm:text-base">
                        Das Team hat Ihre Auswahl interviewt. Prüfen Sie die Notizen und wählen Sie <strong>{requiredFinalists} Finalist{requiredFinalists === 1 ? 'en' : 'en'}</strong> für die letzte Runde.
                    </p>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                    <div className="text-3xl sm:text-4xl font-bold font-serif">{selectedCandidates.length} / {requiredFinalists}</div>
                    <div className="text-sm text-muted uppercase tracking-wider">Finalisten</div>
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
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

            {/* Proceed Button — fixed at bottom, always above the z-30 notes panel */}
            <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-paper via-paper to-transparent pointer-events-none flex justify-center sm:justify-end z-40">
                <button
                    onClick={nextPhase}
                    disabled={!canProceed}
                    className={cn(
                        "pointer-events-auto flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold shadow-lg transition-all text-sm sm:text-base",
                        canProceed
                            ? "bg-highlight text-white hover:bg-highlight/90 hover:scale-105"
                            : "bg-stone-300 text-stone-500 cursor-not-allowed"
                    )}
                >
                    Finalisten bestätigen <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>

            <CandidateProfileModal
                candidate={viewingCandidate}
                onClose={() => setViewingCandidate(null)}
                onAction={toggleCandidateSelection}
                actionLabel={selectedCandidates.includes(viewingCandidate?.id || '') ? "Als Finalist entfernen" : "Als Finalist wählen"}
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
                "bg-white p-4 sm:p-6 rounded-lg border-2 transition-all cursor-pointer relative group",
                isSelected ? "border-highlight shadow-lg bg-highlight/5" : "border-transparent hover:border-stone-200 shadow-sm"
            )}
            onClick={onSelect}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center transition-colors flex-shrink-0",
                        isSelected && "bg-highlight border-highlight text-white"
                    )}>
                        {isSelected && <Check className="w-4 h-4" />}
                    </div>
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold font-serif">{candidate.name}</h3>
                        <p className="text-sm text-muted">{candidate.role}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onView();
                        }}
                        className="p-2 hover:bg-stone-100 rounded-full text-stone-400 hover:text-ink transition-colors"
                        title="Profil ansehen"
                    >
                        <Eye className="w-5 h-5" />
                    </button>
                    <div className="text-xl sm:text-2xl font-bold font-serif bg-stone-100 px-3 py-1 rounded">
                        {candidate.interviewNotes.score}/10
                    </div>
                </div>
            </div>

            <div className="italic text-ink/80 border-b border-stone-100 pb-3 mb-3 text-sm sm:text-base">
                "{candidate.interviewNotes.interviewerStart}"
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-green-700">
                        <ThumbsUp className="w-4 h-4" /> Stärken
                    </div>
                    <ul className="text-sm space-y-1">
                        {candidate.interviewNotes.strengths.map(s => <li key={s}>• {s}</li>)}
                    </ul>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-red-700">
                        <ThumbsDown className="w-4 h-4" /> Schwächen
                    </div>
                    <ul className="text-sm space-y-1">
                        {candidate.interviewNotes.weaknesses.map(s => <li key={s}>• {s}</li>)}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}
