import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CandidateCard } from './CandidateCard';
import { CandidateProfileModal } from './CandidateProfileModal';
import type { Candidate } from '../types';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export function PhaseScreening() {
    const { candidates, selectedCandidates, toggleCandidateSelection, nextPhase } = useGame();
    const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);

    // Filter out already rejected (though in screening phase usually all are 'pool')
    const pool = candidates.filter(c => c.status === 'pool' || c.status === 'screened'); // Relaxed logic

    const canProceed = selectedCandidates.length >= 5 && selectedCandidates.length <= 6;

    return (
        <div className="space-y-6 pb-24">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-serif font-bold mb-2">Phase 1: Screening</h2>
                    <p className="text-muted max-w-xl">
                        Review the applicant pool. Select <strong>5-6 candidates</strong> to move to the interview round.
                        Keep an eye on salary expectations and experience.
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-bold font-serif">{selectedCandidates.length} / 6</div>
                    <div className="text-sm text-muted uppercase tracking-wider">Selected</div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pool.map(candidate => (
                    <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        isSelected={selectedCandidates.includes(candidate.id)}
                        onSelect={() => toggleCandidateSelection(candidate.id)}
                        onView={setViewingCandidate}
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
                    Proceed to Interviews <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            {/* Modal */}
            <CandidateProfileModal
                candidate={viewingCandidate}
                onClose={() => setViewingCandidate(null)}
                onAction={toggleCandidateSelection}
                actionLabel={selectedCandidates.includes(viewingCandidate?.id || '') ? "Remove from List" : "Add to Shortlist"}
                isActionSelected={selectedCandidates.includes(viewingCandidate?.id || '')}
            />
        </div>
    );
}
