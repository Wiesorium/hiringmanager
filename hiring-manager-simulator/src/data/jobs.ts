import type { Job } from '../types';

export const jobs: Job[] = [
    {
        id: 'office_assistant',
        title: 'Büroassistenz',
        description: 'Unterstützung des Teams bei administrativen und organisatorischen Aufgaben.',
        salaryRange: '€30.000 - €40.000',
        requirements: ['Organisationstalent', 'MS Office Kenntnisse', 'Kommunikationsstärke'],
        budget: 45000,
        hiringManagerNote: 'Das Büro ist derzeit stark unterbesetzt – wir brauchen jemanden, der sofort selbstständig arbeiten kann. Bitte achte besonders auf Kandidaten mit echter Organistionserfahrung, nicht nur auf dem Papier.'
    },
    {
        id: 'warehouse_worker',
        title: 'Lagerist',
        description: 'Verantwortlich für den Wareneingang, Lagerhaltung und Versandvorbereitung.',
        salaryRange: '€28.000 - €35.000',
        requirements: ['Staplerschein', 'Körperliche Belastbarkeit', 'Zuverlässigkeit'],
        budget: 38000,
        hiringManagerNote: 'Wir hatten in letzter Zeit Probleme mit Fehlzeiten. Zuverlässigkeit und Pünktlichkeit sind für mich das wichtigste Kriterium – der Staplerschein lässt sich nachmachen, Charakter nicht.'
    },
    {
        id: 'craftsman',
        title: 'Handwerker',
        description: 'Durchführung von handwerklichen Tätigkeiten, Reparaturen und Instandhaltung.',
        salaryRange: '€35.000 - €45.000',
        requirements: ['Abgeschlossene Ausbildung', 'Handwerkliches Geschick', 'Führerschein Klasse B'],
        budget: 50000,
        hiringManagerNote: 'Der Führerschein ist nicht verhandelbar – wir haben Einsätze bei verschiedenen Standorten. Wichtig ist mir außerdem, dass die Person eigenverantwortlich arbeiten kann, ohne ständige Rückfragen.'
    },
    {
        id: 'technician',
        title: 'Techniker',
        description: 'Wartung und Reparatur von Maschinenparks bei Industriekunden.',
        salaryRange: '€45.000 - €55.000',
        requirements: ['Technische Ausbildung', 'Führerschein B', 'Reisebereitschaft'],
        budget: 60000,
        hiringManagerNote: 'Ca. 40% Reisetätigkeit, manchmal kurzfristig. Kandidaten, die das Budget sprengen, scheiden sofort aus – wir haben mit der Geschäftsführung ein festes Limit vereinbart. Lieber jemanden mit weniger Erfahrung, der ins Team passt.'
    },
    {
        id: 'marketing_assistant',
        title: 'Marketing Assistenz',
        description: 'Unterstützung bei Kampagnen, Social Media Management und Eventorganisation für eine lokale Agentur.',
        salaryRange: '€32.000 - €38.000',
        requirements: ['Kreativität', 'Social Media Skills', 'Gute Textierung'],
        budget: 42000,
        hiringManagerNote: 'Wir sind ein junges Team mit flachen Hierarchien. Neben dem fachlichen Können ist mir Eigeninitiative sehr wichtig – jemanden, der Ideen mitbringt und nicht nur wartet, bis man ihm sagt was zu tun ist.'
    },
    {
        id: 'educator',
        title: 'Kursleiter / Erwachsenenbildner',
        description: 'Leitung von EDV- und Soft-Skill-Kursen für ein lokales Bildungsinstitut.',
        salaryRange: '€35.000 - €42.000',
        requirements: ['Pädagogische Erfahrung', 'Geduld', 'EDV-Kenntnisse'],
        budget: 45000,
        hiringManagerNote: 'Unsere Teilnehmer sind oft Erwachsene in Umschulungen – viel Geduld und Empathie sind Pflicht. Formal tolle Lebensläufe mit wenig Menschenerfahrung helfen uns hier wenig.'
    }
];
