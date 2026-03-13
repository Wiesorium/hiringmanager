import { useState, useEffect, useRef } from 'react';
import { MailOpen, ArrowRight, Loader2, Sparkles, CheckCircle, AlertCircle, ChevronDown, FileText, Lock, Key, ExternalLink } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { validateAccessCode } from '../services/api';

// ─── Animated progress bar for the ~1-2min GPT wait ─────────────────────────
function GenerationProgressBar({ active }: { active: boolean }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!active) { setProgress(0); return; }

        setProgress(0);
        const start = Date.now();
        const TARGET_MS = 90000; // assume ~90s to reach 87%

        const tick = setInterval(() => {
            const elapsed = Date.now() - start;
            const pct = Math.min(87, (elapsed / TARGET_MS) * 100 * (1 - elapsed / (TARGET_MS * 3)));
            setProgress(prev => Math.max(prev, Math.round(pct)));
        }, 200);

        return () => clearInterval(tick);
    }, [active]);

    return (
        <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
            <div
                className="h-full bg-highlight rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

// ─── Access code localStorage helpers ────────────────────────────────────────
const CODE_STORAGE_KEY = 'hms_access_code';
function getSavedCode(): string { return localStorage.getItem(CODE_STORAGE_KEY) ?? ''; }
function saveCode(code: string) { localStorage.setItem(CODE_STORAGE_KEY, code); }

// ─── "Generate new simulation" card (with Stripe access code gate) ───────────
function GenerateSimCard() {
    const { generateAndAddSimulation, selectJob } = useGame();

    const [open, setOpen] = useState(false);
    const [jobDesc, setJobDesc] = useState('');
    const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
    const [finalProgress, setFinalProgress] = useState(false);
    const [newJobId, setNewJobId] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fbqFiredRef = useRef(false);

    // ── Access code state ─────────────────────────────────────────────────
    const [accessCode, setAccessCode] = useState(getSavedCode);
    const [codeInput, setCodeInput] = useState('');
    const [codeState, setCodeState] = useState<'idle' | 'checking' | 'valid' | 'invalid'>(() =>
        getSavedCode() ? 'valid' : 'idle'
    );
    const [remaining, setRemaining] = useState<number | null>(null);

    // Validate saved code on mount
    useEffect(() => {
        const saved = getSavedCode();
        if (!saved) return;
        validateAccessCode(saved).then(res => {
            if (res?.valid) {
                setCodeState('valid');
                setRemaining(res.remaining);
            } else {
                setCodeState('idle');
                setAccessCode('');
                localStorage.removeItem(CODE_STORAGE_KEY);
            }
        });
    }, []);

    // Fire Meta Pixel InitiateCheckout when paywall is visible
    useEffect(() => {
        if (open && codeState !== 'valid' && state === 'idle' && !fbqFiredRef.current) {
            if (window.fbq) {
                window.fbq('track', 'InitiateCheckout', { value: 5.00, currency: 'EUR', content_name: 'Hiring Simulator Access Code' });
                fbqFiredRef.current = true;
            }
        }
        if (!open) {
            fbqFiredRef.current = false;
        }
    }, [open, codeState, state]);

    const handleValidateCode = async () => {
        const code = codeInput.trim().toUpperCase();
        if (!code) return;
        setCodeState('checking');
        const res = await validateAccessCode(code);
        if (res?.valid) {
            setAccessCode(code);
            saveCode(code);
            setCodeState('valid');
            setRemaining(res.remaining);
        } else {
            setCodeState('invalid');
        }
    };

    const canSubmit = jobDesc.trim().length >= 20 && state === 'idle' && codeState === 'valid' && (remaining === null || remaining > 0);

    const handleGenerate = async () => {
        if (!canSubmit) return;
        setState('loading');

        const result = await generateAndAddSimulation(jobDesc.trim(), accessCode);

        setFinalProgress(true);
        await new Promise(r => setTimeout(r, 600));

        if (result) {
            setNewJobId(result.jobId);
            if (result.remaining !== undefined) setRemaining(result.remaining);
            setState('done');
        } else {
            setState('error');
        }
    };

    const handlePlay = () => {
        if (newJobId) selectJob(newJobId);
    };

    const STRIPE_LINK = 'https://buy.stripe.com/8x228scb26eIcDa0j41ZS06';

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
                    <h3 className="font-bold text-lg text-highlight">Simuliere genau die Rolle, auf die du dich bewirbst</h3>
                    <p className="text-xs text-muted mt-0.5">Perfekte Vorbereitung: Die KI erstellt ein maßgeschneidertes Interview-Szenario für dich</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Expandable body */}
            {open && (
                <div className="px-6 pb-6 space-y-4">

                    {/* ── Step 1: Access Code Gate ──────────────────────────────── */}
                    {codeState !== 'valid' && state === 'idle' && (
                        <div className="space-y-4">
                            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-3">
                                <div className="flex items-start gap-3">
                                    <Lock className="w-5 h-5 text-highlight mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold text-ink">KI-Generierung benötigt einen Zugangscode</p>
                                        <p className="text-xs text-muted mt-1">
                                            Einmalig €5 für bis zu <strong>10 Simulationen</strong>. Das sind nur 50 Cent pro Simulation.
                                            Falls du vor Aufbrauch aller Tokens einen Job findest, kannst du den Code an Freunde weitergeben!
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href={STRIPE_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm bg-highlight text-white hover:bg-highlight/90 transition-all"
                                >
                                    Zugangscode kaufen – €5 <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-stone-200" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-highlight/5 px-3 text-xs text-muted">Code bereits vorhanden?</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className="flex-1 relative">
                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                                    <input
                                        type="text"
                                        value={codeInput}
                                        onChange={e => { setCodeInput(e.target.value.toUpperCase()); setCodeState('idle'); }}
                                        onKeyDown={e => e.key === 'Enter' && handleValidateCode()}
                                        placeholder="DEIN CODE"
                                        maxLength={12}
                                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-stone-200 bg-white text-sm font-mono tracking-wider uppercase text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-highlight/40"
                                    />
                                </div>
                                <button
                                    onClick={handleValidateCode}
                                    disabled={!codeInput.trim() || codeState === 'checking'}
                                    className="px-4 py-2.5 rounded-lg font-bold text-sm bg-ink text-white hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {codeState === 'checking' ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        'Einlösen'
                                    )}
                                </button>
                            </div>
                            {codeState === 'invalid' && (
                                <div className="flex items-center gap-2 text-red-500 text-xs font-medium">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    Ungültiger oder aufgebrauchter Code.
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Step 2: Code valid → show generation form ────────────── */}
                    {codeState === 'valid' && state === 'idle' && (
                        <>
                            <div className="flex items-center gap-2 text-green-600 text-xs font-medium bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>Code aktiv — {remaining !== null ? `${remaining} Generierung${remaining !== 1 ? 'en' : ''} übrig` : 'Bereit'}</span>
                            </div>
                            <textarea
                                ref={textareaRef}
                                value={jobDesc}
                                onChange={e => setJobDesc(e.target.value)}
                                placeholder={"Stellenbeschreibung hier einfügen…\n\nz. B.: Wir suchen einen Vertriebsmitarbeiter im Außendienst mit Erfahrung in der IT-Branche."}
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
                            <p className="text-center text-xs text-muted">Dauert ca. 1-2 Minuten ☕</p>
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

// ─── Job card (with optional prompt display for AI-generated sims) ────────────
function JobCard({ job, prompt, onSelect }: { job: { id: string; title: string; salaryRange: string }; prompt?: string; onSelect: () => void }) {
    const [promptOpen, setPromptOpen] = useState(false);
    return (
        <div className="rounded-xl border-2 border-stone-100 hover:border-highlight hover:bg-highlight/5 transition-all group relative overflow-hidden">
            <button
                onClick={onSelect}
                className="w-full text-left p-6"
            >
                <div className="relative z-10">
                    <h3 className="font-bold text-lg group-hover:text-highlight transition-colors mb-1">{job.title}</h3>
                    <p className="text-sm text-muted font-medium mb-3">{job.salaryRange}</p>
                    <div className="flex items-center text-xs text-muted group-hover:text-ink transition-colors">
                        Simulation starten <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                </div>
            </button>
            {prompt && (
                <div className="px-6 pb-4 border-t border-stone-100">
                    <button
                        onClick={() => setPromptOpen(o => !o)}
                        className="flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors mt-3"
                    >
                        <FileText className="w-3.5 h-3.5" />
                        Eingabe-Prompt
                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${promptOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {promptOpen && (
                        <p className="mt-2 text-xs text-stone-500 bg-stone-50 border border-stone-200 rounded p-3 leading-relaxed line-clamp-5">
                            {prompt}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export function ApplicantLandingPage() {
    const { selectJob, availableJobs, simulationsLoading } = useGame();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-paper flex items-center justify-center p-6 text-ink font-sans">
            <div className="max-w-3xl w-full mt-8 mb-8 bg-white rounded-xl shadow-xl overflow-hidden border border-stone-100">
                <div className="bg-white border-b border-stone-100 p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-highlight opacity-5 rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-highlight opacity-5 rounded-full blur-3xl transform -translate-x-10 -translate-y-10"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-highlight/10 rounded-full mb-6 ring-1 ring-highlight/20">
                            <MailOpen className="w-8 h-8 text-highlight" />
                        </div>
                        <h2 className="text-highlight font-bold uppercase tracking-wider text-sm mb-2">Interview-Vorbereitung mal anders</h2>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-6">
                            Entdecke die andere Seite des Tisches
                        </h1>
                        <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
                            Schlüpfe selbst in die Rolle des Hiring Managers und analysiere Bewerberprofile.
                            Indem du Recruiting-Entscheidungen triffst und typische Stolpersteine aus Arbeitgebersicht verstehst,
                            gehst du optimal vorbereitet in deinen eigenen nächsten Bewerbungsprozess.
                        </p>
                    </div>
                </div>

                <div className="p-10">
                    {/* Generate new simulation card — moved above the job grid */}
                    {!simulationsLoading && (
                        <div className="mb-10 col-span-full">
                            <GenerateSimCard />
                        </div>
                    )}

                    <div className="mb-8 text-center">
                        <h3 className="text-xl font-bold font-serif mb-2">Oder wähle ein kostenloses Szenario</h3>
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
                            availableJobs.map((job) => {
                                const prompt = (job as unknown as { sourcePrompt?: string }).sourcePrompt;
                                return (
                                    <JobCard key={job.id} job={job} prompt={prompt} onSelect={() => selectJob(job.id)} />
                                );
                            })
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

                    {/* Gentle upsell below the free scenarios */}
                    {!simulationsLoading && (
                        <div className="mt-8 text-center">
                            <p className="text-sm text-muted">
                                Bewirbst du dich auf eine spezifische Rolle? <br />
                                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-highlight font-bold hover:underline mt-1">
                                    Erstelle dein eigenes Szenario — €5
                                </button>
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
