export interface Job {
    id: string;
    title: string;
    description: string;
    salaryRange: string;
    requirements: string[];
}

export const jobs: Job[] = [
    {
        id: 'office_assistant',
        title: 'Büroassistenz',
        description: 'Unterstützung des Teams bei administrativen und organisatorischen Aufgaben.',
        salaryRange: '€30.000 - €40.000',
        requirements: ['Organisationstalent', 'MS Office Kenntnisse', 'Kommunikationsstärke']
    },
    {
        id: 'warehouse_worker',
        title: 'Lagerist',
        description: 'Verantwortlich für den Wareneingang, Lagerhaltung und Versandvorbereitung.',
        salaryRange: '€28.000 - €35.000',
        requirements: ['Staplerschein', 'Körperliche Belastbarkeit', 'Zuverlässigkeit']
    },
    {
        id: 'craftsman',
        title: 'Handwerker',
        description: 'Durchführung von handwerklichen Tätigkeiten, Reparaturen und Instandhaltung.',
        salaryRange: '€35.000 - €45.000',
        requirements: ['Abgeschlossene Ausbildung', 'Handwerkliches Geschick', 'Führerschein Klasse B']
    },
    {
        id: 'technician',
        title: 'Techniker',
        description: 'Wartung und Reparatur von Maschinenparks bei Industriekunden.',
        salaryRange: '€45.000 - €55.000',
        requirements: ['Technische Ausbildung', 'Führerschein B', 'Reisebereitschaft'],
        budget: 60000
    },
    {
        id: 'marketing_assistant',
        title: 'Marketing Assistenz',
        description: 'Unterstützung bei Kampagnen, Social Media Management und Eventorganisation für eine lokale Agentur.',
        salaryRange: '€32.000 - €38.000',
        requirements: ['Kreativität', 'Social Media Skills', 'Gute Textierung'],
        budget: 42000
    },
    {
        id: 'educator',
        title: 'Kursleiter / Erwachsenenbildner',
        description: 'Leitung von EDV- und Soft-Skill-Kursen für ein lokales Bildungsinstitut.',
        salaryRange: '€35.000 - €42.000',
        requirements: ['Pädagogische Erfahrung', 'Geduld', 'EDV-Kenntnisse'],
        budget: 45000
    }
];
