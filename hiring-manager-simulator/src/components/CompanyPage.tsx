import { useState } from 'react';
import { Building2, ArrowRight, Calculator, Users, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { joinNewsletter } from '../services/api';

export function CompanyPage() {
    const { setGameState } = useGame();
    const [rejectedCount, setRejectedCount] = useState(50);
    const [email, setEmail] = useState('');
    const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');

    // Pricing logic: Base fee + per candidate cost
    const baseFee = 49;
    const pricePerCandidate = 0.50;
    const totalPrice = baseFee + (rejectedCount * pricePerCandidate);

    const handleSubmit = async () => {
        const trimmed = email.trim().toLowerCase();
        if (!trimmed || !trimmed.includes('@')) return;
        setSubmitState('loading');
        const result = await joinNewsletter(trimmed, {
            rejected_count: rejectedCount,
            monthly_price: Math.round(totalPrice),
            source: 'company_roi_calculator',
        });
        if (!result) { setSubmitState('error'); return; }
        setSubmitState(result.is_new ? 'success' : 'duplicate');
    };

    return (
        <div className="min-h-screen bg-paper flex flex-col font-sans text-ink">
            {/* Header */}
            <header className="px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-highlight text-white rounded flex items-center justify-center font-bold font-serif text-xl">
                        J
                    </div>
                    <span className="font-serif font-bold text-xl tracking-tight">Jobaktuell Services</span>
                </div>

                {/* Simplified Nav - removed "fluff" links */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setGameState('b2c_home')}
                        className="text-sm font-bold text-highlight hover:text-highlight/80 transition-colors"
                    >
                        Für Bewerber
                    </button>
                </div>
            </header>

            {/* Hero */}
            <main className="flex-grow flex flex-col items-center">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
                    <div className="space-y-8">
                        <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[0.9] text-ink">
                            Menschliches Hiring <br />
                            <span className="text-highlight">beginnt hier.</span>
                        </h1>
                        <p className="text-xl text-muted max-w-lg leading-relaxed">
                            Verwandeln Sie Absagen in wertvolle Lernmomente.
                            Geben Sie Kandidaten mit einer interaktiven Simulation die Chance, die andere Seite des Tisches zu sehen.
                        </p>
                        <div className="flex items-center gap-4 text-sm font-medium text-muted">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-stone-300 border-2 border-paper" />
                                ))}
                            </div>
                            <p>Vertraut von 500+ Unternehmen</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-2xl border border-stone-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Building2 className="w-64 h-64" />
                        </div>

                        <h3 className="text-2xl font-serif font-bold mb-6">ROI Kalkulator</h3>

                        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-6 relative z-10">
                            <div>
                                <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-highlight" />
                                    Abgelehnte Kandidaten pro Monat
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="10"
                                        max="1000"
                                        step="10"
                                        value={rejectedCount}
                                        onChange={(e) => setRejectedCount(parseInt(e.target.value))}
                                        className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-highlight"
                                    />
                                    <span className="font-bold font-serif text-xl w-16 text-right">{rejectedCount}</span>
                                </div>
                                <p className="text-xs text-muted mt-2">
                                    "Wir lehnen <strong className="text-ink">{rejectedCount} Kandidaten</strong> ab, die in Zukunft Potenzial haben könnten."
                                </p>
                            </div>

                            <div className="border-t border-stone-200 pt-4 flex justify-between items-end">
                                <div>
                                    <p className="text-sm text-muted">Ihr Preis-Modell</p>
                                    <p className="text-xs text-stone-400">Basis €{baseFee} + €{pricePerCandidate.toFixed(2)}/Kandidat</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-serif font-bold text-highlight">
                                        € {totalPrice.toFixed(0)}
                                    </div>
                                    <span className="text-sm text-muted">pro Monat</span>
                                </div>
                            </div>

                            <div>
                                <input
                                    type="email"
                                    placeholder="Ihre Unternehmens E-Mail"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                                    disabled={submitState === 'loading' || submitState === 'success'}
                                    className="w-full px-4 py-3 rounded border border-stone-300 focus:outline-none focus:border-highlight mb-3 disabled:opacity-50"
                                />

                                {/* Feedback messages */}
                                {submitState === 'success' && (
                                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-3">
                                        <CheckCircle className="w-4 h-4" />
                                        Angebot angefordert! Wir melden uns bald.
                                    </div>
                                )}
                                {submitState === 'duplicate' && (
                                    <div className="flex items-center gap-2 text-amber-600 text-sm mb-3">
                                        <CheckCircle className="w-4 h-4" />
                                        Diese E-Mail ist bereits registriert – wir sind dran!
                                    </div>
                                )}
                                {submitState === 'error' && (
                                    <div className="flex items-center gap-2 text-red-500 text-sm mb-3">
                                        <AlertCircle className="w-4 h-4" />
                                        Fehler – bitte erneut versuchen.
                                    </div>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    disabled={submitState === 'loading' || submitState === 'success' || !email.includes('@')}
                                    className="w-full py-3 bg-ink text-white rounded font-bold hover:bg-black transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitState === 'loading' ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Wird gesendet…</>
                                    ) : submitState === 'success' ? (
                                        <><CheckCircle className="w-4 h-4" /> Angefordert!</>
                                    ) : (
                                        <><Calculator className="w-4 h-4" /> Angebot mit Beispielsimulation anfordern</>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-stone-100 text-center">
                            <p className="text-xs text-center text-muted uppercase tracking-wider mb-4">Simulator Ausprobieren</p>
                            <button
                                className="text-sm text-highlight hover:text-highlight/80 font-bold underline decoration-2 underline-offset-4"
                                onClick={() => setGameState('applicant_intro')}
                            >
                                Einladungs-Link simulieren &rarr;
                            </button>
                        </div>
                    </div>
                </div>

                {/* How it works Section */}
                <section className="w-full bg-stone-50 py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-4">So verwandeln Sie Absagen in Chancen</h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto">Ein einfacher Prozess für besseres Employer Branding.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-stone-200 flex items-center justify-center text-highlight">
                                    <Users className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold font-serif">1. Kandidat absagen</h3>
                                <p className="text-muted leading-relaxed">
                                    Senden Sie Ihre Absage wie gewohnt per E-Mail an den Bewerber.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-stone-200 flex items-center justify-center text-highlight">
                                    <ArrowRight className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold font-serif">2. Link mitsenden</h3>
                                <p className="text-muted leading-relaxed">
                                    Fügen Sie den Link zum Simulator als "lehrreiche Erfahrung" und Goodie hinzu.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-stone-200 flex items-center justify-center text-highlight">
                                    <Calculator className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold font-serif">3. Marke stärken</h3>
                                <p className="text-muted leading-relaxed">
                                    Der Kandidat versteht die andere Seite und behält Ihr Unternehmen positiv in Erinnerung.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Rejection Email Sample Section */}
                <section className="w-full bg-white py-20 border-t border-stone-100">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-4">
                                So sieht Ihre Absage aus
                            </h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto">
                                Kopieren Sie einfach diese Vorlage – und fügen Sie Ihren personalisierten Link ein.
                            </p>
                        </div>

                        {/* Email mockup */}
                        <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
                            {/* Email client header bar */}
                            <div className="bg-stone-100 border-b border-stone-200 px-6 py-3 flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-4 text-xs text-stone-400 font-mono">Neue E-Mail — Absage.eml</span>
                            </div>

                            {/* Email meta */}
                            <div className="px-8 py-5 border-b border-stone-100 space-y-1.5 bg-stone-50">
                                <div className="flex gap-3 text-sm">
                                    <span className="text-stone-400 w-12 flex-shrink-0">Von:</span>
                                    <span className="text-ink font-medium">hr@ihr-unternehmen.de</span>
                                </div>
                                <div className="flex gap-3 text-sm">
                                    <span className="text-stone-400 w-12 flex-shrink-0">An:</span>
                                    <span className="text-ink font-medium">max.mustermann@email.de</span>
                                </div>
                                <div className="flex gap-3 text-sm">
                                    <span className="text-stone-400 w-12 flex-shrink-0">Betreff:</span>
                                    <span className="text-ink font-semibold">Ihre Bewerbung als Büroassistenz (m/w/d)</span>
                                </div>
                            </div>

                            {/* Email body */}
                            <div className="px-8 py-8 space-y-5 text-sm leading-relaxed text-stone-700 font-sans">
                                <p>Sehr geehrter Herr Mustermann,</p>
                                <p>
                                    vielen Dank für Ihr Interesse an einer Tätigkeit in unserem Unternehmen
                                    und die Zeit, die Sie in Ihre Bewerbung investiert haben.
                                </p>
                                <p>
                                    Nach sorgfältiger Prüfung aller eingegangenen Bewerbungen müssen wir Ihnen
                                    leider mitteilen, dass wir uns für einen anderen Kandidaten entschieden haben,
                                    dessen Profil zum jetzigen Zeitpunkt noch etwas besser zu den spezifischen
                                    Anforderungen der Stelle passt.
                                </p>
                                <p>
                                    Wir wünschen Ihnen für Ihre weitere berufliche Laufbahn alles Gute und
                                    hoffen, dass Sie bald die richtige Stelle finden.
                                </p>
                                <p>Mit freundlichen Grüßen,<br />
                                    <strong>Sarah Hoffmann</strong><br />
                                    Human Resources · Musterunternehmen GmbH
                                </p>

                                {/* The PS — highlighted */}
                                <div className="border-l-4 border-highlight pl-4 py-3 bg-highlight/5 rounded-r-lg mt-6">
                                    <p className="text-ink">
                                        <span className="font-bold text-highlight">P.S.</span>{' '}
                                        Wir haben gesehen, wie viel Mühe Sie in Ihre Bewerbung gesteckt haben –
                                        das ist uns aufgefallen. Genau deshalb möchten wir Ihnen etwas mitgeben:{' '}
                                        <a
                                            href="https://wiesorium.github.io/hiringmanager/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-bold text-highlight underline decoration-2 underline-offset-2 hover:text-highlight/80 transition-colors"
                                        >
                                            Hiring Manager Simulator →
                                        </a>
                                        {' '}Simulieren Sie selbst einmal die andere Seite des Tisches –
                                        und gewinnen Sie ein Gespür dafür, wie Hiring-Entscheidungen wirklich fallen.
                                        Kostenlos, 5 Minuten. Viel Erfolg!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-xs text-stone-400 mt-6">
                            ↑ Einfach kopieren, Link anpassen, und versenden. Fertig.
                        </p>
                    </div>
                </section>
            </main>


            <footer className="py-12 text-center text-stone-500 font-serif italic text-lg">
                "Für den Preis eines Stiftes – die menschliche Art, Talente abzuweisen."
            </footer>
        </div>
    );
}
