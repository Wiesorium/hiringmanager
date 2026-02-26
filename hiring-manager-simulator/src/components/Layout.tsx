import React from 'react';
import { useGame } from '../context/GameContext';
import { MessageCenter } from './MessageCenter';
import { Clock } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
    const { phase, budget, urgency } = useGame();

    const phaseMap = {
        screening: "Phase 1: Sichtung",
        interviews: "Phase 2: Interviews",
        decision: "Phase 3: Entscheidung",
        reveal: "Phase 4: Ergebnisse"
    };

    return (
        <div className="min-h-screen bg-paper text-ink font-sans selection:bg-highlight selection:text-white">
            {/* Header */}
            <header className="border-b border-ink/10 bg-white/50 backdrop-blur sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                        <div className="h-8 w-8 bg-highlight text-white flex items-center justify-center font-serif font-bold rounded-sm flex-shrink-0">
                            J
                        </div>
                        <h1 className="font-serif font-bold text-base sm:text-xl tracking-tight hidden sm:block">ein Service von Jobaktuell</h1>
                        <h1 className="font-serif font-bold text-base tracking-tight sm:hidden">Jobaktuell</h1>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-6 text-sm font-medium flex-wrap">
                        <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-ink/5 rounded-full">
                            <span className="font-serif">€</span>
                            <span className={budget < 10000 ? "text-red-600 font-bold" : ""}>
                                {budget.toLocaleString()}
                            </span>
                            <span className="text-muted text-xs hidden sm:inline">Budget</span>
                        </div>

                        <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-ink/5 rounded-full">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                            <span>{urgency}%</span>
                            <span className="text-muted text-xs hidden sm:inline">Dringlichkeit</span>
                        </div>

                        <div className="pl-2 sm:pl-6 border-l border-ink/10 text-muted font-serif italic text-xs sm:text-base">
                            {phaseMap[phase]}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                {children}
            </main>

            <MessageCenter />
        </div>
    );
}
