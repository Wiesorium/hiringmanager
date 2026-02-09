import React from 'react';
import { useGame } from '../context/GameContext';
import { MessageCenter } from './MessageCenter';
import { DollarSign, Clock } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
    const { phase, budget, urgency } = useGame();

    const phaseMap = {
        screening: "Phase 1: Screening",
        interviews: "Phase 2: Interviews",
        decision: "Phase 3: Final Decision",
        reveal: "Phase 4: Outcomes"
    };

    return (
        <div className="min-h-screen bg-paper text-ink font-sans selection:bg-highlight selection:text-white">
            {/* Header */}
            <header className="border-b border-ink/10 bg-white/50 backdrop-blur sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 bg-ink text-paper flex items-center justify-center font-serif font-bold rounded-sm">
                            A
                        </div>
                        <h1 className="font-serif font-bold text-xl tracking-tight">Apex Corp Hiring Portal</h1>
                    </div>

                    <div className="flex items-center gap-6 text-sm font-medium">
                        <div className="flex items-center gap-2 px-3 py-1 bg-ink/5 rounded-full">
                            <DollarSign className="w-4 h-4 text-emerald-600" />
                            <span className={budget < 110000 ? "text-red-600 font-bold" : ""}>
                                ${budget.toLocaleString()}
                            </span>
                            <span className="text-muted text-xs">Budget</span>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1 bg-ink/5 rounded-full">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <span>{urgency}%</span>
                            <span className="text-muted text-xs">Urgency</span>
                        </div>

                        <div className="pl-6 border-l border-ink/10 text-muted font-serif italic">
                            {phaseMap[phase]}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-8">
                {children}
            </main>

            <MessageCenter />
        </div>
    );
}
