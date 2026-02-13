import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export function PhaseReveal() {
    const { candidates, finalChoice, resetGame } = useGame();

    const chosenCandidate = candidates.find(c => c.id === finalChoice);

    // Mock "Real Hiring Manager" choice - logic is a bit placeholder-y
    // We can just pick the 'success' candidate if the user didn't pick it, or a specific one.
    // For now, let's just make it random from the pool or finding a 'success' one.
    const realManagerChoice = candidates.find(c => c.outcome.type === 'success' && c.id !== finalChoice) || candidates.find(c => c.outcome.type === 'success') || candidates[0];

    if (!chosenCandidate) return null;

    const isSuccess = chosenCandidate.outcome.type === 'success';
    const isFailure = chosenCandidate.outcome.type === 'failure';

    return (
        <div className="space-y-12 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block"
                >
                    <span className={cn(
                        "px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider",
                        isSuccess ? "bg-green-100 text-green-800" : isFailure ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                    )}>
                        {isSuccess ? "Guter Griff" : isFailure ? "Fehlgriff" : "Gemischtes Ergebnis"}
                    </span>
                </motion.div>
                <h2 className="text-5xl font-serif font-bold">
                    Sie haben {chosenCandidate.name} eingestellt
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Your Result */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-ink"
                >
                    <h3 className="text-xl font-bold font-serif mb-6 flex items-center gap-2">
                        <div className="w-8 h-8 bg-ink text-white rounded-full flex items-center justify-center text-sm">Sie</div>
                        Das Ergebnis
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-lg mb-2">{chosenCandidate.outcome.title}</h4>
                            <p className="text-ink/80 leading-relaxed font-serif text-lg">
                                "{chosenCandidate.outcome.description}"
                            </p>
                        </div>

                        <div className="bg-stone-50 p-4 rounded border border-stone-100">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">6 Monate Später</h5>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Team Moral</span>
                                    <Rating value={isSuccess ? 8 : isFailure ? 2 : 5} />
                                </div>
                                <div className="flex justify-between">
                                    <span>Umsatz Impact</span>
                                    <Rating value={isSuccess ? 9 : isFailure ? 3 : 6} />
                                </div>
                                <div className="flex justify-between">
                                    <span>Retention</span>
                                    <Rating value={isSuccess ? 7 : isFailure ? 1 : 4} />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Real Manager Result */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-paper p-8 rounded-lg border border-stone-200 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <CheckCircle className="w-32 h-32" />
                    </div>

                    <h3 className="text-xl font-bold font-serif mb-6 flex items-center gap-2">
                        <div className="w-8 h-8 border border-ink text-ink rounded-full flex items-center justify-center text-sm">HM</div>
                        Der Echte Hiring Manager
                    </h3>

                    <div className="space-y-6 relative z-10">
                        <div>
                            <p className="text-sm text-muted mb-1">Wahl:</p>
                            <h4 className="font-bold text-lg mb-2">{realManagerChoice?.name}</h4>
                            <p className="text-ink/80 leading-relaxed font-serif italic text-lg">
                                "Dieser Kandidat hatte das beste Potenzial. Auch wenn der Lebenslauf nicht perfekt war, hat die Einstellung überzeugt."
                            </p>
                        </div>

                        <div className="pt-6 border-t border-stone-200">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Community Statistik</h5>
                            <div className="space-y-3">
                                <StatBar label={chosenCandidate.name} percentage={Math.floor(Math.random() * 30) + 10} isYou />
                                <StatBar label={realManagerChoice?.name || ''} percentage={45} isWinner />
                                <StatBar label="Andere" percentage={25} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="flex justify-center pt-12">
                <button
                    onClick={resetGame}
                    className="flex items-center gap-2 px-8 py-3 bg-ink text-paper rounded-full font-bold hover:bg-black transition-all hover:scale-105"
                >
                    <RefreshCw className="w-4 h-4" />
                    Nochmal spielen
                </button>
            </div>
        </div>
    );
}

function Rating({ value }: { value: number }) {
    return (
        <div className="flex gap-0.5">
            {[...Array(10)].map((_, i) => (
                <div key={i} className={cn("w-2 h-2 rounded-full", i < value ? "bg-highlight" : "bg-stone-200")} />
            ))}
        </div>
    );
}

function StatBar({ label, percentage, isYou, isWinner }: { label: string, percentage: number, isYou?: boolean, isWinner?: boolean }) {
    return (
        <div>
            <div className="flex justify-between text-xs mb-1">
                <span className="font-medium flex gap-2">
                    {label}
                    {isYou && <span className="text-highlight font-bold">(Sie)</span>}
                    {isWinner && <span className="text-emerald-600 font-bold">(Echte Wahl)</span>}
                </span>
                <span>{percentage}%</span>
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={cn("h-full", isYou ? "bg-highlight" : isWinner ? "bg-emerald-500" : "bg-stone-300")}
                />
            </div>
        </div>
    );
}
