import { useGame } from '../context/GameContext';
import { jobs } from '../data/jobs';
import { motion } from 'framer-motion';

export function ApplicantLandingPage() {
    const { selectJob } = useGame();

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl w-full"
            >
                <div className="text-center mb-12">
                    <span className="inline-block px-3 py-1 bg-teal-900 text-teal-300 rounded-full text-sm font-medium mb-4">
                        Einladung von TechCorp GmbH
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Entdecke die <span className="text-teal-400">andere Seite</span> des Tisches
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Wir fanden dein Profil spannend, auch wenn es diesmal nicht geklappt hat.
                        Als Dankeschön laden wir dich ein, selbst in die Rolle des Hiring Managers zu schlüpfen.
                        Verstehe unsere Entscheidungen und lerne für die Zukunft.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {jobs.map((job) => (
                        <motion.button
                            key={job.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => selectJob(job.id)}
                            className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-teal-400 text-left transition-all group"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-white group-hover:text-teal-300">
                                    {job.title}
                                </h3>
                                <span className="text-sm text-gray-500 bg-gray-900 px-2 py-1 rounded">
                                    {job.salaryRange}
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                {job.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {job.requirements.slice(0, 3).map((req, i) => (
                                    <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                        {req}
                                    </span>
                                ))}
                            </div>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
