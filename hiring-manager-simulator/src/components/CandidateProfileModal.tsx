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
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="bg-paper max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl p-8 relative"
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <header className="mb-8 border-b border-ink/10 pb-6">
                        <h2 className="text-3xl font-serif font-bold mb-1">{candidate.name}</h2>
                        <p className="text-lg text-muted mb-4">{candidate.role}</p>
                        <div className="flex gap-4 text-sm font-medium">
                            <span className="bg-ink/5 px-3 py-1 rounded">Erf: {candidate.resume.yearsOfExperience} Jahre</span>
                            <span className="bg-ink/5 px-3 py-1 rounded">Gehalt: € {candidate.attributes.salary.toLocaleString()}</span>
                        </div>
                    </header>

                    <div className="space-y-8">
                        {/* Resume Section - Always Visible */}
                        <div className="space-y-6">
                            <section>
                                <h3 className="font-bold uppercase tracking-wider text-sm text-muted mb-2">Zusammenfassung</h3>
                                <p className="font-serif text-lg leading-relaxed">{candidate.resume.summary}</p>
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
                                <div className="bg-white p-6 rounded border border-stone-200 font-serif italic text-ink/80 leading-relaxed">
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
                            <div className="pt-8 border-t border-ink/10">
                                <h3 className="text-lg font-serif font-bold mb-6 flex items-center gap-2">
                                    <div className="w-6 h-6 bg-highlight text-white rounded-full flex items-center justify-center text-xs">2</div>
                                    Interview Notizen
                                </h3>

                                <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="font-serif italic text-xl text-ink/80">
                                            "{candidate.interviewNotes.interviewerStart}"
                                        </div>
                                        <div className="text-xl font-bold bg-ink/5 px-3 py-1 rounded">
                                            {candidate.interviewNotes.score}/10
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <div className="pt-8 border-t border-ink/10">
                                <h3 className="text-lg font-serif font-bold mb-6 flex items-center gap-2">
                                    <div className="w-6 h-6 bg-highlight text-white rounded-full flex items-center justify-center text-xs">4</div>
                                    Ergebnis
                                </h3>
                                <div className={cn(
                                    "p-6 rounded-lg border-l-4",
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

                    <div className="mt-8 pt-6 border-t border-ink/10 flex justify-end gap-4 sticky bottom-0 bg-paper py-4 -mb-8 -mx-8 px-8 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 border border-stone-300 rounded font-medium hover:bg-stone-50"
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
                                    "px-6 py-2 rounded font-bold text-white flex items-center gap-2 transition-colors",
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
