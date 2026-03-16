import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Mail, Loader2, CheckCircle2, Send, RefreshCw, Mic } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { cn } from '../lib/utils';
import { submitFeedback, trackInteraction } from '../services/api';

// ── Learnings the user can self-assess ──────────────────────────────────────
const LEARNINGS = [
    { id: 'screening', label: 'Ich verstehe, warum Lebensläufe in 30 Sekunden aussortiert werden' },
    { id: 'signals', label: 'Ich weiß, welche Signale in den ersten Sekunden wirklich zählen' },
    { id: 'fit', label: 'Ich verstehe, was „Fit" aus Sicht des Hiring Managers bedeutet' },
    { id: 'risk', label: 'Ich erkenne die Risikoaversion, die Einstellungsentscheidungen prägt' },
    { id: 'stakeholder', label: 'Ich sehe, wie Teamdynamik und Budgetdruck die Entscheidung beeinflussen' },
    { id: 'bmc', label: 'Ich weiß, wie ich das Business Model Canvas für meine Bewerbung nutze' },
    { id: 'positioning', label: 'Ich kann meinen einzigartigen Beitrag strategisch positionieren' },
];

// ── Blog articles in priority order ─────────────────────────────────────────
const BLOG_TEASERS = [
    {
        slug: 'lebenslauf-30-sekunden-aussortiert',
        label: 'Lebenslauf & Unterlagen',
        title: 'Warum dein Lebenslauf in 30 Sekunden aussortiert wird',
        desc: 'Was Hiring Manager in den ersten Momenten wirklich sehen — und wie du die Screening-Hürde nimmst.',
        learnId: 'screening',
    },
    {
        slug: 'business-model-canvas-bewerbung',
        label: 'Bewerbungsstrategie',
        title: 'Das wichtigste Instrument, das alle vergessen',
        desc: 'Mit dem Business Model Canvas deinen einzigartigen Beitrag positionieren und Hiring Manager überzeugen.',
        learnId: 'bmc',
    },
    {
        slug: 'bewerbungslandschaft-ueberblick',
        label: 'Bewerbungsstrategie',
        title: 'Die Bewerbungslandschaft 2026: Was wirklich hilft',
        desc: 'Coaches, Lebenslauf-Tools, Interviewtraining — und was fast alle vergessen: die andere Seite des Tisches.',
        learnId: null,
    },
    {
        slug: 'bewerbung-vorbereitung',
        label: 'Interview-Vorbereitung',
        title: 'So bereitest du dich auf deine Bewerbung vor',
        desc: 'Vom Lebenslauf bis zur Gehaltsverhandlung — der komplette Leitfaden für erfahrene Berufstätige.',
        learnId: null,
    },
];

// ─────────────────────────────────────────────────────────────────────────────

export function PostSimulationReward() {
    const { subscribeNewsletter, setGameState, setActiveBlogSlug, resetGame } = useGame();

    // Learnings checklist
    const [checked, setChecked] = useState<Set<string>>(new Set());
    const toggleCheck = (id: string) =>
        setChecked(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });

    // CTA tabs
    const [tab, setTab] = useState<'email' | 'call'>('email');

    // ── Tab 1: Newsletter email ──────────────────────────────────────────────
    const [email, setEmail] = useState('');
    const [emailState, setEmailState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleEmailSubmit = async () => {
        if (!email.trim() || !email.includes('@') || emailState === 'loading') return;
        setEmailState('loading');
        const res = await subscribeNewsletter(email.trim());
        if (res) {
            setEmailState('success');
            trackInteraction('newsletter_submitted', { learnings: Array.from(checked) });
            window.fbq?.('track', 'Lead', { content_name: 'newsletter' });
        } else {
            setEmailState('error');
        }
    };

    // ── Tab 2: Podcast booking request ──────────────────────────────────────
    const [callEmail, setCallEmail] = useState('');
    const [callTime, setCallTime] = useState('');
    const [callState, setCallState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleCallSubmit = async () => {
        if (!callEmail.trim() || !callEmail.includes('@') || callState === 'loading') return;
        setCallState('loading');
        const message = `PODCAST-ANFRAGE\nE-Mail: ${callEmail.trim()}\nWunschzeit: ${callTime.trim() || 'nicht angegeben'}`;
        const ok = await submitFeedback({ feedback: message, email: callEmail.trim() });
        if (ok) {
            setCallState('success');
            trackInteraction('podcast_request_submitted', { learnings: Array.from(checked) });
            window.fbq?.('track', 'Lead', { content_name: 'podcast' });
        } else {
            setCallState('error');
        }
    };

    // ── Feedback form ────────────────────────────────────────────────────────
    const [feedbackText, setFeedbackText] = useState('');
    const [feedbackEmail, setFeedbackEmail] = useState('');
    const [feedbackState, setFeedbackState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleFeedbackSubmit = async () => {
        if (!feedbackText.trim() || feedbackState === 'loading') return;
        setFeedbackState('loading');
        const ok = await submitFeedback({ feedback: feedbackText.trim(), email: feedbackEmail.trim() || undefined });
        if (ok) {
            setFeedbackState('success');
            trackInteraction('feedback_submitted');
        } else {
            setFeedbackState('error');
        }
    };

    // Prioritised blog list: unchecked learnings → their articles first
    const uncheckedIds = new Set(LEARNINGS.filter(l => !checked.has(l.id)).map(l => l.id));
    const sorted = [...BLOG_TEASERS].sort((a, b) => {
        const aUnlearned = a.learnId && uncheckedIds.has(a.learnId) ? 0 : 1;
        const bUnlearned = b.learnId && uncheckedIds.has(b.learnId) ? 0 : 1;
        return aUnlearned - bUnlearned;
    });

    const navigateToBlog = (slug: string) => {
        setActiveBlogSlug(slug);
        setGameState('blog_post' as any);
        window.scrollTo(0, 0);
    };
    void navigateToBlog; // kept for potential future blog links from CTA

    return (
        <div className="space-y-10 pt-4">
            {/* ── Divider ── */}
            <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-stone-200" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted px-2">Dein Lernmoment</span>
                <div className="flex-1 h-px bg-stone-200" />
            </div>

            {/* ── Learnings checklist ── */}
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-stone-50">
                    <h3 className="text-xl font-serif font-bold text-ink mb-1">Was hast du gerade gelernt?</h3>
                    <p className="text-sm text-muted">Hake ab, was du nach der Simulation mitnimmst. Wir zeigen dir passende Lektüre für den Rest.</p>
                </div>
                <div className="px-6 py-5 space-y-3">
                    {LEARNINGS.map(l => (
                        <button
                            key={l.id}
                            onClick={() => toggleCheck(l.id)}
                            className={cn(
                                'w-full flex items-center gap-4 rounded-xl px-4 py-3 text-left transition-all',
                                checked.has(l.id)
                                    ? 'bg-highlight/8 border-2 border-highlight/30'
                                    : 'border-2 border-stone-100 hover:border-stone-200'
                            )}
                        >
                            <div className={cn(
                                'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                                checked.has(l.id) ? 'bg-highlight border-highlight' : 'border-stone-300'
                            )}>
                                {checked.has(l.id) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                            </div>
                            <span className={cn('text-sm leading-snug', checked.has(l.id) ? 'text-ink font-medium' : 'text-ink/70')}>
                                {l.label}
                            </span>
                        </button>
                    ))}
                </div>
                {checked.size > 0 && (
                    <div className="px-6 pb-5">
                        <p className="text-xs text-highlight font-semibold">
                            ✓ {checked.size} von {LEARNINGS.length} Erkenntnissen mitgenommen
                        </p>
                    </div>
                )}
            </div>



            {/* ── CTA: Email or Podcast ── */}
            <div className="bg-ink rounded-2xl overflow-hidden text-white">
                <div className="px-8 pt-8 pb-6 text-center border-b border-white/10">
                    <h3 className="text-2xl font-serif font-bold mb-2">Bring deine Bewerbung auf das nächste Level</h3>
                    <p className="text-white/70 text-sm leading-relaxed max-w-lg mx-auto">
                        Tägliche Impulse per E-Mail — oder ein echtes Gespräch, das veröffentlicht wird.
                    </p>
                </div>

                {/* Tab switcher */}
                <div className="flex border-b border-white/10">
                    <button
                        onClick={() => setTab('email')}
                        className={cn(
                            'flex-1 py-3 sm:py-4 text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 transition-all',
                            tab === 'email' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'
                        )}
                    >
                        <Mail className="w-4 h-4" />
                        <span>Tägl. Blog-Tipps</span>
                    </button>
                    <button
                        onClick={() => setTab('call')}
                        className={cn(
                            'flex-1 py-3 sm:py-4 text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 transition-all',
                            tab === 'call' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'
                        )}
                    >
                        <Mic className="w-4 h-4" />
                        <span>Podcast-Gespräch</span>
                    </button>
                </div>

                <div className="px-8 py-7">
                    {tab === 'email' ? (
                        <div className="space-y-4">
                            <p className="text-sm text-white/80 leading-relaxed">
                                Du bekommst <span className="text-white font-semibold">täglich eine kurze E-Mail</span> mit den Artikeln, die zu deinen offenen Lernfeldern passen —
                                kein Spam, keine generischen Newsletter. Nur das, was für deine Bewerbung gerade relevant ist.
                            </p>
                            {uncheckedIds.size > 0 && (
                                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                                    <p className="text-xs text-white/50 uppercase tracking-wider font-bold mb-2">Du erhältst u. a.:</p>
                                    <ul className="space-y-1">
                                        {sorted.filter(p => p.learnId && uncheckedIds.has(p.learnId)).map(p => (
                                            <li key={p.slug} className="text-xs text-white/80 flex items-center gap-2">
                                                <ArrowRight className="w-3 h-3 text-highlight flex-shrink-0" />
                                                {p.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {emailState === 'success' ? (
                                <div className="flex items-center gap-3 bg-green-500/20 border border-green-400/30 rounded-xl px-4 py-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                                    <p className="text-sm text-green-300 font-medium">Danke! Du erhältst bald deine ersten Tipps.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleEmailSubmit()}
                                        placeholder="deine@email.at"
                                        className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-highlight/60 transition-all"
                                    />
                                    <button
                                        onClick={handleEmailSubmit}
                                        disabled={!email.includes('@') || emailState === 'loading'}
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-highlight text-white rounded-xl font-bold text-sm hover:bg-highlight/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                                    >
                                        {emailState === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Mail className="w-4 h-4" /> Anmelden</>}
                                    </button>
                                </div>
                            )}
                            {emailState === 'error' && (
                                <p className="text-xs text-red-400">Etwas ist schiefgelaufen. Bitte versuche es später erneut.</p>
                            )}
                        </div>
                    ) : (
                        /* ── Podcast booking ── */
                        <div className="space-y-5">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Mic className="w-5 h-5 text-highlight flex-shrink-0" />
                                    <p className="text-base font-bold text-white">Wir laden dich zu unserem Podcast ein</p>
                                </div>
                                <p className="text-sm text-white/80 leading-relaxed mb-3">
                                    Ein offenes <span className="text-white font-semibold">30–60-minütiges Gespräch</span> mit Martin:
                                    Wie läuft deine Jobsuche gerade? Was hält dich zurück? Wo willst du hin?
                                    Wir sprechen offen darüber — <span className="text-highlight font-semibold">und veröffentlichen das Gespräch als Podcast-Episode</span>.
                                    Kein poliertes Interview. Echte Situation, echte Reflexion, echter Mehrwert für andere Bewerber.
                                </p>
                                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white/60 leading-relaxed mb-2">
                                    <p className="font-semibold text-white/80 mb-1.5">Was dich erwartet</p>
                                    <ul className="space-y-1">
                                        <li>→ Ehrliches Gespräch über deine Bewerbungssituation</li>
                                        <li>→ Konkretes Feedback zu deiner Positionierung live im Gespräch</li>
                                        <li>→ Die Episode wird veröffentlicht — du kannst sie teilen</li>
                                        <li>→ Natürlich nur mit deiner Zustimmung</li>
                                    </ul>
                                </div>
                                <p className="text-xs text-white/40">
                                    📅 Termine täglich zwischen <span className="text-white/60 font-semibold">18:00 – 19:00 Uhr</span>.
                                    Gib deinen Wunschtermin an — Martin meldet sich per E-Mail zur Bestätigung.
                                </p>
                            </div>

                            {callState === 'success' ? (
                                <div className="flex items-center gap-3 bg-green-500/20 border border-green-400/30 rounded-xl px-4 py-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                                    <p className="text-sm text-green-300 font-medium">
                                        Danke! Martin meldet sich per E-Mail, um Termin und Details zu bestätigen.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <input
                                        type="email"
                                        value={callEmail}
                                        onChange={e => setCallEmail(e.target.value)}
                                        placeholder="Deine E-Mail-Adresse"
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-highlight/60 transition-all"
                                    />
                                    <input
                                        type="text"
                                        value={callTime}
                                        onChange={e => setCallTime(e.target.value)}
                                        placeholder="Wann passt es dir? z. B. Mo, Di oder Mi um 18:00 Uhr"
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-highlight/60 transition-all"
                                    />
                                    <button
                                        onClick={handleCallSubmit}
                                        disabled={!callEmail.includes('@') || callState === 'loading'}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-highlight text-white rounded-xl font-bold text-sm hover:bg-highlight/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
                                    >
                                        {callState === 'loading'
                                            ? <Loader2 className="w-4 h-4 animate-spin" />
                                            : <><Mic className="w-4 h-4" /> Zum Podcast einschreiben — kostenlos</>
                                        }
                                    </button>
                                    {callState === 'error' && (
                                        <p className="text-xs text-red-400 text-center">Etwas ist schiefgelaufen. Bitte versuche es erneut.</p>
                                    )}
                                    <p className="text-xs text-white/40 text-center">Keine Verpflichtung. Das Gespräch findet nur mit deiner Zustimmung statt.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Feedback form ── */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8"
            >
                <h3 className="text-lg font-bold font-serif mb-1">Wie können wir es besser machen?</h3>
                <p className="text-sm text-muted mb-5">Dein Feedback hilft uns, das Spiel zu verbessern. Anonym und freiwillig.</p>

                {feedbackState === 'success' ? (
                    <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 rounded-xl p-4">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                        <p className="font-medium text-sm">Danke für dein Feedback! Wir nehmen es uns zu Herzen.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <textarea
                            value={feedbackText}
                            onChange={e => setFeedbackText(e.target.value)}
                            placeholder="Was hat dir gefallen? Was sollten wir verbessern?"
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink/40 transition-all placeholder:text-muted"
                        />
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={feedbackEmail}
                                onChange={e => setFeedbackEmail(e.target.value)}
                                placeholder="Deine E-Mail (optional)"
                                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20 transition-all placeholder:text-muted"
                            />
                            <button
                                onClick={handleFeedbackSubmit}
                                disabled={!feedbackText.trim() || feedbackState === 'loading'}
                                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-ink text-paper rounded-xl font-bold text-sm hover:bg-black transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {feedbackState === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                Feedback senden
                            </button>
                        </div>
                        {feedbackState === 'error' && (
                            <p className="text-red-600 text-xs">Leider ist etwas schiefgelaufen.</p>
                        )}
                    </div>
                )}
            </motion.div>

            {/* ── Restart ── */}
            <div className="text-center pb-6">
                <button
                    onClick={() => { resetGame(); setGameState('applicant_intro'); }}
                    className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors underline underline-offset-2"
                >
                    <RefreshCw className="w-3.5 h-3.5" /> Neue Simulation starten
                </button>
            </div>
        </div>
    );
}
