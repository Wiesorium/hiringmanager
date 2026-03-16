import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Mail, Calendar, BookOpen, Loader2, CheckCircle2 } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { cn } from '../lib/utils';

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

    // Email form
    const [email, setEmail] = useState('');
    const [emailState, setEmailState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleEmailSubmit = async () => {
        if (!email.trim() || !email.includes('@') || emailState === 'loading') return;
        setEmailState('loading');
        const res = await subscribeNewsletter(email.trim());
        setEmailState(res ? 'success' : 'error');
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-14 space-y-10 max-w-4xl mx-auto"
        >
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

            {/* ── Blog teasers ── */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-4 h-4 text-highlight" />
                    <h3 className="font-bold text-ink">
                        {checked.size > 0 && uncheckedIds.size > 0
                            ? 'Lese als nächstes — auf Basis dessen, was du noch nicht abgehakt hast'
                            : 'Vertiefe dein Wissen'}
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sorted.map((post) => {
                        const isHighlighted = post.learnId !== null && uncheckedIds.has(post.learnId);
                        return (
                            <button
                                key={post.slug}
                                onClick={() => navigateToBlog(post.slug)}
                                className={cn(
                                    'w-full text-left rounded-xl border-2 p-5 transition-all group',
                                    isHighlighted
                                        ? 'border-highlight/30 bg-highlight/5 hover:border-highlight/60'
                                        : 'border-stone-100 bg-white hover:border-highlight/30 hover:bg-highlight/5'
                                )}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold text-highlight">{post.label}</span>
                                    {isHighlighted && (
                                        <span className="text-xs bg-highlight/10 text-highlight px-2 py-0.5 rounded-full font-semibold">Empfohlen</span>
                                    )}
                                </div>
                                <p className="font-serif font-bold text-ink group-hover:text-highlight transition-colors text-sm leading-snug mb-1">
                                    {post.title}
                                </p>
                                <p className="text-xs text-muted leading-relaxed">{post.desc}</p>
                                <p className="text-xs font-semibold text-highlight mt-3 flex items-center gap-1">
                                    Artikel lesen <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── CTA: Email or Call ── */}
            <div className="bg-ink rounded-2xl overflow-hidden text-white">
                <div className="px-8 pt-8 pb-6 text-center border-b border-white/10">
                    <h3 className="text-2xl font-serif font-bold mb-2">Bring deine Bewerbung auf das nächste Level</h3>
                    <p className="text-white/70 text-sm leading-relaxed max-w-lg mx-auto">
                        Wähle, wie du weitermachen möchtest — mit gezielten Blogartikeln per E-Mail oder einem direkten Gespräch.
                    </p>
                </div>

                {/* Tab switcher */}
                <div className="flex border-b border-white/10">
                    <button
                        onClick={() => setTab('email')}
                        className={cn(
                            'flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all',
                            tab === 'email' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'
                        )}
                    >
                        <Mail className="w-4 h-4" /> Blog-Tipps per E-Mail
                    </button>
                    <button
                        onClick={() => setTab('call')}
                        className={cn(
                            'flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all',
                            tab === 'call' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'
                        )}
                    >
                        <Calendar className="w-4 h-4" /> 30-min Beratungsgespräch
                    </button>
                </div>

                <div className="px-8 py-7">
                    {tab === 'email' ? (
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-white/80 leading-relaxed mb-4">
                                    Du bekommst eine kleine E-Mail-Strecke mit den Artikeln, die zu deinen offenen Lernfeldern passen —
                                    kein Spam, keine generischen Newsletter. Nur das, was für deine Bewerbung gerade relevant ist.
                                </p>
                                {/* Teaser of "not yet checked" */}
                                {uncheckedIds.size > 0 && (
                                    <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4">
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
                            </div>
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
                        <div className="space-y-4">
                            <p className="text-sm text-white/80 leading-relaxed">
                                Du bekommst ein <span className="text-white font-semibold">kostenloses 30-minütiges Gespräch</span> — kein Sales-Call,
                                sondern ein ehrliches Mini-Gespräch mit Martin: wie läuft deine Jobsuche gerade, wo willst du hin,
                                und was hält dich zurück. Wie ein kleiner Podcast — nur über deine Karriere.
                            </p>
                            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white/60 leading-relaxed">
                                <p className="font-semibold text-white/80 mb-1">Was dich erwartet</p>
                                <ul className="space-y-1 list-none">
                                    <li>→ Kurzes Gespräch über deine aktuelle Bewerbungssituation</li>
                                    <li>→ Konkretes Feedback zu deiner Positionierung</li>
                                    <li>→ 1–2 sofort umsetzbare Stellschrauben für deinen nächsten Schritt</li>
                                </ul>
                            </div>
                            <a
                                href="https://cal.com/martinwieser/bewerbungsberatung-30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-highlight text-white rounded-xl font-bold text-sm hover:bg-highlight/90 transition-all shadow-lg"
                            >
                                <Calendar className="w-4 h-4" /> Termin buchen — kostenlos
                            </a>
                            <p className="text-xs text-white/40 text-center">Kein Kauf, keine Verpflichtung. Einfach ein gutes Gespräch.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Restart ── */}
            <div className="text-center pb-4">
                <button
                    onClick={() => { resetGame(); setGameState('applicant_intro'); }}
                    className="text-sm text-muted hover:text-ink transition-colors underline underline-offset-2"
                >
                    Neue Simulation starten →
                </button>
            </div>
        </motion.div>
    );
}
