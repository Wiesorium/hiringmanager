import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

const CONSENT_KEY = 'hms_cookie_consent';

export function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem(CONSENT_KEY);
        if (!consent) {
            setVisible(true);
        }
        // If user previously accepted, Meta Pixel is already loaded via index.html
    }, []);

    const handleAccept = () => {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        setVisible(false);
        // Meta Pixel is already in index.html and running — nothing extra to do.
        // If we wanted to defer loading, we'd dynamically inject the script here instead.
    };

    const handleDecline = () => {
        localStorage.setItem(CONSENT_KEY, 'declined');
        setVisible(false);
        // Disable Meta Pixel tracking
        if (window.fbq) {
            window.fbq('consent', 'revoke');
        }
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom">
            <div className="max-w-xl mx-auto bg-white border border-stone-200 rounded-xl shadow-2xl p-5">
                <div className="flex items-start gap-3">
                    <Cookie className="w-5 h-5 text-highlight flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-ink font-medium mb-1">Diese Website verwendet Cookies</p>
                        <p className="text-xs text-muted leading-relaxed">
                            Wir nutzen Cookies und den Meta Pixel zur Analyse und Verbesserung unserer Werbung.
                            Mit „Akzeptieren" stimmen Sie der Nutzung zu.
                            Mehr in unserer <button
                                onClick={() => {
                                    localStorage.setItem(CONSENT_KEY, 'declined');
                                    setVisible(false);
                                    window.location.hash = '';
                                    // Navigate to datenschutz - dispatch a custom event
                                    window.dispatchEvent(new CustomEvent('navigate', { detail: 'datenschutz' }));
                                }}
                                className="text-highlight underline"
                            >Datenschutzerklärung</button>.
                        </p>
                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={handleAccept}
                                className="px-4 py-2 rounded-lg text-xs font-bold bg-highlight text-white hover:bg-highlight/90 transition-colors"
                            >
                                Akzeptieren
                            </button>
                            <button
                                onClick={handleDecline}
                                className="px-4 py-2 rounded-lg text-xs font-bold border border-stone-200 text-muted hover:bg-stone-50 transition-colors"
                            >
                                Nur notwendige
                            </button>
                        </div>
                    </div>
                    <button onClick={handleDecline} className="text-muted hover:text-ink transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
