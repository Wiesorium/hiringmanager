import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { ArrowRight, CheckCircle, MapPin, DollarSign, Briefcase } from 'lucide-react';
import { jobs } from '../data/jobs';

export function JobPosting() {
    const { startGame, selectedJobId } = useGame();
    const job = jobs.find(j => j.id === selectedJobId) || jobs[0];

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl w-full bg-white rounded-lg shadow-xl border border-stone-200 overflow-hidden relative"
            >
                <div className="bg-black text-white p-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        <Briefcase className="w-3 h-3" /> Interne Ausschreibung
                    </div>
                    <h1 className="text-4xl font-serif font-bold mb-2">{job.title}</h1>
                    <div className="flex gap-6 text-sm opacity-80">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Wien (Vor Ort)</span>
                        <span className="flex items-center gap-1">€ {job.salaryRange} / Jahr</span>
                    </div>
                </div>

                <div className="p-8 space-y-8 text-black">
                    <section>
                        <h3 className="font-bold font-serif text-xl mb-3">Über die Rolle</h3>
                        <p className="leading-relaxed text-gray-600">
                            {job.description}
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold font-serif text-xl mb-3">Anforderungen</h3>
                        <ul className="space-y-2">
                            {job.requirements.map(item => (
                                <li key={item} className="flex items-start gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-stone-50 p-6 rounded-lg border border-stone-200">
                        <h3 className="font-bold font-serif text-lg mb-2 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-green-600" /> Notiz vom Hiring Manager
                        </h3>
                        <p className="text-sm italic text-gray-600">
                            "Wir suchen jemanden, der sofort loslegen kann. Bitte achte auf die Gehaltsvorstellungen."
                        </p>
                    </section>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={startGame}
                            className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-500 hover:scale-105 transition-all"
                        >
                            Kandidaten sichten <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
