import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { ArrowRight, CheckCircle, MapPin, DollarSign, Briefcase } from 'lucide-react';

export function JobPosting() {
    const { startGame, selectedJobId, availableJobs } = useGame();
    // Look up the job in the merged list (static + API) — no || jobs[0] fallback
    const job = availableJobs.find(j => j.id === selectedJobId);

    // Still loading or no match yet — shouldn't happen in normal flow
    if (!job) {
        return (
            <div className="min-h-screen bg-paper flex items-center justify-center">
                <p className="text-muted animate-pulse">Simulation wird geladen…</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-paper flex items-center justify-center p-6 font-sans text-ink">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl w-full bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden relative"
            >
                <div className="bg-ink text-white p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-highlight opacity-10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-highlight/20 text-highlight rounded-full text-xs font-bold uppercase tracking-wider mb-6 ring-1 ring-highlight/40">
                            <Briefcase className="w-3 h-3" /> Interne Ausschreibung
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{job.title}</h1>
                        <div className="flex flex-wrap gap-6 text-sm text-white/80 font-medium">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-highlight" /> Wien (Vor Ort)</span>
                            <span className="flex items-center gap-1"><DollarSign className="w-4 h-4 text-highlight" /> {job.salaryRange}</span>
                        </div>
                    </div>
                </div>

                <div className="p-10 space-y-10">
                    <section>
                        <h3 className="font-bold font-serif text-2xl mb-4 text-ink">Über die Rolle</h3>
                        <p className="leading-relaxed text-muted text-lg">
                            {job.description}
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold font-serif text-2xl mb-4 text-ink">Anforderungen</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {job.requirements.map(item => (
                                <li key={item} className="flex items-start gap-3 text-ink/80">
                                    <CheckCircle className="w-5 h-5 text-highlight mt-0.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-paper p-6 rounded-xl border-l-4 border-highlight">
                        <h3 className="font-bold font-serif text-lg mb-2 flex items-center gap-2 text-ink">
                            Notiz vom Hiring Manager
                        </h3>
                        <p className="italic text-muted">
                            "{job.hiringManagerNote ?? 'Bitte achte auf die Gehaltsvorstellungen, die Team-Passung und darauf, dass die Person rasch selbstständig arbeiten kann.'}"
                        </p>
                    </section>

                    <div className="flex justify-end pt-6 border-t border-stone-100">
                        <button
                            onClick={startGame}
                            className="flex items-center gap-2 px-8 py-4 bg-highlight text-white rounded-lg font-bold shadow-lg hover:bg-highlight/90 hover:scale-105 transition-all text-lg"
                        >
                            Kandidaten sichten <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
