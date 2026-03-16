import { useState } from 'react';
import { CheckCircle, ArrowRight, Star, Users, BrainCircuit, ChevronDown, BookOpen, Target } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { trackInteraction } from '../services/api';

// ─── Expanded FAQ (Deutsch) ───────────────────────────────────────────────────
const faqs = [
    {
        q: 'Für wen ist der Hiring Manager Simulator?',
        a: 'Vor allem für Berufstätige mit fortgeschrittener Berufserfahrung, die sich auf Positionen bewerben, bei denen viele qualifizierte Kandidat:innen gegeneinander antreten — Führungsfunktionen, Leitungsstellen, spezialisierte Fachpositionen oder öffentliche Ausschreibungen mit strukturiertem Auswahlprozess. Wer es sich gefragt hat, warum starke Kandidat:innen trotzdem abgelehnt werden, findet hier die Antworten.'
    },
    {
        q: 'Was lerne ich konkret, wenn ich es spiele?',
        a: 'Du erlebst aus erster Hand, wie Personalverantwortliche Lebensläufe unter Zeitdruck bewerten, welche Eigenschaften Kandidat:innen herausstechen lassen (oder disqualifizieren), wie Budget und Dringlichkeit Entscheidungen beeinflussen, und was „Fit" von der anderen Seite des Tisches wirklich bedeutet. Die meisten Nutzer:innen berichten, dass es grundlegend verändert, wie sie sich in Bewerbungen präsentieren.'
    },
    {
        q: 'Ist es auch für Stellen im öffentlichen Sektor oder in der Wissenschaft hilfreich?',
        a: 'Ja — Auswahlkommissionen und Berufungsgremien arbeiten unter denselben kognitiven Einschränkungen wie jede andere Personalabteilung: zu viele Bewerbungen, zu wenig Zeit, hohe Unsicherheit. Das Verständnis dieser Dynamik ist genauso wertvoll bei einer Leitungsstelle in einer Bundesbehörde wie bei einer Position in der Privatwirtschaft.'
    },
    {
        q: 'Wie funktioniert die Simulation?',
        a: 'Du spielst die Rolle einer Personalverantwortlichen oder eines Hiring Managers für eine offene Stelle. Du erhältst einen Pool von Bewerberprofilen, Budgetvorgaben, Team-Feedback und einen Zeitrahmen. Du screeneest Kandidat:innen, führst simulierte Interviews und triffst eine Einstellungsentscheidung — unter realistischen Einschränkungen. Am Ende siehst du das Ergebnis und was du hätte anders machen können.'
    },
    {
        q: 'Lohnt sich die kostenlose Version?',
        a: 'Absolut. Die kostenlosen Szenarien sind vollständig funktionsfähig und decken verschiedene Branchen und Positionen ab. Die KI-generierte Option (19 € für 3 Simulations-Credits) ermöglicht es dir, eine Simulation für genau die Stelle zu erstellen, auf die du dich bewirbst — besonders nützlich zur konkreten Vorbereitung.'
    },
    {
        q: 'Kann ich eine Simulation für meine spezifische Zielstelle generieren?',
        a: 'Ja. Füge einfach die Stellenbeschreibung der Stelle ein, auf die du dich bewirbst. Die KI erstellt realistische Bewerberprofile, Auswahldrucksituationen und Entscheidungsszenarien auf Basis der echten Ausschreibung.'
    },
    {
        q: 'Wie lang dauert eine Simulation?',
        a: 'Die meisten Simulationen dauern zwischen 10 und 25 Minuten, je nachdem, wie sorgfältig du jeden Kandidaten bewertest. Es gibt keinen künstlichen Zeitdruck — du kannst dir so viel Zeit nehmen, wie du für die Entscheidungen brauchst.'
    },
    {
        q: 'Sind meine Daten sicher?',
        a: 'Wir speichern keine persönlichen Bewerbungsdaten. Wenn du die KI-Generierungsfunktion nutzt, wird die eingefügte Stellenbeschreibung ausschließlich zur Erstellung deiner Simulation verwendet und nicht für Training oder Weitergabe an Dritte genutzt. Details findest du auf unserer Datenschutzseite.'
    },
    {
        q: 'Kann ich meine Simulations-Credits weitergeben?',
        a: 'Ja — jeder Zugangscode enthält 3 KI-generierte Simulationen. Wenn du deine nächste Stelle findest, bevor du alle genutzt hast, kannst du die verbleibenden Credits gerne an Kolleg:innen oder Freund:innen weitergeben, die gerade aktiv auf Stellensuche sind.'
    },
    {
        q: 'Gibt es eine Version für Organisationen oder Berufsgruppen?',
        a: 'Noch nicht, aber wir evaluieren Möglichkeiten für Karrierezentren, Personalentwicklungsabteilungen und Berufsverbände. Bei Interesse melde dich gerne über die Kontaktdaten im Impressum.'
    }
];

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-stone-100 last:border-0">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full text-left py-5 flex items-start justify-between gap-4 group"
                aria-expanded={open}
            >
                <span className="font-semibold text-ink group-hover:text-highlight transition-colors leading-snug pr-2">
                    {q}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-muted flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </button>
            {open && (
                <div className="pb-5 text-muted leading-relaxed text-sm pr-8">
                    {a}
                </div>
            )}
        </div>
    );
}

export function B2CLandingPage() {
    const { setGameState, setActiveBlogSlug } = useGame();

    const handleCtaClick = () => {
        trackInteraction('cta_clicked');
        window.fbq?.('track', 'ViewContent', { content_name: 'Simulator Intro' });
        setGameState('applicant_intro');
    };

    return (
        <div className="min-h-screen bg-paper flex flex-col font-sans text-ink">
            {/* ── Top Bar ─────────────────────────────────────────────────────── */}
            <header className="sticky top-0 z-50 w-full bg-white border-b border-stone-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-0 text-xl font-bold tracking-tight select-none">
                        <span className="text-ink">Hiring</span>
                        <span className="text-highlight font-extrabold">Simulator</span>
                    </div>

                    <nav className="hidden sm:flex items-center gap-6 text-sm text-muted">
                        <button
                            onClick={() => setGameState('blog' as any)}
                            className="hover:text-ink transition-colors"
                        >
                            Blog
                        </button>
                        <button
                            onClick={handleCtaClick}
                            className="px-4 py-2 bg-highlight text-white rounded-lg font-bold hover:bg-highlight/90 transition-all text-sm"
                        >
                            Jetzt testen
                        </button>
                    </nav>

                    <button
                        onClick={handleCtaClick}
                        className="sm:hidden px-4 py-2 bg-highlight text-white rounded-lg font-bold hover:bg-highlight/90 transition-all text-sm"
                    >
                        Testen
                    </button>
                </div>
            </header>

            {/* ── Hero (shortened) ─────────────────────────────────────────── */}
            <main className="flex-grow flex items-center justify-center p-6 pt-10 lg:pt-14">
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                    <div className="space-y-6 order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-highlight/10 text-highlight rounded-full text-xs font-bold uppercase tracking-wider">
                            <Star className="w-3 h-3 fill-current" /> Interview-Vorbereitung
                        </div>

                        <div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-ink">
                                Warum wurdest du <span className="text-highlight">wirklich</span> abgelehnt?
                            </h1>
                            <p className="text-xs text-muted mt-3 uppercase tracking-widest">
                                Für Bewerber:innen mit fortgeschrittener Berufserfahrung
                            </p>
                        </div>

                        <p className="text-lg text-muted max-w-lg leading-relaxed">
                            Wechsle die Perspektive. Schlüpfe in die Rolle des Hiring Managers und erlebe, wie Einstellungsentscheidungen wirklich fallen — um deine eigene Bewerbung von innen heraus zu verbessern.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-2">
                            <button
                                onClick={handleCtaClick}
                                className="w-full sm:w-auto px-8 py-4 bg-highlight text-white rounded-lg font-bold text-lg hover:bg-highlight/90 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                            >
                                Kostenlos testen <ArrowRight className="w-5 h-5" />
                            </button>
                            <p className="text-xs text-muted">Bestehende Simulationen gratis. KI-Generierung ab €19.</p>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 relative flex items-center justify-center">
                        <div className="absolute top-0 right-0 w-72 h-72 bg-highlight opacity-5 rounded-full blur-3xl transform translate-x-10 -translate-y-10" />
                        <img
                            src="/hero-illustration.png"
                            alt="Hiring Manager Simulator — Erlebe den Bewerbungsprozess aus der Perspektive des Hiring Managers"
                            className="relative z-10 w-full max-w-lg drop-shadow-xl"
                        />
                    </div>

                </div>
            </main>

            {/* ── How it works ────────────────────────────────────────────────── */}
            <section className="w-full bg-white py-20 border-t border-stone-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-4">
                            So funktioniert's
                        </h2>
                        <p className="text-muted text-lg max-w-2xl mx-auto">
                            Verstehe die Regeln des Spiels, bevor du es spielst.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-highlight">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold font-serif">1. Rolle wählen</h3>
                            <p className="text-muted leading-relaxed">
                                Schlüpfe in die Rolle eines Hiring Managers. Wähle aus bestehenden Szenarien oder generiere eines für genau die Stelle, auf die du dich bewirbst.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-highlight">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold font-serif">2. Entscheidungen treffen</h3>
                            <p className="text-muted leading-relaxed">
                                Analysiere Bewerberprofile, führe Interviews und triff Einstellungsentscheidungen — unter Zeitdruck, Budget­einschränkungen und Teamdynamiken.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-highlight">
                                <BrainCircuit className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold font-serif">3. Perspektive verstehen</h3>
                            <p className="text-muted leading-relaxed">
                                Erlebe die Abwägungen und Entscheidungslogiken, die Personalverantwortliche leiten — und optimiere deine Bewerbungsstrategie von innen heraus.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Target group callout ─────────────────────────────────────────── */}
            <section className="w-full py-14 bg-highlight/5 border-t border-highlight/10">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-shrink-0 w-20 h-20 bg-highlight/10 rounded-2xl flex items-center justify-center">
                            <Target className="w-10 h-10 text-highlight" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-ink mb-3">
                                Besonders wertvoll bei kompetitiven Ausschreibungen
                            </h2>
                            <p className="text-muted leading-relaxed">
                                Je mehr Bewerbungen auf eine Stelle eingehen, desto kleiner werden die Unterschiede, auf die es wirklich ankommt.
                                Wer die Denkweise von Personalverantwortlichen versteht — was sie bevorzugen, welche Risiken sie vermeiden, welche Signale ihnen unbewusst auffallen —
                                geht fundamental anders in eine Bewerbung. Das ist der Kern des Hiring Manager Simulators.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Blog teaser ─────────────────────────────────────────────────── */}
            <section className="w-full py-16 bg-white border-t border-stone-100">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-highlight/10 text-highlight rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                            <BookOpen className="w-3 h-3" /> Blog
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink mb-3">
                            Tipps & Strategien rund ums Bewerben
                        </h2>
                        <p className="text-muted max-w-xl mx-auto">
                            Praxisnahe Leitfäden für kompetitive Bewerbungsprozesse — aus der Perspektive beider Seiten des Tisches.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div
                            className="bg-stone-50 border border-stone-100 hover:border-highlight/40 rounded-2xl p-6 cursor-pointer group transition-all"
                            onClick={() => { setActiveBlogSlug('bewerbung-vorbereitung'); setGameState('blog_post' as any); }}
                        >
                            <span className="text-xs text-highlight font-bold">Interview-Vorbereitung</span>
                            <h3 className="font-serif font-bold text-ink mt-2 mb-2 group-hover:text-highlight transition-colors leading-snug">
                                So bereitest du dich auf deine Bewerbung vor
                            </h3>
                            <p className="text-xs text-muted leading-relaxed">
                                Lebenslauf, Anschreiben, Gehaltsvorstellungen, Auftreten und die Denkweise von Recruitern.
                            </p>
                            <p className="text-xs font-semibold text-highlight mt-3 flex items-center gap-1">Artikel lesen <ArrowRight className="w-3 h-3" /></p>
                        </div>

                        <div
                            className="bg-stone-50 border border-stone-100 hover:border-highlight/40 rounded-2xl p-6 cursor-pointer group transition-all"
                            onClick={() => { setActiveBlogSlug('30-wege-anders-bewerben'); setGameState('blog_post' as any); }}
                        >
                            <span className="text-xs text-highlight font-bold">Bewerbungsstrategie</span>
                            <h3 className="font-serif font-bold text-ink mt-2 mb-2 group-hover:text-highlight transition-colors leading-snug">
                                30 Wege, dich anders zu bewerben als alle anderen
                            </h3>
                            <p className="text-xs text-muted leading-relaxed">
                                Konkrete Taktiken, um in kompetitiven Ausschreibungen aufzufallen — ohne Tricks.
                            </p>
                            <p className="text-xs font-semibold text-highlight mt-3 flex items-center gap-1">Artikel lesen <ArrowRight className="w-3 h-3" /></p>
                        </div>

                        <div
                            className="bg-stone-50 border border-stone-100 hover:border-highlight/40 rounded-2xl p-6 cursor-pointer group transition-all"
                            onClick={() => { setActiveBlogSlug('hr-perspektive-verstehen'); setGameState('blog_post' as any); }}
                        >
                            <span className="text-xs text-highlight font-bold">HR-Perspektive</span>
                            <h3 className="font-serif font-bold text-ink mt-2 mb-2 group-hover:text-highlight transition-colors leading-snug">
                                Was du lernst, wenn du den Hiring Manager spielst
                            </h3>
                            <p className="text-xs text-muted leading-relaxed">
                                HR-Ängste, Stakeholder-Dynamiken, der „Fit“-Begriff — die andere Seite des Tisches verstehen.
                            </p>
                            <p className="text-xs font-semibold text-highlight mt-3 flex items-center gap-1">Artikel lesen <ArrowRight className="w-3 h-3" /></p>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <button
                            onClick={() => setGameState('blog' as any)}
                            className="text-sm text-muted hover:text-ink transition-colors underline underline-offset-2"
                        >
                            Alle Artikel ansehen →
                        </button>
                    </div>
                </div>
            </section>

            {/* ── FAQ ─────────────────────────────────────────────────────────── */}
            <section className="w-full py-20 bg-paper border-t border-stone-100">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-ink mb-3">
                            Häufige Fragen
                        </h2>
                        <p className="text-muted">Alles, was du vor dem Start wissen solltest.</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
                        <div className="px-6">
                            {faqs.map((f, i) => (
                                <FAQItem key={i} q={f.q} a={f.a} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Footer ─────────────────────────────────────────────────────── */}
            <footer className="w-full border-t border-stone-100 py-8 px-6 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted">
                    <div className="flex items-center gap-0 font-bold text-sm">
                        <span className="text-ink">Hiring</span>
                        <span className="text-highlight">Simulator</span>
                    </div>
                    <p>© {new Date().getFullYear()} Hiring Manager Simulator. Alle Rechte vorbehalten.</p>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setGameState('blog' as any)} className="hover:text-ink transition-colors">Blog</button>
                        <button onClick={() => setGameState('impressum' as any)} className="hover:text-ink transition-colors">Impressum</button>
                        <button onClick={() => setGameState('datenschutz' as any)} className="hover:text-ink transition-colors">Datenschutz</button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
