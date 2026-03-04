import { ArrowLeft } from 'lucide-react';
import { useGame } from '../context/GameContext';

export function DatenschutzPage() {
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
                <h1 className="text-4xl font-serif font-bold mb-8">Datenschutzerklärung</h1>

                <div className="prose prose-stone max-w-none space-y-6 text-sm leading-relaxed">
                    <section>
                        <h2 className="text-xl font-serif font-bold mb-3">1. Verantwortlicher</h2>
                        <p>
                            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
                            Hiring Manager Simulator<br />
                            Martin Wieser<br />
                            Guritzerstraße 110, 5020 Salzburg<br />
                            E-Mail: wiesorium@gmail.com
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-serif font-bold mb-3">2. Erhebung und Speicherung personenbezogener Daten</h2>
                        <p>
                            Beim Besuch unserer Website werden automatisch Informationen durch den
                            Browser übermittelt und in Server-Logfiles gespeichert. Diese Daten
                            umfassen Browsertyp, Betriebssystem, Referrer-URL, IP-Adresse und
                            Zeitpunkt des Zugriffs. Eine Zuordnung zu einer bestimmten Person ist
                            nicht möglich.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-serif font-bold mb-3">3. Cookies</h2>
                        <p>
                            Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die
                            auf Ihrem Endgerät gespeichert werden. Einige Cookies sind technisch
                            notwendig (z. B. für die Funktionalität des Simulators), andere dienen
                            der Analyse und dem Marketing.
                        </p>
                        <p>
                            <strong>Technisch notwendige Cookies:</strong> Diese sind für den Betrieb
                            der Website erforderlich und können nicht deaktiviert werden.
                        </p>
                        <p>
                            <strong>Analyse- und Marketing-Cookies:</strong> Wir setzen den Meta Pixel
                            (Facebook) ein, um die Effektivität unserer Werbeanzeigen zu messen.
                            Diese Cookies werden nur mit Ihrer Einwilligung gesetzt.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-serif font-bold mb-3">4. Meta Pixel (Facebook)</h2>
                        <p>
                            Wir verwenden auf unserer Website den Meta Pixel (ehemals Facebook Pixel)
                            der Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland.
                        </p>
                        <p>
                            Der Meta Pixel ermöglicht es uns, das Verhalten von Nutzern nachzuverfolgen,
                            nachdem diese durch Klicken auf eine Facebook-Werbeanzeige auf unsere Website
                            weitergeleitet wurden. So können wir die Wirksamkeit unserer Werbung messen.
                        </p>
                        <p>
                            Die erhobenen Daten sind für uns anonym, werden jedoch von Meta gespeichert
                            und verarbeitet. Meta kann diese Daten mit Ihrem Facebook-Konto verbinden.
                            Weitere Informationen finden Sie in der{' '}
                            <a
                                href="https://www.facebook.com/privacy/policy/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-highlight underline"
                            >
                                Datenschutzrichtlinie von Meta
                            </a>.
                        </p>
                        <p>
                            Rechtsgrundlage ist Ihre Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO.
                            Sie können Ihre Einwilligung jederzeit über den Cookie-Banner widerrufen.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-serif font-bold mb-3">5. Zahlungsabwicklung</h2>
                        <p>
                            Für die Abwicklung von Zahlungen nutzen wir den Dienst Stripe
                            (Stripe, Inc., 510 Townsend Street, San Francisco, CA 94103, USA).
                            Bei einem Kauf werden Ihre Zahlungsdaten direkt von Stripe verarbeitet.
                            Wir erhalten keine vollständigen Kreditkartendaten. Weitere Informationen
                            finden Sie in der{' '}
                            <a
                                href="https://stripe.com/at/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-highlight underline"
                            >
                                Datenschutzrichtlinie von Stripe
                            </a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-serif font-bold mb-3">6. Newsletter</h2>
                        <p>
                            Wenn Sie sich für unseren Newsletter anmelden, wird Ihre E-Mail-Adresse
                            gespeichert, um Ihnen regelmäßig Informationen zusenden zu können.
                            Die Abmeldung ist jederzeit über einen Link in jeder E-Mail möglich.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-serif font-bold mb-3">7. Ihre Rechte</h2>
                        <p>
                            Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
                            Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch.
                            Bitte wenden Sie sich dazu an die oben genannte Kontaktadresse.
                        </p>
                        <p>
                            Zudem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
                            zu beschweren. In Österreich ist dies die{' '}
                            <a
                                href="https://www.dsb.gv.at"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-highlight underline"
                            >
                                Österreichische Datenschutzbehörde
                            </a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-serif font-bold mb-3">8. Änderungen</h2>
                        <p>
                            Wir behalten uns vor, diese Datenschutzerklärung anzupassen.
                            Die aktuelle Version finden Sie stets auf dieser Seite.
                        </p>
                        <p className="text-muted mt-4">Stand: März 2026</p>
                    </section>
                </div>
            </main>
        </div>
    );
}
