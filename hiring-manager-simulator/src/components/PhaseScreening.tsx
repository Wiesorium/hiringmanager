import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CandidateCard } from './CandidateCard';
import { CandidateProfileModal } from './CandidateProfileModal';
import type { Candidate } from '../types';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { AnimatePresence } from 'framer-motion';

export function PhaseScreening() {
    const { candidates, selectedCandidates, toggleCandidateSelection, rejectCandidate, nextPhase } = useGame();
    const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);

    const pool = candidates.filter(c => c.status === 'pool' || c.status === 'screened');
    const canProceed = selectedCandidates.length >= 2 && selectedCandidates.length <= 6;

    return (
        <div className="space-y-6 pb-32">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Phase 1: Bewerbungssichtung</h2>
                    <p className="text-muted max-w-xl text-sm sm:text-base">
                        Sichten Sie den Bewerberpool. Wählen Sie <strong>2–6 Kandidaten</strong> für die Interviewrunde aus.
                        Sie können Kandidaten auch mit dem <span className="text-red-500 font-bold">×</span>-Button direkt ablehnen (Ausschlussverfahren).
                    </p>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                    <div className="text-3xl sm:text-4xl font-bold font-serif">{selectedCandidates.length} / 6</div>
                    <div className="text-sm text-muted uppercase tracking-wider">Ausgewählt</div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <AnimatePresence>
                    {pool.map(candidate => (
                        <CandidateCard
                            key={candidate.id}
                            candidate={candidate}
                            isSelected={selectedCandidates.includes(candidate.id)}
                            onSelect={() => toggleCandidateSelection(candidate.id)}
                            onView={setViewingCandidate}
                            onReject={() => rejectCandidate(candidate.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Proceed Button */}
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
                    Weiter zu den Interviews <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>

            {/* Modal */}
            <CandidateProfileModal
                candidate={viewingCandidate}
                onClose={() => setViewingCandidate(null)}
                onAction={toggleCandidateSelection}
                actionLabel={selectedCandidates.includes(viewingCandidate?.id || '') ? "Von Liste entfernen" : "Zur Auswahl hinzufügen"}
                isActionSelected={selectedCandidates.includes(viewingCandidate?.id || '')}
            />
        </div>
    );
}
