import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Mail, AlertCircle, X, UserCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export function MessageCenter() {
    const { messages, applicantEvents, markMessageRead, markApplicantEventRead } = useGame();

    const visibleMessages = messages.filter(m => !m.isRead);
    const visibleEvents = (applicantEvents || []).filter(e => !e.isRead);

    return (
        <div className="fixed top-24 right-4 w-80 space-y-4 pointer-events-none z-50 flex flex-col items-end">
            <AnimatePresence>
                {/* Internal messages from CEO / HR / Team Lead etc. */}
                {visibleMessages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className={cn(
                            "p-4 rounded-lg shadow-xl pointer-events-auto border-l-4 w-full relative group",
                            "bg-white text-ink border-stone-200",
                            "border-l-highlight"
                        )}
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                markMessageRead(msg.id);
                            }}
                            className="absolute top-2 right-2 text-stone-400 hover:text-ink p-1 hover:bg-stone-100 rounded-full transition-colors"
                            aria-label="Nachricht schließen"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-start justify-between mb-1 pr-6">
                            <div className="flex items-center gap-2 font-serif font-bold text-sm">
                                {msg.effect ? <AlertCircle className="w-4 h-4 text-highlight" /> : <Mail className="w-4 h-4" />}
                                {msg.sender}
                            </div>
                        </div>

                        <p className="text-sm leading-relaxed font-sans mb-1">{msg.content}</p>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted uppercase tracking-wider">{msg.role}</span>
                            {msg.effect && (
                                <div className="text-xs font-bold text-highlight uppercase tracking-wide">
                                    Effect: {msg.effect.type.replace(/_/g, ' ')}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}

                {/* Applicant-initiated events — distinct blue styling */}
                {visibleEvents.map((ev) => (
                    <motion.div
                        key={ev.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className={cn(
                            "p-4 rounded-lg shadow-xl pointer-events-auto border-l-4 w-full relative group",
                            "bg-blue-50 text-ink border-blue-200",
                            "border-l-blue-500"
                        )}
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                markApplicantEventRead(ev.id);
                            }}
                            className="absolute top-2 right-2 text-blue-400 hover:text-blue-700 p-1 hover:bg-blue-100 rounded-full transition-colors"
                            aria-label="Ereignis schließen"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-start mb-1 pr-6 gap-2">
                            <UserCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-serif font-bold text-sm text-blue-900">{ev.sender}</p>
                                <p className="text-xs text-blue-600 font-medium">{ev.subject}</p>
                            </div>
                        </div>

                        <p className="text-sm leading-relaxed font-sans mb-2 text-ink whitespace-pre-line">{ev.body}</p>

                        <div className="flex justify-between items-center">
                            <span className="text-xs text-blue-500 uppercase tracking-wider">
                                {ev.type === 'withdrawal' ? '⚠ Bewerbung zurückgezogen' :
                                    ev.type === 'thank_you_mail' ? 'Dankesschreiben' :
                                        ev.type === 'question_email' ? 'Rückfrage' :
                                            ev.type === 'portfolio_link' ? 'Portfolio gesendet' :
                                                ev.type === 'reference_letter' ? 'Referenzschreiben' : ev.type}
                            </span>
                            {ev.effect?.type === 'candidate_lost' && (
                                <span className="text-xs font-bold text-red-500 uppercase">Kandidat weg!</span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
