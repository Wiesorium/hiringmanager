import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';

export function CompanyPage() {
    const { setGameState } = useGame();

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full text-center"
            >
                <div className="mb-8">
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 mb-4">
                        TalentLoop
                    </h1>
                    <p className="text-xl text-gray-400">
                        Verwandeln Sie Absagen in wertvolle Lernmomente.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
                    <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-colors">
                        <h3 className="text-2xl font-bold mb-4 text-blue-300">Für Unternehmen</h3>
                        <p className="text-gray-300 mb-6">
                            Geben Sie abgelehnten Bewerbern die Chance, den Einstellungsprozess spielerisch zu verstehen.
                        </p>
                        <ul className="text-gray-400 space-y-2 mb-8">
                            <li className="flex items-center">✓ 10-500 Einladungen / Monat</li>
                            <li className="flex items-center">✓ Employer Branding stärken</li>
                            <li className="flex items-center">✓ Transparenz schaffen</li>
                        </ul>
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                            onClick={() => alert("Abo-Modell Simulation: Abonnement abgeschlossen!")}
                        >
                            Abo wählen (Demo)
                        </button>
                    </div>

                    <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-teal-500 transition-colors">
                        <h3 className="text-2xl font-bold mb-4 text-teal-300">Demo Starten</h3>
                        <p className="text-gray-300 mb-6">
                            Testen Sie die Erfahrung aus Sicht eines Bewerbers, der eine Einladung erhalten hat.
                        </p>
                        <div className="bg-gray-900 p-4 rounded-lg border border-dashed border-gray-600 mb-8 text-sm text-gray-500 font-mono">
                            Betreff: Einladung zur Hiring Simulation<br />
                            Von: hr@ihrefirma.de<br />
                            An: bewerber@email.de
                        </div>
                        <button
                            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                            onClick={() => setGameState('applicant_intro')}
                        >
                            Einladungs-Link simulieren
                        </button>
                    </div>
                </div>

                <p className="text-gray-500 text-sm">
                    © 2024 TalentLoop GmbH. Alle Rechte vorbehalten.
                </p>
            </motion.div>
        </div>
    );
}
