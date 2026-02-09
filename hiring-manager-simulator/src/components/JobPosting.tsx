import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { ArrowRight, CheckCircle, MapPin, DollarSign, Briefcase } from 'lucide-react';

export function JobPosting() {
    const { startGame } = useGame();

    return (
        <div className="min-h-screen bg-paper flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl w-full bg-white rounded-lg shadow-xl border border-stone-200 overflow-hidden relative"
            >
                <div className="bg-ink text-paper p-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        <Briefcase className="w-3 h-3" /> External Posting
                    </div>
                    <h1 className="text-4xl font-serif font-bold mb-2">Marketing Manager</h1>
                    <div className="flex gap-6 text-sm opacity-80">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> San Francisco (Hybrid)</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> $120k - $140k / year</span>
                    </div>
                </div>

                <div className="p-8 space-y-8 text-ink">
                    <section>
                        <h3 className="font-bold font-serif text-xl mb-3">About The Role</h3>
                        <p className="leading-relaxed text-muted">
                            We are looking for a data-driven Marketing Manager to lead our growth initiatives.
                            You will be responsible for scaling our user acquisition, managing a small team, and keeping our CAC low.
                            This is a high-visibility role reporting directly to the CEO.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section>
                            <h3 className="font-bold font-serif text-xl mb-3">Responsibilities</h3>
                            <ul className="space-y-2">
                                {['Manage $50k monthly ad budget', 'Lead a team of 2 specialists', 'Launch 3 major campaigns/quarter', 'Report weekly metrics to Execs'].map(item => (
                                    <li key={item} className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="w-4 h-4 text-highlight mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold font-serif text-xl mb-3">Requirements</h3>
                            <ul className="space-y-2">
                                {['5+ years in B2B SaaS Marketing', 'Experience with SQL & Analytics', 'Proven track record of growth', 'Strong leadership skills'].map(item => (
                                    <li key={item} className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <section className="bg-stone-50 p-6 rounded-lg border border-stone-200">
                        <h3 className="font-bold font-serif text-lg mb-2 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-highlight" /> Hiring Manager Note
                        </h3>
                        <p className="text-sm italic text-ink/80">
                            "Strict budget cap is $140k, but Finance really wants us closer to $120k.
                            We need someone who can hit the ground running—no time for training wheels.
                            Warning: The CEO is very involved in this hire."
                        </p>
                    </section>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={startGame}
                            className="flex items-center gap-2 px-8 py-4 bg-highlight text-white rounded-full font-bold shadow-lg hover:bg-highlight/90 hover:scale-105 transition-all"
                        >
                            Start Screening Candidates <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
