import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { ArrowRight, Lock, Briefcase, Users, DollarSign } from 'lucide-react';

export function LandingPage() {
    const { showJobPosting } = useGame();

    return (
        <div className="min-h-screen bg-paper text-ink font-sans selection:bg-highlight selection:text-white flex flex-col">
            {/* Hero Section */}
            <header className="border-b border-ink/10 bg-white/50 backdrop-blur sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 bg-ink text-paper flex items-center justify-center font-serif font-bold rounded-sm">
                            A
                        </div>
                        <h1 className="font-serif font-bold text-xl tracking-tight">Apex Corp Hiring Portal</h1>
                    </div>
                    <div>
                        <button
                            onClick={showJobPosting}
                            className="font-bold text-sm bg-ink text-paper px-4 py-2 rounded-full hover:bg-black transition-colors"
                        >
                            Start Hiring
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center px-6 py-20 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-highlight/10 text-highlight rounded-full text-sm font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 bg-highlight rounded-full animate-pulse"></span>
                        New Role Available
                    </div>

                    <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight">
                        You are the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink to-stone-600">Hiring Manager.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto font-serif leading-relaxed">
                        A realistic hiring manager simulation designed to help you understand the complexity of hiring decisions.
                        Experience the pressure, the politics, and the impossible choices.
                    </p>

                    <div className="flex flex-col items-center gap-4 pt-8">
                        <div className="bg-white p-8 rounded-xl shadow-xl border-2 border-highlight relative overflow-hidden group max-w-md w-full text-left transition-transform hover:-translate-y-1">
                            <div className="absolute top-0 right-0 bg-highlight text-white text-xs font-bold px-3 py-1 rounded-bl">LIMITED TIME $5</div>
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-highlight/10 rounded-lg text-highlight">
                                    <Briefcase className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold font-serif">Marketing Manager</h3>
                                    <p className="text-muted">Tech Startup • Full Time</p>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8 text-sm text-ink/80">
                                <li className="flex gap-2 items-center"><Users className="w-4 h-4 text-muted" /> Review 20 Candidates</li>
                                <li className="flex gap-2 items-center"><DollarSign className="w-4 h-4 text-muted" /> Manage $120k Budget</li>
                                <li className="flex gap-2 items-center"><ArrowRight className="w-4 h-4 text-muted" /> Deal with CEO & Board Pressure</li>
                            </ul>

                            <button
                                onClick={showJobPosting}
                                className="w-full py-4 bg-highlight text-white font-bold text-lg rounded-lg shadow-lg hover:bg-highlight/90 transition-all flex items-center justify-center gap-2 group-hover:shadow-highlight/25"
                            >
                                Start Simulation - $5
                            </button>
                            <p className="text-center text-xs text-muted mt-3">One-time purchase. Lifetime access.</p>
                        </div>
                    </div>

                    {/* Upcoming Roles */}
                    <div className="pt-16 w-full">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-8">Coming Soon</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div className="p-6 border border-stone-200 rounded-lg bg-stone-50 opacity-60 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-stone-200 rounded text-stone-500"><Lock className="w-5 h-5" /></div>
                                    <div>
                                        <div className="font-bold font-serif">Engineering Lead</div>
                                        <div className="text-xs text-muted">Enterprise • High Stakes</div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border border-stone-200 rounded-lg bg-stone-50 opacity-60 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-stone-200 rounded text-stone-500"><Lock className="w-5 h-5" /></div>
                                    <div>
                                        <div className="font-bold font-serif">VP of Sales</div>
                                        <div className="text-xs text-muted">SaaS • Aggressive Goals</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
