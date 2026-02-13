import type { Message } from '../types';

export const messages: Message[] = [
    // Screening Phase
    {
        id: 'm1',
        sender: 'Geschäftsführer',
        role: 'CEO',
        content: "Team, wir müssen diese Stelle effizient besetzen. Der Vorstand schaut genau auf unser Verhältnis von Kopfzahl zu Output. Stellt nicht einfach den Teuersten ein.",
        triggerPhase: 'screening',
        isRead: false
    },
    {
        id: 'm2',
        sender: 'Sarah (HR)',
        role: 'HR Direktor',
        content: "Zur Info: Das genehmigte Budget ist fix. Wir können für ein Einhorn vielleicht etwas drauflegen, aber versucht darunter zu bleiben.",
        triggerPhase: 'screening',
        isRead: false
    },

    // Interview Phase
    {
        id: 'm3',
        sender: 'Geschäftsführer',
        role: 'CEO',
        content: "Hey, mein Neffe hat sich beworben. Ich sage nicht, ihr MÜSST ihn einstellen, aber gebt ihm zumindest eine faire Chance. Er ist ein guter Junge.",
        triggerPhase: 'interviews',
        effect: {
            type: 'force_interview',
            value: 'nephew_id_placeholder' // Logic needs to find dynamic nephew if we implement one for each role, or make generic
        },
        isRead: false
    },
    {
        id: 'm4',
        sender: 'Markus (CFO)',
        role: 'CFO',
        content: "Schlechte Nachrichten. Die Q3-Prognosen sind runter. Wir müssen das Einstellungsbudget für diese Rolle um 10% kürzen.",
        triggerPhase: 'interviews',
        effect: {
            type: 'budget_cut',
            value: 5000 // Simplified flat amount or percentage logic handled in context
        },
        isRead: false
    },

    // Decision Phase
    {
        id: 'm6',
        sender: 'Geschäftsführer',
        role: 'CEO',
        content: "Ich brauche eine Entscheidung bis heute Abend. Wählt einfach den/die Beste(n) und weiter geht's.",
        triggerPhase: 'decision',
        effect: {
            type: 'urgency_increase',
            value: 80
        },
        isRead: false
    },
    {
        id: 'm7',
        sender: 'Recruiter',
        role: 'Recruiting',
        content: "Habe gerade gehört, dass einer der Top-Kandidaten ein anderes Angebot hat. Wir müssen uns JETZT entscheiden.",
        triggerPhase: 'decision',
        isRead: false
    }
];
