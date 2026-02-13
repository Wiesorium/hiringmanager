import { CheckCircle, ArrowRight, Star, Users, BrainCircuit } from 'lucide-react';
import { useGame } from '../context/GameContext';

export function B2CLandingPage() {
    const { setGameState } = useGame();

    return (
        <div className="min-h-screen bg-paper flex flex-col font-sans text-ink">
            {/* Header */}
            <header className="px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-highlight text-white rounded flex items-center justify-center font-bold font-serif text-xl">
                        J
                    </div>
                    <span className="font-serif font-bold text-xl tracking-tight">Jobaktuell</span>
                </div>
                <button
                    onClick={() => setGameState('company_home')}
                    className="text-sm font-medium hover:text-highlight transition-colors"
                >
                    Für Unternehmen
                </button>
            </header>

            {/* Hero */}
            <main className="flex-grow flex items-center justify-center p-6">
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-highlight/10 text-highlight rounded-full text-xs font-bold uppercase tracking-wider">
                            <Star className="w-3 h-3 fill-current" /> Neu für Bewerber
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight text-ink">
                            Warum wurdest du <span className="text-highlight">wirklich</span> abgelehnt?
                        </h1>
                        <p className="text-xl text-muted max-w-lg leading-relaxed">
                            Wechsle die Perspektive. Schlüpfe in die Rolle des Hiring Managers und verstehe, wie Entscheidungen hinter verschlossenen Türen getroffen werden.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-highlight" />
                                <span className="text-lg">Zugriff auf alle 4 Szenarien</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-highlight" />
                                <span className="text-lg">Echtes Budget- & Zeit-Management</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-highlight" />
                                <span className="text-lg">Lerne, worauf es ankommt</span>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
                            <button
                                onClick={() => setGameState('applicant_intro')}
                                className="w-full sm:w-auto px-8 py-4 bg-highlight text-white rounded-lg font-bold text-lg hover:bg-highlight/90 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                            >
                                Zugang sichern für €4,99 <ArrowRight className="w-5 h-5" />
                            </button>
                            <p className="text-xs text-muted">Einmalige Zahlung. Kein Abo.</p>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 relative">
                        <div className="absolute top-0 right-0 w-72 h-72 bg-highlight opacity-5 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
                        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-stone-100 relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span className="text-xs font-mono text-muted">hiring-simulator.exe</span>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-stone-50 rounded border border-stone-100 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-ink rounded-full flex items-center justify-center text-white font-serif font-bold">A</div>
                                    <div>
                                        <h4 className="font-bold text-sm">Anna Müller</h4>
                                        <p className="text-xs text-muted">Büroassistenz • 5J Erf.</p>
                                    </div>
                                    <span className="ml-auto text-xs font-bold text-green-600 border border-green-200 px-2 py-1 rounded">Top Kandidat</span>
                                </div>

                                <div className="p-4 bg-stone-50 rounded border border-stone-100 flex items-center gap-4 opacity-75">
                                    <div className="w-10 h-10 bg-stone-300 rounded-full flex items-center justify-center text-white font-serif font-bold">K</div>
                                    <div>
                                        <h4 className="font-bold text-sm">Kevin Schneider</h4>
                                        <p className="text-xs text-muted">Büroassistenz • 1J Erf.</p>
                                    </div>
                                    <span className="ml-auto text-xs font-bold text-red-600 border border-red-200 px-2 py-1 rounded">Abgelehnt</span>
                                </div>

                                <div className="p-4 bg-stone-50 rounded border border-stone-100 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-highlight text-white rounded-full flex items-center justify-center font-serif font-bold">
                                        <BrainCircuit className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">Simulator Analyse</h4>
                                        <p className="text-xs text-muted">"Du hast das Budget überschritten..."</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-2xl font-serif font-bold text-ink">€ 4,99</p>
                                <p className="text-xs text-muted line-through">statt € 19,99</p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* How it works Section */}
            <section className="w-full bg-white py-20 border-t border-stone-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-4">Meistere das Bewerbungsgespräch</h2>
                        <p className="text-muted text-lg max-w-2xl mx-auto">Verstehe die Regeln des Spiels, um es zu gewinnen.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-highlight">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold font-serif">1. Rolle wählen</h3>
                            <p className="text-muted leading-relaxed">
                                Schlüpfe in die Rolle eines Hiring Managers. Wähle aus verschiedenen Branchen vom Lager bis zum Marketing.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-highlight">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold font-serif">2. Entscheidungen treffen</h3>
                            <p className="text-muted leading-relaxed">
                                Wen stellst du ein? Analysiere Lebensläufe, führe Interviews und verwalte dein Budget.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-highlight">
                                <BrainCircuit className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold font-serif">3. Perspektive verstehen</h3>
                            <p className="text-muted leading-relaxed">
                                Lerne die Kriterien der anderen Seite kennen und optimiere so deine eigene Bewerbungsstrategie.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
