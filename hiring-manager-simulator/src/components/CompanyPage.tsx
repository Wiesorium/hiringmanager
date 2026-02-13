import { useState } from 'react';
import { Building2, ArrowRight, Calculator, Users } from 'lucide-react';
import { useGame } from '../context/GameContext';

export function CompanyPage() {
    const { setGameState } = useGame();
    const [rejectedCount, setRejectedCount] = useState(50);

    // Pricing logic: Base fee + per candidate cost
    const baseFee = 49;
    const pricePerCandidate = 0.50;
    const totalPrice = baseFee + (rejectedCount * pricePerCandidate);

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
                            Geben Sie Kandidaten die Chance, die andere Seite des Tisches zu sehen.
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
                                    className="w-full px-4 py-3 rounded border border-stone-300 focus:outline-none focus:border-highlight mb-4"
                                />
                                <button className="w-full py-3 bg-ink text-white rounded font-bold hover:bg-black transition-colors flex justify-center items-center gap-2">
                                    <Calculator className="w-4 h-4" />
                                    Angebot mit Beispielsimulation anfordern
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
            </main>

            <footer className="py-12 text-center text-stone-500 font-serif italic text-lg">
                "Die menschliche Art, Talente abzulehnen – zum Preis eines Stiftes."
            </footer>
        </div>
    );
}
