import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { Candidate } from '../types';
import { cn } from '../lib/utils';
import { useGame } from '../context/GameContext';

interface CandidateProfileModalProps {
    candidate: Candidate | null;
    onClose: () => void;
    onAction?: (id: string) => void;
    actionLabel?: string;
    isActionSelected?: boolean;
}

export function CandidateProfileModal({ candidate, onClose, onAction, actionLabel, isActionSelected }: CandidateProfileModalProps) {
    const { phase } = useGame();

    if (!candidate) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 60, opacity: 0 }}
                    className="bg-paper w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto sm:rounded-lg rounded-t-2xl shadow-2xl p-5 sm:p-8 relative"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Drag handle for mobile */}
                    <div className="sm:hidden w-10 h-1 bg-stone-300 rounded-full mx-auto mb-4" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <header className="mb-6 sm:mb-8 border-b border-ink/10 pb-5 sm:pb-6">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-1">{candidate.name}</h2>
                        <p className="text-base sm:text-lg text-muted mb-4">{candidate.role}</p>
                        <div className="flex flex-wrap gap-2 sm:gap-4 text-sm font-medium">
                            <span className="bg-ink/5 px-3 py-1 rounded">Erf: {candidate.resume.yearsOfExperience} Jahre</span>
                            <span className="bg-ink/5 px-3 py-1 rounded">Gehalt: € {candidate.attributes.salary.toLocaleString()}</span>
                        </div>
                    </header>

                    <div className="space-y-6 sm:space-y-8">
                        {/* Resume Section - Always Visible */}
                        <div className="space-y-4 sm:space-y-6">
                            <section>
                                <h3 className="font-bold uppercase tracking-wider text-sm text-muted mb-2">Zusammenfassung</h3>
                                <p className="font-serif text-base sm:text-lg leading-relaxed">{candidate.resume.summary}</p>
                            </section>

                            <section>
                                <h3 className="font-bold uppercase tracking-wider text-sm text-muted mb-2">Letzte Erfahrung</h3>
                                <div className="bg-white p-4 rounded border border-stone-200">
                                    <div className="font-bold">{candidate.resume.lastRole}</div>
                                    <div className="text-muted mb-2">{candidate.resume.company}</div>
                                </div>
                            </section>

                            <section>
                                <h3 className="font-bold uppercase tracking-wider text-sm text-muted mb-2">Anschreiben</h3>
                                <div className="bg-white p-4 sm:p-6 rounded border border-stone-200 font-serif italic text-ink/80 leading-relaxed text-sm sm:text-base">
                                    "{candidate.coverLetter}"
                                </div>
                            </section>

                            <section>
                                <h3 className="font-bold uppercase tracking-wider text-sm text-muted mb-2">Fähigkeiten</h3>
                                <div className="flex flex-wrap gap-2">
                                    {candidate.attributes.skills.map(s => (
                                        <span key={s} className="px-3 py-1 bg-white border border-stone-200 rounded-full text-sm">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Interview Notes - Visible in Phase 2 & 3 */}
                        {(phase === 'interviews' || phase === 'decision' || phase === 'reveal') && candidate.interviewNotes && (
                            <div className="pt-6 sm:pt-8 border-t border-ink/10">
                                <h3 className="text-lg font-serif font-bold mb-4 sm:mb-6 flex items-center gap-2">
                                    <div className="w-6 h-6 bg-highlight text-white rounded-full flex items-center justify-center text-xs">2</div>
                                    Interview Notizen
                                </h3>

                                <div className="bg-white p-4 sm:p-6 rounded-lg border border-stone-200 shadow-sm space-y-4 sm:space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                        <div className="font-serif italic text-base sm:text-xl text-ink/80">
                                            "{candidate.interviewNotes.interviewerStart}"
                                        </div>
                                        <div className="text-xl font-bold bg-ink/5 px-3 py-1 rounded self-start flex-shrink-0">
                                            {candidate.interviewNotes.score}/10
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div className="bg-stone-50 p-3 rounded">
                                            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-green-700">
                                                <ThumbsUp className="w-4 h-4" /> Stärken
                                            </div>
                                            <ul className="text-sm space-y-1">
                                                {candidate.interviewNotes.strengths.map(s => <li key={s}>• {s}</li>)}
                                            </ul>
                                        </div>
                                        <div className="bg-stone-50 p-3 rounded">
                                            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-red-700">
                                                <ThumbsDown className="w-4 h-4" /> Schwächen
                                            </div>
                                            <ul className="text-sm space-y-1">
                                                {candidate.interviewNotes.weaknesses.map(s => <li key={s}>• {s}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Outcome - Visible in Phase 4 */}
                        {phase === 'reveal' && candidate.status === 'hired' && (
                            <div className="pt-6 sm:pt-8 border-t border-ink/10">
                                <h3 className="text-lg font-serif font-bold mb-4 sm:mb-6 flex items-center gap-2">
                                    <div className="w-6 h-6 bg-highlight text-white rounded-full flex items-center justify-center text-xs">4</div>
                                    Ergebnis
                                </h3>
                                <div className={cn(
                                    "p-4 sm:p-6 rounded-lg border-l-4",
                                    candidate.outcome.type === 'success' ? "bg-green-50 border-green-500" :
                                        candidate.outcome.type === 'failure' ? "bg-red-50 border-red-500" :
                                            "bg-yellow-50 border-yellow-500"
                                )}>
                                    <h4 className="font-bold text-lg mb-2">{candidate.outcome.title}</h4>
                                    <p>{candidate.outcome.description}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-ink/10 flex justify-end gap-3 sm:gap-4 sticky bottom-0 bg-paper py-4 -mb-5 sm:-mb-8 -mx-5 sm:-mx-8 px-5 sm:px-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <button
                            onClick={onClose}
                            className="px-4 sm:px-6 py-2 border border-stone-300 rounded font-medium hover:bg-stone-50 text-sm sm:text-base"
                        >
                            Schließen
                        </button>
                        {onAction && actionLabel && (
                            <button
                                onClick={() => {
                                    onAction(candidate.id);
                                    onClose();
                                }}
                                className={cn(
                                    "px-4 sm:px-6 py-2 rounded font-bold text-white flex items-center gap-2 transition-colors text-sm sm:text-base",
                                    isActionSelected
                                        ? "bg-red-600 hover:bg-red-700"
                                        : "bg-highlight hover:bg-highlight/90"
                                )}
                            >
                                {isActionSelected ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                                {actionLabel}
                            </button>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
