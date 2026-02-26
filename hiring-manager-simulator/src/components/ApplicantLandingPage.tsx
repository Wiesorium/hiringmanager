import { useState, useEffect, useRef } from 'react';
import { MailOpen, ArrowRight, Loader2, Sparkles, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { useGame } from '../context/GameContext';

// ─── Animated progress bar for the ~10-30s GPT wait ─────────────────────────
function GenerationProgressBar({ active }: { active: boolean }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!active) { setProgress(0); return; }

        setProgress(0);
        const start = Date.now();
        const TARGET_MS = 25000; // assume ~25s to reach 87%

        const tick = setInterval(() => {
            const elapsed = Date.now() - start;
            // Ease out: fast at first, slows near 87%
            const pct = Math.min(87, (elapsed / TARGET_MS) * 100 * (1 - elapsed / (TARGET_MS * 3)));
            setProgress(prev => Math.max(prev, Math.round(pct)));
        }, 200);

        return () => clearInterval(tick);
    }, [active]);

    // Jump to 100 externally by stopping `active` and the parent calling setDone
    return (
        <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
            <div
                className="h-full bg-highlight rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

// ─── "Generate new simulation" card ─────────────────────────────────────────
function GenerateSimCard() {
    const { generateAndAddSimulation, selectJob } = useGame();

    const [open, setOpen] = useState(false);
    const [jobDesc, setJobDesc] = useState('');
    const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
    const [finalProgress, setFinalProgress] = useState(false); // jump bar to 100
    const [newJobId, setNewJobId] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const canSubmit = jobDesc.trim().length >= 20 && state === 'idle';

    const handleGenerate = async () => {
        if (!canSubmit) return;
        setState('loading');

        const jobId = await generateAndAddSimulation(jobDesc.trim());

        setFinalProgress(true);
        await new Promise(r => setTimeout(r, 600)); // let bar reach 100 visually

        if (jobId) {
            setNewJobId(jobId);
            setState('done');
        } else {
            setState('error');
        }
    };

    const handlePlay = () => {
        if (newJobId) selectJob(newJobId);
    };

    return (
        <div className={`rounded-xl border-2 transition-all duration-300 overflow-hidden
            ${open ? 'border-highlight bg-highlight/5' : 'border-dashed border-stone-300 hover:border-highlight hover:bg-highlight/5'}`}>

            {/* Header / toggle */}
            <button
                className="w-full text-left p-6 flex items-center gap-4"
                onClick={() => { setOpen(o => !o); setState('idle'); setJobDesc(''); setNewJobId(null); setFinalProgress(false); }}
            >
                <div className="w-10 h-10 rounded-full bg-highlight/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-highlight" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-highlight">Eigene Stelle generieren</h3>
                    <p className="text-xs text-muted mt-0.5">KI erstellt eine individuelle Simulation für deine Stelle</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Expandable body */}
            {open && (
                <div className="px-6 pb-6 space-y-4">
                    {state === 'idle' && (
                        <>
                            <textarea
                                ref={textareaRef}
                                value={jobDesc}
                                onChange={e => setJobDesc(e.target.value)}
                                placeholder="Stellenbeschreibung hier einfügen…&#10;&#10;z. B.: Wir suchen einen Vertriebsmitarbeiter im Außendienst mit Erfahrung in der IT-Branche."
                                rows={5}
                                className="w-full rounded-lg border border-stone-200 bg-white p-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-highlight/40 resize-none"
                            />
                            <button
                                onClick={handleGenerate}
                                disabled={!canSubmit}
                                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all
                                    ${canSubmit ? 'bg-highlight text-white hover:bg-highlight/90' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}
                            >
                                Simulation generieren <ArrowRight className="w-4 h-4" />
                            </button>
                            <p className="text-center text-xs text-muted">Dauert ca. 15-30 Sekunden ☕</p>
                        </>
                    )}

                    {state === 'loading' && (
                        <div className="space-y-4 py-2">
                            <div className="flex items-center gap-3 text-sm text-muted">
                                <Loader2 className="w-4 h-4 animate-spin text-highlight flex-shrink-0" />
                                <span>KI erstellt Kandidaten, Nachrichten und Szenario…</span>
                            </div>
                            <GenerationProgressBar active={!finalProgress} />
                            {finalProgress && (
                                <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                                    <div className="h-full bg-highlight rounded-full w-full transition-all duration-500" />
                                </div>
                            )}
                            <div className="grid grid-cols-3 gap-2 pt-1">
                                {['Kandidaten', 'Szenario', 'Nachrichten'].map((label, i) => (
                                    <div key={label} className="text-center">
                                        <div className="h-1 bg-stone-100 rounded-full overflow-hidden mb-1">
                                            <div
                                                className="h-full bg-highlight/40 rounded-full animate-pulse"
                                                style={{ animationDelay: `${i * 0.3}s` }}
                                            />
                                        </div>
                                        <span className="text-xs text-muted">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {state === 'done' && (
                        <div className="space-y-4 py-2">
                            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                                <CheckCircle className="w-4 h-4" />
                                Simulation erfolgreich erstellt!
                            </div>
                            <button
                                onClick={handlePlay}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm bg-highlight text-white hover:bg-highlight/90 transition-all"
                            >
                                Simulation starten <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {state === 'error' && (
                        <div className="space-y-4 py-2">
                            <div className="flex items-center gap-2 text-red-500 text-sm font-medium">
                                <AlertCircle className="w-4 h-4" />
                                Generierung fehlgeschlagen – bitte erneut versuchen.
                            </div>
                            <button
                                onClick={() => setState('idle')}
                                className="w-full py-2 rounded-lg border border-stone-200 text-sm text-ink hover:bg-stone-50 transition-all"
                            >
                                Zurück
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export function ApplicantLandingPage() {
    const { selectJob, availableJobs, simulationsLoading } = useGame();

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

                    {/* Job grid — skeletons while loading */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {simulationsLoading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="p-6 rounded-xl border-2 border-stone-100 animate-pulse">
                                    <div className="h-5 bg-stone-200 rounded w-3/4 mb-3"></div>
                                    <div className="h-3 bg-stone-100 rounded w-1/2 mb-4"></div>
                                    <div className="h-3 bg-stone-100 rounded w-1/3"></div>
                                </div>
                            ))
                        ) : (
                            availableJobs.map((job) => (
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
                            ))
                        )}
                    </div>

                    {/* Status indicator */}
                    {!simulationsLoading && (
                        <p className="text-center text-xs text-muted mt-4 flex items-center justify-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400"></span>
                            {availableJobs.length} Simulationen verfügbar
                        </p>
                    )}
                    {simulationsLoading && (
                        <p className="text-center text-xs text-muted mt-4 flex items-center justify-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Simulationen werden geladen…
                        </p>
                    )}

                    {/* Generate new simulation card — always shown below the job grid */}
                    {!simulationsLoading && (
                        <div className="mt-4 col-span-full">
                            <GenerateSimCard />
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-stone-100 text-center text-xs text-muted">
                        Ein Service von <strong className="text-ink">Jobaktuell</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}
