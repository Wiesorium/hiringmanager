import { MailOpen, ArrowRight } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { jobs } from '../data/jobs';

export function ApplicantLandingPage() {
    const { selectJob } = useGame();

    return (
        <div className="min-h-screen bg-paper flex items-center justify-center p-6 text-ink font-sans">
            <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl overflow-hidden border border-stone-100">
                <div className="bg-ink p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-highlight opacity-10 rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-highlight opacity-10 rounded-full blur-3xl transform -translate-x-10 -translate-y-10"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 ring-1 ring-white/20">
                            <MailOpen className="w-8 h-8 text-highlight" />
                        </div>
                        <h2 className="text-highlight font-bold uppercase tracking-wider text-sm mb-2">Einladung von TechCorp GmbH</h2>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                            Entdecke die andere Seite des Tisches
                        </h1>
                        <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
                            Wir fanden dein Profil spannend, auch wenn es diesmal nicht geklappt hat.
                            Als Dankeschön laden wir dich ein, selbst in die Rolle des Hiring Managers zu schlüpfen.
                            Verstehe unsere Entscheidungen und lerne für die Zukunft.
                        </p>
                    </div>
                </div>

                <div className="p-10">
                    <div className="mb-8 text-center">
                        <h3 className="text-xl font-bold font-serif mb-2">Wähle deine Simulation</h3>
                        <div className="h-1 w-12 bg-highlight mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {jobs.map((job) => (
                            <button
                                key={job.id}
                                onClick={() => selectJob(job.id)}
                                className="text-left p-6 rounded-xl border-2 border-stone-100 hover:border-highlight hover:bg-highlight/5 transition-all group relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <h3 className="font-bold text-lg group-hover:text-highlight transition-colors mb-1">{job.title}</h3>
                                    <p className="text-sm text-muted font-medium mb-3">{job.salaryRange}</p>
                                    <div className="flex items-center text-xs text-muted group-hover:text-ink transition-colors">
                                        Simulation starten <ArrowRight className="w-3 h-3 ml-1" />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 pt-6 border-t border-stone-100 text-center text-xs text-muted">
                        Ein Service von <strong className="text-ink">Jobaktuell</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}
