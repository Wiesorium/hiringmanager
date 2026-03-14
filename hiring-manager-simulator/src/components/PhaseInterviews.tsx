import { useState } from 'react';
import { useGame } from '../context/GameContext';
import type { Candidate } from '../types';
import { CandidateProfileModal } from './CandidateProfileModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ThumbsUp, ThumbsDown, Eye, MessageCircle, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

export function PhaseInterviews() {
    const { candidates, selectedCandidates, toggleCandidateSelection, nextPhase, activeQuestions } = useGame();
    const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);
    // Which question the player currently has selected (null = none)
    const [selectedQuestion, setSelectedQuestion] = useState<'q1' | 'q2' | 'q3' | null>(null);
    // Keep track of which candidate the question was "asked to" (to show the response)
    const [askedTo, setAskedTo] = useState<string | null>(null);

    const interviewPool = candidates.filter(c => c.status === 'interviewed');
    const requiredFinalists = Math.min(3, interviewPool.length);
    const canProceed = selectedCandidates.length === requiredFinalists;

    const hasQuestions = activeQuestions.length > 0;

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

            {/* Questions panel — only shown for API-generated simulations */}
            {hasQuestions && (
                <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 flex items-center gap-2 border-b border-stone-100 bg-stone-50">
                        <MessageCircle className="w-4 h-4 text-highlight" />
                        <span className="font-bold text-sm">Interviewfragen stellen</span>
                        <span className="ml-auto text-xs text-muted">Wähle eine Frage — klicke dann auf einen Kandidaten, um die Antwort zu sehen</span>
                    </div>
                    <div className="p-4 space-y-2">
                        {activeQuestions.map((q) => (
                            <button
                                key={q.id}
                                onClick={() => {
                                    setSelectedQuestion(prev => prev === q.id ? null : q.id);
                                    setAskedTo(null);
                                }}
                                className={cn(
                                    "w-full text-left text-sm px-4 py-3 rounded-lg border transition-all",
                                    selectedQuestion === q.id
                                        ? "border-highlight bg-highlight/5 text-ink font-medium"
                                        : "border-stone-200 hover:border-stone-300 text-muted hover:text-ink"
                                )}
                            >
                                <span className="font-semibold text-highlight mr-2 text-xs uppercase">{q.id.toUpperCase()}</span>
                                {q.text}
                            </button>
                        ))}
                    </div>
                    {selectedQuestion && (
                        <div className="px-4 pb-4">
                            <p className="text-xs text-muted italic">Klicke auf eine Kandidatenkarte, um deren Antwort auf die Frage zu lesen.</p>
                        </div>
                    )}
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {interviewPool.map(candidate => (
                    <InterviewCard
                        key={candidate.id}
                        candidate={candidate}
                        isSelected={selectedCandidates.includes(candidate.id)}
                        onSelect={() => toggleCandidateSelection(candidate.id)}
                        onView={() => setViewingCandidate(candidate)}
                        selectedQuestion={selectedQuestion}
                        isAnswerShown={askedTo === candidate.id && selectedQuestion !== null}
                        onToggleAnswer={() => setAskedTo(prev => (prev === candidate.id ? null : candidate.id))}
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

interface InterviewCardProps {
    candidate: Candidate;
    isSelected: boolean;
    onSelect: () => void;
    onView: () => void;
    selectedQuestion: 'q1' | 'q2' | 'q3' | null;
    isAnswerShown: boolean;
    onToggleAnswer: () => void;
}

function InterviewCard({ candidate, isSelected, onSelect, onView, selectedQuestion, isAnswerShown, onToggleAnswer }: InterviewCardProps) {
    if (!candidate.interviewNotes) return null;

    const answerText = selectedQuestion && candidate.questionResponses
        ? candidate.questionResponses[selectedQuestion]
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "bg-white p-4 sm:p-6 rounded-lg border-2 transition-all relative group",
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
                    {/* Profile image or initials */}
                    {candidate.imageUrl ? (
                        <img
                            src={candidate.imageUrl}
                            alt={candidate.name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center font-bold font-serif text-sm flex-shrink-0">
                            {candidate.name.split(' ').slice(0, 2).map(n => n[0] ?? '').join('').toUpperCase()}
                        </div>
                    )}
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

            {/* Question answer panel — only shown when a question is selected and candidate has responses */}
            <AnimatePresence>
                {answerText && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 border-t border-stone-100 pt-4">
                            <button
                                onClick={(e) => { e.stopPropagation(); onToggleAnswer(); }}
                                className="flex items-center gap-2 text-xs font-bold text-highlight uppercase tracking-wider mb-2"
                            >
                                <MessageCircle className="w-3.5 h-3.5" />
                                Antwort auf Frage {selectedQuestion?.toUpperCase()}
                                <ChevronDown className={cn("w-3 h-3 transition-transform", isAnswerShown ? "rotate-180" : "")} />
                            </button>
                            {isAnswerShown && (
                                <p className="text-sm text-ink/80 bg-highlight/5 border border-highlight/20 rounded-lg p-3 italic leading-relaxed">
                                    "{answerText}"
                                </p>
                            )}
                            {!isAnswerShown && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onToggleAnswer(); }}
                                    className="text-xs text-highlight hover:underline"
                                >
                                    Antwort anzeigen →
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
