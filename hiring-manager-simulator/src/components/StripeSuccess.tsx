import { useState, useEffect } from 'react';
import { CheckCircle, Copy, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { createAccessCode } from '../services/api';
import { useGame } from '../context/GameContext';

export function StripeSuccess() {
    const { setGameState } = useGame();
    const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');
    const [code, setCode] = useState('');
    const [remaining, setRemaining] = useState(10);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('session_id');

        if (!sessionId) {
            setState('error');
            return;
        }

        createAccessCode(sessionId).then(result => {
            if (result) {
                setCode(result.code);
                setRemaining(result.remaining);
                setState('success');

                // Save code to localStorage so user doesn't need to re-enter
                localStorage.setItem('hms_access_code', result.code);

                if (window.fbq) {
                    window.fbq('track', 'Purchase', { value: 19.00, currency: 'EUR', content_name: 'Hiring Simulator Access Code' });
                }
            } else {
                setState('error');
            }
        });
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-paper flex items-center justify-center p-6 text-ink font-sans">
            <div className="max-w-md w-full bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden">

                {state === 'loading' && (
                    <div className="p-12 text-center space-y-4">
                        <Loader2 className="w-8 h-8 animate-spin text-highlight mx-auto" />
                        <p className="text-muted">Dein Zugangscode wird erstellt…</p>
                    </div>
                )}

                {state === 'success' && (
                    <>
                        <div className="bg-green-50 p-8 text-center border-b border-green-100">
                            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <h1 className="text-2xl font-serif font-bold text-ink mb-2">Zahlung erfolgreich!</h1>
                            <p className="text-sm text-muted">Dein Zugangscode für KI-Simulationen ist bereit.</p>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="text-center">
                                <p className="text-xs text-muted uppercase tracking-wider mb-3">Dein Zugangscode</p>
                                <div className="bg-stone-50 border-2 border-stone-200 rounded-xl p-4 flex items-center justify-center gap-3">
                                    <span className="text-3xl font-mono font-bold tracking-[0.3em] text-ink">{code}</span>
                                    <button
                                        onClick={handleCopy}
                                        className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-muted hover:text-ink"
                                        title="Code kopieren"
                                    >
                                        {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>
                                <p className="text-xs text-muted mt-2">{remaining} Generierungen verfügbar</p>
                            </div>

                            <div className="bg-highlight/5 border border-highlight/20 rounded-lg p-4 text-xs text-muted space-y-1">
                                <p>💡 <strong className="text-ink">Tipp:</strong> Dein Code wurde automatisch gespeichert.</p>
                                <p>Du kannst ihn auch an Freunde weitergeben, wenn du ihn nicht mehr brauchst.</p>
                            </div>

                            <button
                                onClick={() => {
                                    // Clean up URL params and go to simulator
                                    window.history.replaceState({}, '', window.location.pathname);
                                    setGameState('applicant_intro');
                                }}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm bg-highlight text-white hover:bg-highlight/90 transition-all"
                            >
                                Zum Simulator <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                )}

                {state === 'error' && (
                    <div className="p-12 text-center space-y-4">
                        <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
                        <h2 className="text-xl font-serif font-bold">Etwas ist schiefgelaufen</h2>
                        <p className="text-sm text-muted">
                            Wir konnten keinen Zugangscode erstellen. Bitte kontaktiere uns mit deiner Zahlungsbestätigung.
                        </p>
                        <button
                            onClick={() => setGameState('applicant_intro')}
                            className="text-sm text-highlight hover:text-highlight/80 font-bold underline"
                        >
                            Zurück zum Simulator
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
