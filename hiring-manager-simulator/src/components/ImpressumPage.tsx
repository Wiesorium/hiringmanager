import { ArrowLeft } from 'lucide-react';
import { useGame } from '../context/GameContext';

export function ImpressumPage() {
    const { setGameState } = useGame();

    return (
        <div className="min-h-screen bg-paper flex flex-col font-sans text-ink">
            <header className="px-6 py-6 max-w-4xl mx-auto w-full">
                <button
                    onClick={() => setGameState('b2c_home')}
                    className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Zurück
                </button>
            </header>

            <main className="flex-grow max-w-4xl mx-auto px-6 pb-16 w-full">
                <h1 className="text-4xl font-serif font-bold mb-8">Impressum</h1>

                <div className="prose prose-stone max-w-none space-y-6 text-sm leading-relaxed">
                    <section>
                        <h2 className="text-xl font-serif font-bold mb-3">Angaben gemäß § 25 MedienG</h2>
                        <p>
                            Hiring Manager Simulator<br />
                            Martin Wieser<br />
                            Guritzerstraße 110<br />
                            5020 Salzburg<br />
                            Österreich
                        </p>
                        <p className="mt-2 text-muted italic text-xs">Unternehmen in Gründung</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-serif font-bold mb-3">Kontakt</h2>
                        <p>
                            E-Mail: wiesorium@gmail.com
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-serif font-bold mb-3">Verantwortlich für den Inhalt</h2>
                        <p>
                            Martin Wieser<br />
                            Guritzerstraße 110<br />
                            5020 Salzburg
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-serif font-bold mb-3">Haftungsausschluss</h2>
                        <p>
                            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
                            Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                            können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind
                            wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                            verantwortlich. Eine Verpflichtung zur Überwachung übermittelter oder
                            gespeicherter fremder Informationen besteht jedoch nicht.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-serif font-bold mb-3">Streitschlichtung</h2>
                        <p>
                            Die Europäische Kommission stellt eine Plattform zur
                            Online-Streitbeilegung (OS) bereit:{' '}
                            <a
                                href="https://ec.europa.eu/consumers/odr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-highlight underline"
                            >
                                https://ec.europa.eu/consumers/odr
                            </a>.
                            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
                            vor einer Verbraucherschlichtungsstelle teilzunehmen.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
