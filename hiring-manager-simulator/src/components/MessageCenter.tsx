import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Mail, AlertCircle, X } from 'lucide-react';
import { cn } from '../lib/utils';

export function MessageCenter() {
    const { messages, markMessageRead } = useGame();

    // Show all unread messages, or messages read recently?
    // User wants them closeable. 
    // Let's filter for messages that are NOT read.
    const visibleMessages = messages.filter(m => !m.isRead);

    // If there are no messages, show nothing.

    // Also positioning: The user said "above the button to the next stage". 
    // The Next button is fixed bottom-right.
    // The MessageCenter was fixed bottom-right.
    // Let's move MessageCenter to TOP-RIGHT to avoid conflict entirely.

    return (
        <div className="fixed top-24 right-4 w-80 space-y-4 pointer-events-none z-50 flex flex-col items-end">
            <AnimatePresence>
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
                                    Effect: {msg.effect.type.replace('_', ' ')}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
