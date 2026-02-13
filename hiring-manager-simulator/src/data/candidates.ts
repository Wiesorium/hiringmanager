import type { Candidate } from '../types';

export const getCandidatesForJob = (jobId: string): Candidate[] => {
    // Helper to create candidates
    const createCandidate = (id: string, name: string, role: string, resume: any, coverLetter: string, notes: any, attributes: any, flags: any, outcome: any): Candidate => ({
        id, name, role, resume, coverLetter, interviewNotes: notes, attributes, flags, outcome, status: 'pool'
    });

    switch (jobId) {
        case 'office_assistant':
            return [
                createCandidate('oa1', 'Anna Müller', 'Büroassistenz',
                    { lastRole: 'Sekretärin', company: 'Kleines Büro GmbH', education: 'Kauffrau für Büromanagement', summary: 'Erfahren im Office-Management.', yearsOfExperience: 5 },
                    'Ich bin sehr organisiert und liebe es, Struktur in das Chaos zu bringen.',
                    { interviewerStart: 'Sehr sympathisch und ordentlich.', strengths: ['Organisation', 'Freundlichkeit'], weaknesses: ['Etwas zurückhaltend'], score: 8 },
                    { experience: 5, salary: 35000, skills: ['MS Office', 'Terminplanung'], culture: ['Strukturiert', 'Loyal'] },
                    { red: [], green: ['Sofort einsetzbar'] },
                    { title: 'Die gute Seele', description: 'Sie hat das Büro perfekt organisiert und alle waren glücklich.', type: 'success' }
                ),
                createCandidate('oa2', 'Kevin "Vollgas" Schneider', 'Büroassistenz',
                    { lastRole: 'Promoter', company: 'Events & More', education: 'Abgebrochenes Studium', summary: 'Ich brauche einen festen Job.', yearsOfExperience: 1 },
                    'Yo, ich checke eure E-Mails und mache Kaffee. Kein Problem.',
                    { interviewerStart: 'Hat die Füße auf den Tisch gelegt.', strengths: ['Selbstbewusstsein'], weaknesses: ['Professionalität', 'Respekt'], score: 2 },
                    { experience: 1, salary: 30000, skills: ['Labern'], culture: ['Locker', 'Unzuverlässig'] },
                    { red: ['Unprofessionell', 'Respektlos'], green: ['Günstig'] },
                    { title: 'Chaos Pur', description: 'Er hat wichtige Dokumente geschreddert und den Chef beleidigt.', type: 'failure' }
                ),
                createCandidate('oa3', 'Lisa Schmidt', 'Büroassistenz',
                    { lastRole: 'Bürokauffrau', company: 'Großkonzern AG', education: 'Bürokauffrau', summary: 'Suche nach Elternzeit wieder Einstieg.', yearsOfExperience: 8 },
                    'Ich bringe viel Erfahrung mit und suche eine langfristige Position.',
                    { interviewerStart: 'Wirkt sehr kompetent und routiniert.', strengths: ['Erfahrung', 'Ruhe'], weaknesses: ['Technik-Affinität'], score: 7 },
                    { experience: 8, salary: 38000, skills: ['Buchhaltung', 'Organisation'], culture: ['Konservativ', 'Verlässlich'] },
                    { red: ['Etwas langsam mit neuer Software'], green: ['Sehr erfahren'] },
                    { title: 'Solide Kraft', description: 'Sie macht ihre Arbeit gut und zuverlässig.', type: 'success' }
                ),
                createCandidate('oa4', 'Maximilian von und zu', 'Büroassistenz',
                    { lastRole: 'Assistent der Geschäftsführung', company: 'Papis Firma', education: 'BWL Studium (3. Semester)', summary: 'Möchte praktische Erfahrung sammeln.', yearsOfExperience: 0 },
                    'Geld spielt keine Rolle, ich will lernen wie man führt.',
                    { interviewerStart: 'Etwas arrogant, aber klug.', strengths: ['Ehrgeiz', 'Intelligenz'], weaknesses: ['Überheblichkeit'], score: 5 },
                    { experience: 0, salary: 30000, skills: ['Analytik'], culture: ['Elitär'] },
                    { red: ['Verwöhnt'], green: ['Schlau'] },
                    { title: 'Schnell wieder weg', description: 'War ihm zu langweilig, ist nach 2 Monaten gegangen.', type: 'mixed' }
                )
            ];
        case 'warehouse_worker':
            return [
                createCandidate('ww1', 'Thomas "Der Bär" Wagner', 'Lagerist',
                    { lastRole: 'Lagerarbeiter', company: 'Spedition Schnell', education: 'Hauptschule', summary: 'Packe gerne an. 10 Jahre Erfahrung.', yearsOfExperience: 10 },
                    'Ich rede nicht viel, ich arbeite. Staplerschein vorhanden.',
                    { interviewerStart: 'Ein Mann der Tat. Wirkte sehr kräftig.', strengths: ['Kraft', 'Erfahrung'], weaknesses: ['Kommunikation'], score: 8 },
                    { experience: 10, salary: 32000, skills: ['Staplerfahren', 'Kommissionieren'], culture: ['Ruhig', 'Fleißig'] },
                    { red: [], green: ['Zuverlässig', 'Stark'] },
                    { title: 'Der Fels', description: 'Das Lager war nie ordentlicher. Ein Top-Mitarbeiter.', type: 'success' }
                ),
                createCandidate('ww2', 'Justin Bieber (nicht der Sänger)', 'Lagerist',
                    { lastRole: 'Schüler', company: '-', education: 'Realschule', summary: 'Suche Ausbildung oder Job.', yearsOfExperience: 0 },
                    'Ich bin schnell und lerne schnell. Brauche eine Chance.',
                    { interviewerStart: 'Sehr nervös, aber motiviert.', strengths: ['Motivation', 'Schnelligkeit'], weaknesses: ['Keine Erfahrung'], score: 6 },
                    { experience: 0, salary: 28000, skills: ['Lernwillig'], culture: ['Jung', 'Formbar'] },
                    { red: ['Keine Erfahrung'], green: ['Günstig', 'Motiviert'] },
                    { title: 'Rohdiamant', description: 'Hat am Anfang Fehler gemacht, ist jetzt aber der Schnellste.', type: 'success' }
                ),
                createCandidate('ww3', 'Herbert Grudlig', 'Lagerist',
                    { lastRole: 'Lagerist', company: 'Insolvent GmbH', education: 'Keine', summary: 'Mache den Job seit 30 Jahren.', yearsOfExperience: 30 },
                    'Früher war alles besser. Ich mache es so wie immer.',
                    { interviewerStart: 'Hat nur gemeckert.', strengths: ['Erfahrung'], weaknesses: ['Einstellung', 'Flexibilität'], score: 4 },
                    { experience: 30, salary: 35000, skills: ['Erfahrung'], culture: ['Negativ', 'Stur'] },
                    { red: ['Nörgler', 'Resistent gegen Neues'], green: ['Kennt jeden Trick'] },
                    { title: 'Stimmungskiller', description: 'Hat die Moral im Team ruiniert. Musste gehen.', type: 'failure' }
                )
            ];
        case 'craftsman':
            return [
                createCandidate('cm1', 'Meister Eder', 'Handwerker',
                    { lastRole: 'Schreinermeister', company: 'Eigene Werkstatt', education: 'Meisterbrief', summary: 'Suche Festanstellung ohne Papierkram.', yearsOfExperience: 25 },
                    'Ich will handwerkeln, nicht verwalten.',
                    { interviewerStart: 'Symphatisch, kompetent, altmodisch.', strengths: ['Meisterhaft', 'Genauigkeit'], weaknesses: ['Langsam'], score: 9 },
                    { experience: 25, salary: 45000, skills: ['Holz', 'Reparaturen'], culture: ['Traditionell', 'Qualitätsbewusst'] },
                    { red: ['Möchte nichts mit Computern zu tun haben'], green: ['Top Qualität'] },
                    { title: 'Goldene Hände', description: 'Liefert perfekte Arbeit ab, braucht aber seine Zeit.', type: 'success' }
                ),
                createCandidate('cm2', 'Pfuscher Paul', 'Handwerker',
                    { lastRole: 'Allrounder', company: 'Verschiedene', education: 'Angelernt', summary: 'Ich kann alles ein bisschen.', yearsOfExperience: 5 },
                    'Passt wackelt und hat Luft. Ich mach das schon billig.',
                    { interviewerStart: 'Wirkte etwas unseriös.', strengths: ['Billig', 'Schnell'], weaknesses: ['Qualität', 'Zuverlässigkeit'], score: 3 },
                    { experience: 5, salary: 35000, skills: ['Improvisation'], culture: ['Chaotisch'] },
                    { red: ['Pfuschgefahr'], green: ['Verfügbar'] },
                    { title: 'Teurer Spaß', description: 'Mussten alles nachbessern lassen. Katastrophe.', type: 'failure' }
                ),
                createCandidate('cm3', 'Tim Taylor', 'Handwerker',
                    { lastRole: 'Heimwerker King', company: 'TV Show', education: 'Leben', summary: 'Mehr Power!', yearsOfExperience: 10 },
                    'Ich tune eure Kaffeemaschine.',
                    { interviewerStart: 'Sehr laut und enthusiastisch.', strengths: ['Power', 'Ideen'], weaknesses: ['Unfallgefahr'], score: 5 },
                    { experience: 10, salary: 42000, skills: ['Tuning', 'Power Tools'], culture: ['Explosiv'] },
                    { red: ['Unfallrisiko'], green: ['Unterhaltsam'] },
                    { title: 'Explosion', description: 'Hat die Werkstatt in die Luft gejagt.', type: 'failure' }
                )
            ];
        case 'technician':
            return [
                createCandidate('tech1', 'Ing. Daniel Düsentrieb', 'Techniker',
                    { lastRole: 'Entwickler', company: 'Entenhausen AG', education: 'Dipl.-Ing.', summary: 'Ich finde für jedes Problem eine Lösung.', yearsOfExperience: 12 },
                    'Dem Ingeniör ist nichts zu schwör.',
                    { interviewerStart: 'Genial aber zerstreut.', strengths: ['Genialität', 'Lösungen'], weaknesses: ['Fokus'], score: 9 },
                    { experience: 12, salary: 60000, skills: ['Erfinden', 'Reparieren'], culture: ['Kreativ'] },
                    { red: ['Vergisst zu essen'], green: ['Löst unlösbare Probleme'] },
                    { title: 'Der Retter', description: 'Hat Systeme repariert, die als kaputt galten. Unbezahlbar.', type: 'success' }
                ),
                createCandidate('tech2', 'Dr. No', 'Techniker',
                    { lastRole: 'Systemadmin', company: 'Evil Corp', education: 'PhD Informatik', summary: 'Spezialist für Sicherheit.', yearsOfExperience: 8 },
                    'Ich sorge dafür, dass niemand reinkommt. Niemand.',
                    { interviewerStart: 'Unheimlich. Hatte eine weiße Katze dabei.', strengths: ['Sicherheit', 'Wissen'], weaknesses: ['Sozialkompetenz'], score: 7 },
                    { experience: 8, salary: 58000, skills: ['Security', 'Verschlüsselung'], culture: ['Paranoid'] },
                    { red: ['Könnte ein Bösewicht sein'], green: ['Sicher ist sicher'] },
                    { title: 'Zu Sicher', description: 'Hat das System so gesichert, dass niemand mehr arbeiten konnte.', type: 'mixed' }
                ),
                createCandidate('tech3', 'Azubi Alex', 'Techniker',
                    { lastRole: 'Hobbybastler', company: 'Zuhause', education: 'Abitur', summary: 'Ich liebe Computer.', yearsOfExperience: 0 },
                    'Ich habe meinen eigenen PC gebaut. Ich lerne schnell.',
                    { interviewerStart: 'Sehr jung und eifrig.', strengths: ['Motivation', 'Grundwissen'], weaknesses: ['Erfahrung'], score: 6 },
                    { experience: 0, salary: 45000, skills: ['Hardware', 'Löten'], culture: ['Nerdig'] },
                    { red: [], green: ['Formbar'] },
                    { title: 'Solider Start', description: 'Macht sich gut und lernt jeden Tag dazu.', type: 'success' }
                )
            ];
        default:
            return [];
    }
};
