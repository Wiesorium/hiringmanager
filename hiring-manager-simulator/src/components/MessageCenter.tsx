import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Mail, AlertCircle, X, UserCircle, Bell } from 'lucide-react';
import { cn } from '../lib/utils';

export function MessageCenter() {
    const { messages, applicantEvents, markMessageRead, markApplicantEventRead } = useGame();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const visibleMessages = messages.filter(m => !m.isRead);
    const visibleEvents = (applicantEvents || []).filter(e => !e.isRead);
    const totalUnread = visibleMessages.length + visibleEvents.length;

    const MessageCard = ({ msg }: { msg: typeof visibleMessages[0] }) => (
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
    );

    const EventCard = ({ ev }: { ev: typeof visibleEvents[0] }) => (
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
    );

    return (
        <>
            {/* ─── DESKTOP: fixed right panel (z-30, below the proceed button z-40) ─── */}
            <div className="hidden md:block fixed top-24 right-4 w-80 space-y-4 pointer-events-none z-30 flex flex-col items-end">
                <AnimatePresence>
                    {visibleMessages.map((msg) => <MessageCard key={msg.id} msg={msg} />)}
                    {visibleEvents.map((ev) => <EventCard key={ev.id} ev={ev} />)}
                </AnimatePresence>
            </div>

            {/* ─── MOBILE: badge button + bottom drawer ─── */}
            <div className="md:hidden">
                {/* Floating badge button */}
                {totalUnread > 0 && (
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="fixed top-20 right-4 z-50 bg-highlight text-white rounded-full shadow-lg p-3 flex items-center gap-2 pointer-events-auto"
                        aria-label="Nachrichten anzeigen"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="font-bold text-sm">{totalUnread}</span>
                    </button>
                )}

                {/* Drawer overlay */}
                <AnimatePresence>
                    {drawerOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/40 z-40"
                                onClick={() => setDrawerOpen(false)}
                            />

                            {/* Drawer */}
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '100%' }}
                                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                                className="fixed bottom-0 left-0 right-0 z-50 bg-paper rounded-t-2xl shadow-2xl"
                                style={{ maxHeight: '80vh' }}
                            >
                                {/* Handle */}
                                <div className="flex items-center justify-between px-6 pt-4 pb-3 border-b border-stone-200">
                                    <div className="flex items-center gap-2 font-serif font-bold">
                                        <Bell className="w-5 h-5 text-highlight" />
                                        Nachrichten &amp; Ereignisse
                                        {totalUnread > 0 && (
                                            <span className="ml-1 bg-highlight text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                {totalUnread}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setDrawerOpen(false)}
                                        className="p-2 hover:bg-stone-100 rounded-full"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(80vh - 64px)' }}>
                                    {totalUnread === 0 && (
                                        <p className="text-center text-muted py-8">Keine neuen Nachrichten.</p>
                                    )}
                                    <AnimatePresence>
                                        {visibleMessages.map((msg) => <MessageCard key={msg.id} msg={msg} />)}
                                        {visibleEvents.map((ev) => <EventCard key={ev.id} ev={ev} />)}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
