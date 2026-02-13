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
                ),
                createCandidate('oa5', 'Petra Fleißig', 'Büroassistenz',
                    { lastRole: 'Bürokauffrau', company: 'Startup Berlin', education: 'Kauffrau', summary: 'Chaos gewohnt, sehr stressresistent.', yearsOfExperience: 3 },
                    'Ich liebe Multitasking. In meinem letzten Job habe ich drei Abteilung gleichzeitig gemanagt.',
                    { interviewerStart: 'Wirkt sehr gestresst, aber fähig.', strengths: ['Multitasking', 'Resilienz'], weaknesses: ['Detailgenauigkeit'], score: 6 },
                    { experience: 3, salary: 36000, skills: ['Slack', 'Asana', 'Zoom'], culture: ['Modern', 'Hektisch'] },
                    { red: ['Flüchtigkeitsfehler'], green: ['High Energy'] },
                    { title: 'Der Wirbelwind', description: 'Erledigt viel, macht aber kleine Fehler. Das Team mag sie.', type: 'mixed' }
                ),

                createCandidate('oa7', 'Sarah "Digital" Tech', 'Büroassistenz',
                    { lastRole: 'Virtual Assistant', company: 'Freelance', education: 'Autodidakt', summary: 'Voll digitalisiert, arbeite am liebsten remote.', yearsOfExperience: 2 },
                    'Papierlos ist die Zukunft. Ich richte euch Notion ein.',
                    { interviewerStart: 'Sehr modern, vielleicht zu modern für uns?', strengths: ['Digitalisierung', 'Tools'], weaknesses: ['Präsenz'], score: 6 },
                    { experience: 2, salary: 38000, skills: ['Notion', 'Zapier', 'AI'], culture: ['Remote-First'] },
                    { red: ['Will nicht ins Büro'], green: ['Innovativ'] },
                    { title: 'Digitaler Geist', description: 'Hat Prozesse automatisiert, war aber nie greifbar.', type: 'success' }
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
                ),
                createCandidate('ww4', 'Fitim "The Machine" ', 'Lagerist',
                    { lastRole: 'Fitnesstrainer', company: 'McFit', education: 'Lizenz B', summary: 'Körperlich top fit, suche Arbeit.', yearsOfExperience: 1 },
                    'Gewichte heben? Kein Problem. Cardio? Mache ich den ganzen Tag.',
                    { interviewerStart: 'Sehr energiegeladen. Hat seinen Proteinshake dabei.', strengths: ['Physis', 'Ausdauer'], weaknesses: ['Ordnung'], score: 5 },
                    { experience: 1, salary: 30000, skills: ['Kraft', 'Disziplin'], culture: ['Sportlich'] },
                    { red: ['Zuviel Energie'], green: ['Wird nicht müde'] },
                    { title: 'Mister Muskel', description: 'Schafft mehr als zwei normale Arbeiter, aber sortiert manchmal falsch ein.', type: 'success' }
                ),
                createCandidate('ww5', 'Olga Ordnung', 'Lagerist',
                    { lastRole: 'Bibliothekarin', company: 'Stadtbücherei', education: 'Ausbildung', summary: 'Ich möchte Ordnung ins System bringen.', yearsOfExperience: 12 },
                    'Ein Platz für alles und alles an seinem Platz.',
                    { interviewerStart: 'Sehr ruhig, fast schüchtern. Aber sehr genau.', strengths: ['Präzision', 'Systematik'], weaknesses: ['Tempo'], score: 7 },
                    { experience: 12, salary: 34000, skills: ['Katalogisieren', 'Inventur'], culture: ['Still'] },
                    { red: ['Langsam'], green: ['Null Fehler'] },
                    { title: 'Die Perfektionistin', description: 'Alles ist perfekt sortiert, aber die LKW warten manchmal.', type: 'mixed' }
                ),
                createCandidate('ww6', 'Rob "Staplerfahrer" Klaus', 'Lagerist',
                    { lastRole: 'Staplerfahrer', company: 'Logistikzentrum', education: 'Staplerschein Gold', summary: 'Ich fahre Stapler wie andere Rennwagen.', yearsOfExperience: 8 },
                    'Ich komme überall durch. Millimeterarbeit.',
                    { interviewerStart: 'Sehr selbstbewusst bzgl. seiner Fahrkünste.', strengths: ['Staplerfahren'], weaknesses: ['Sicherheit?'], score: 6 },
                    { experience: 8, salary: 36000, skills: ['Stapler Akrobatik'], culture: ['Risikofreudig'] },
                    { red: ['Fährt zu schnell'], green: ['Effizient'] },
                    { title: 'Der Raser', description: 'Wurde wegen eines Unfalls (Regal umgefahren) entlassen.', type: 'failure' }
                ),
                createCandidate('ww7', 'Student Sebastian', 'Lagerist',
                    { lastRole: 'Student', company: 'Uni', education: 'Logistik Studium', summary: 'Semesterferienjob.', yearsOfExperience: 0 },
                    'Ich will Theorie in Praxis umsetzen. Und Geld für Party.',
                    { interviewerStart: 'Klugscheißer, aber nett.', strengths: ['Theorie'], weaknesses: ['Praxis', 'Kraft'], score: 5 },
                    { experience: 0, salary: 29000, skills: ['Optimierung', 'Englisch'], culture: ['Akademisch'] },
                    { red: ['Nur temporär'], green: ['Denkt mit'] },
                    { title: 'Der Denker', description: 'Hat das Lagersystem verbessert, ist dann aber zurück zur Uni.', type: 'mixed' }
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
        case 'marketing_assistant':
            return [
                createCandidate('ma1', 'Sophie Social', 'Marketing Assistenz',
                    { lastRole: 'Social Media Manager', company: 'Modeboutique', education: 'Medienkolleg', summary: 'Lebt auf Instagram.', yearsOfExperience: 2 },
                    'Content is King. Ich mache Ihre Marke sichtbar.',
                    { interviewerStart: 'Sehr stylisch, Smartphone immer in der Hand.', strengths: ['Trends', 'Content'], weaknesses: ['Strategie'], score: 7 },
                    { experience: 2, salary: 34000, skills: ['Instagram', 'TikTok', 'Canva'], culture: ['Hip', 'Visuell'] },
                    { red: ['Handysüchtig?'], green: ['Digital Native'] },
                    { title: 'Die Influencerin', description: 'Bringt Reichweite, aber braucht Führung bei der Strategie.', type: 'success' }
                ),
                createCandidate('ma2', 'Werner Wortgewandt', 'Marketing Assistenz',
                    { lastRole: 'Copywriter', company: 'Werbeagentur', education: 'Germanistik', summary: 'Schreibt Texte, die verkaufen.', yearsOfExperience: 5 },
                    'Worte sind Waffen. Ich wähle sie weise.',
                    { interviewerStart: 'Redet sehr gewählt.', strengths: ['Text', 'SEO'], weaknesses: ['Grafik'], score: 8 },
                    { experience: 5, salary: 38000, skills: ['Copywriting', 'Blog'], culture: ['Intellektuell'] },
                    { red: ['Braucht Designer'], green: ['Top Texte'] },
                    { title: 'Der Texter', description: 'Perfekt für Blogs und Newsletter, aber kein Grafiker.', type: 'success' }
                ),
                createCandidate('ma3', 'Grafik Greta', 'Marketing Assistenz',
                    { lastRole: 'Mediengestalterin', company: 'Druckerei', education: 'Ausbildung', summary: 'Pixelperfekt.', yearsOfExperience: 4 },
                    'Ein Bild sagt mehr als tausend Worte.',
                    { interviewerStart: 'Mit Portfolio-Mappe unterm Arm.', strengths: ['Photoshop', 'InDesign'], weaknesses: ['Text'], score: 8 },
                    { experience: 4, salary: 36000, skills: ['Adobe Suite', 'Print'], culture: ['Kreativ'] },
                    { red: [], green: ['Design-Profi'] },
                    { title: 'Die Gestalterin', description: 'Macht alles hübsch, aber schreibt keine Headlines.', type: 'success' }
                ),
                createCandidate('ma4', 'Event Emil', 'Marketing Assistenz',
                    { lastRole: 'Eventmanager', company: 'Messe AG', education: 'BWL', summary: 'Organisiert alles.', yearsOfExperience: 6 },
                    'Erlebnisse schaffen Bindung.',
                    { interviewerStart: 'Sehr extrovertiert, laut.', strengths: ['Orga', 'Netzwerk'], weaknesses: ['Online Marketing'], score: 6 },
                    { experience: 6, salary: 40000, skills: ['Events', 'Planung'], culture: ['Laut'] },
                    { red: ['Teuer', 'Reisefreudig'], green: ['Organisator'] },
                    { title: 'Der Netzwerker', description: 'Toll für Messen, nutzlos für SEO.', type: 'mixed' }
                ),
                createCandidate('ma5', 'Analyse Anna', 'Marketing Assistenz',
                    { lastRole: 'Data Analyst', company: 'E-Commerce', education: 'Mathe', summary: 'Liebt Zahlen und Excel.', yearsOfExperience: 3 },
                    'Marketing muss messbar sein. ROI ist alles.',
                    { interviewerStart: 'Nüchtern, zahlengetrieben.', strengths: ['Analytics', 'Ads'], weaknesses: ['Kreativität'], score: 7 },
                    { experience: 3, salary: 38000, skills: ['Google Ads', 'Excel'], culture: ['Analytisch'] },
                    { red: ['Langweilig?'], green: ['Effizient'] },
                    { title: 'Der Analyst', description: 'Optimiert das Budget, aber keine kreative Ader.', type: 'mixed' }
                ),
                createCandidate('ma6', 'Student Sebastian', 'Marketing Assistenz',
                    { lastRole: 'Praktikant', company: 'Red Bull', education: 'Student MK', summary: 'Hat mal bei den Großen reingeschnuppert.', yearsOfExperience: 0 },
                    'Ich will Marketing rocken.',
                    { interviewerStart: 'Übermotiviert.', strengths: ['Motivation'], weaknesses: ['Erfahrung'], score: 5 },
                    { experience: 0, salary: 30000, skills: ['Theorie'], culture: ['Lernwillig'] },
                    { red: [], green: ['Günstig'] },
                    { title: 'Der Junior', description: 'Viel Theorie, muss erst lernen wie Arbeit geht.', type: 'mixed' }
                ),
                createCandidate('ma7', 'Old-School Olaf', 'Marketing Assistenz',
                    { lastRole: 'Anzeigenverkäufer', company: 'Lokalzeitung', education: 'Kaufmann', summary: 'Glaubt an Print.', yearsOfExperience: 25 },
                    'Die Zeitung liest jeder.',
                    { interviewerStart: 'Trägt Krawatte.', strengths: ['Verkauf'], weaknesses: ['Digital'], score: 4 },
                    { experience: 25, salary: 38000, skills: ['Print', 'Telefon'], culture: ['Traditionell'] },
                    { red: ['Kein Facebook'], green: ['Verkäufer'] },
                    { title: 'Der Traditionalist', description: 'Kennt jeden in der Stadt, aber findet den Power-Knopf nicht.', type: 'failure' }
                ),
                createCandidate('ma8', 'Kreativ Kim', 'Marketing Assistenz',
                    { lastRole: 'Künstler', company: 'Freischaffend', education: 'Kunstuni', summary: 'Sehr abstrakte Ideen.', yearsOfExperience: 2 },
                    'Marketing ist Kunst.',
                    { interviewerStart: 'Bunt gekleidet.', strengths: ['Ideen'], weaknesses: ['Struktur', 'Deadlines'], score: 5 },
                    { experience: 2, salary: 32000, skills: ['Malen', 'Ideen'], culture: ['Chaotisch'] },
                    { red: ['Unpünktlich', 'Abgehoben'], green: ['Kreativ'] },
                    { title: 'Der Künstler', description: 'Tolle Ideen, aber hält keine Deadline ein.', type: 'mixed' }
                ),
                createCandidate('ma9', 'Sales Sarah', 'Marketing Assistenz',
                    { lastRole: 'Verkauf', company: 'Einzelhandel', education: 'Lehre', summary: 'Kann gut mit Menschen.', yearsOfExperience: 5 },
                    'Ich verkaufe Eskimos Kühlschränke.',
                    { interviewerStart: 'Sehr überzeugend.', strengths: ['Verkauf', 'Kommunikation'], weaknesses: ['Strategie'], score: 7 },
                    { experience: 5, salary: 35000, skills: ['Reden', 'Überzeugen'], culture: ['Sales'] },
                    { red: [], green: ['Umsatztreiber'] },
                    { title: 'Die Verkäuferin', description: 'Macht Leads zu Kunden, aber keine Kampagnen.', type: 'success' }
                ),
                createCandidate('ma10', 'Praktikant Paul', 'Marketing Assistenz',
                    { lastRole: 'Schüler', company: '-', education: 'Matura', summary: 'Weiß noch nicht wohin.', yearsOfExperience: 0 },
                    'Ist das mit Computern?',
                    { interviewerStart: 'Desinteressiert.', strengths: ['Keine'], weaknesses: ['Alles'], score: 2 },
                    { experience: 0, salary: 28000, skills: ['Gaming'], culture: ['Faul'] },
                    { red: ['Null Bock'], green: ['Billig'] },
                    { title: 'Der Fehlgriff', description: 'Sitzt die Zeit ab.', type: 'failure' }
                )
            ];
        case 'educator':
            return [
                createCandidate('edu1', 'Mag. Maria', 'Kursleiter',
                    { lastRole: 'Lehrerin', company: 'Gymnasium', education: 'Lehramt', summary: 'Pädagogik-Profi, sehr strukturiert.', yearsOfExperience: 12 },
                    'Bildung ist der Schlüssel. Ich fordere und fördere.',
                    { interviewerStart: 'Sehr lehrerhaft, aber kompetent.', strengths: ['Didaktik', 'Struktur'], weaknesses: ['Flexibilität'], score: 9 },
                    { experience: 12, salary: 42000, skills: ['Unterricht', 'Deutsch', 'Englisch'], culture: ['Akademisch'] },
                    { red: ['Oberlehrerhaft'], green: ['Qualität'] },
                    { title: 'Die Lehrerin', description: 'Perfekter Unterricht, aber behandelt Erwachsene wie Kinder.', type: 'success' }
                ),
                createCandidate('edu2', 'IT-Ingo', 'Kursleiter',
                    { lastRole: 'Admin', company: 'IT Firma', education: 'Fachinformatiker', summary: 'Will sein Wissen weitergeben.', yearsOfExperience: 8 },
                    'Ich zeige denen, wie man den Computer nicht kaputt macht.',
                    { interviewerStart: 'Nervös, kein Pädagoge.', strengths: ['Fachwissen'], weaknesses: ['Erklären'], score: 6 },
                    { experience: 8, salary: 40000, skills: ['Windows', 'Office', 'Netzwerk'], culture: ['Technisch'] },
                    { red: ['Ungeduldig'], green: ['Experte'] },
                    { title: 'Der Techie', description: 'Weiß alles, kann es aber niemandem erklären.', type: 'mixed' }
                ),
                createCandidate('edu3', 'Coach Carmen', 'Kursleiter',
                    { lastRole: 'Life Coach', company: 'Selbstständig', education: 'Zertifikat', summary: 'Fokus auf Soft Skills und Mindset.', yearsOfExperience: 5 },
                    'Es geht um die innere Haltung. Atmen wir erst mal.',
                    { interviewerStart: 'Sehr esoterisch.', strengths: ['Empathie'], weaknesses: ['Harte Fakten'], score: 5 },
                    { experience: 5, salary: 38000, skills: ['Kommunikation', 'Mindset'], culture: ['Spirituell'] },
                    { red: ['Kein Stoffplan'], green: ['Motivation'] },
                    { title: 'Der Coach', description: 'Teilnehmer fühlen sich super, lernen aber nichts.', type: 'mixed' }
                ),
                createCandidate('edu4', 'Senior Sepp', 'Kursleiter',
                    { lastRole: 'Abteilungsleiter', company: 'Rente', education: 'Studium', summary: 'Macht das als Hobby in der Pension.', yearsOfExperience: 40 },
                    'Ich gebe meine Lebenserfahrung weiter.',
                    { interviewerStart: 'Erzählt viele Anekdoten.', strengths: ['Erfahrung', 'Ruhe'], weaknesses: ['Methodik'], score: 7 },
                    { experience: 40, salary: 35000, skills: ['Management', 'Buchhaltung'], culture: ['Traditionell'] },
                    { red: ['Schweift ab'], green: ['Günstig'] },
                    { title: 'Der Senior', description: 'Beliebt bei Älteren, langweilig für Junge.', type: 'success' }
                ),
                createCandidate('edu5', 'Studi Stefanie', 'Kursleiter',
                    { lastRole: 'Studentin', company: 'Uni', education: 'Bachelor', summary: 'Finanziert sich das Studium.', yearsOfExperience: 1 },
                    'Ich bin fachlich topaktuell.',
                    { interviewerStart: 'Frisch, dynamisch.', strengths: ['Aktualität'], weaknesses: ['Autorität'], score: 6 },
                    { experience: 1, salary: 30000, skills: ['Sprachen', 'Social Media'], culture: ['Jung'] },
                    { red: ['Unsicher'], green: ['Motiviert'] },
                    { title: 'Die Studentin', description: 'Macht guten Unterricht, wenn die Gruppe nett ist.', type: 'mixed' }
                ),
                createCandidate('edu6', 'Business Boris', 'Kursleiter',
                    { lastRole: 'Consultant', company: 'Unternehmensberatung', education: 'MBA', summary: 'Verkauft High-Ticket Seminare.', yearsOfExperience: 10 },
                    'Zeit ist Geld. Wir brauchen Resultate.',
                    { interviewerStart: 'Sehr arrogant, im Anzug.', strengths: ['Präsentation'], weaknesses: ['Preis'], score: 8 },
                    { experience: 10, salary: 55000, skills: ['Verkauf', 'Strategie'], culture: ['Elitär'] },
                    { red: ['Zu teuer', 'Verkauft nur'], green: ['Begeistert'] },
                    { title: 'Der Berater', description: 'Tolle Show, aber sprengt das Budget.', type: 'mixed' }
                ),
                createCandidate('edu7', 'Praktiker Paul', 'Kursleiter',
                    { lastRole: 'Handwerksmeister', company: 'Bau', education: 'Meister', summary: 'Leitet Werkstattkurse.', yearsOfExperience: 15 },
                    'Nicht quatschen, machen.',
                    { interviewerStart: 'Kernig, direkt.', strengths: ['Praxis'], weaknesses: ['Theorie'], score: 8 },
                    { experience: 15, salary: 40000, skills: ['Handwerk'], culture: ['Hands-on'] },
                    { red: ['Rauher Ton'], green: ['Kompetent'] },
                    { title: 'Der Praktiker', description: 'Top für Praxis-Kurse, nichts für den Seminarraum.', type: 'success' }
                ),
                createCandidate('edu8', 'Verwalterin Vera', 'Kursleiter',
                    { lastRole: 'Sekretärin', company: 'Institut', education: 'Kauffrau', summary: 'Kennt die Abläufe, springt ein.', yearsOfExperience: 10 },
                    'Ich weiß, wo der Beamer steht.',
                    { interviewerStart: 'Organisiert, aber fachfremd.', strengths: ['Orga'], weaknesses: ['Fachwissen'], score: 4 },
                    { experience: 10, salary: 35000, skills: ['Orga'], culture: ['Verwaltung'] },
                    { red: ['Liest nur vor'], green: ['Verlässlich'] },
                    { title: 'Die Vertretung', description: 'Hält die Stunde, aber niemand lernt was.', type: 'failure' }
                ),
                createCandidate('edu9', 'Power Petra', 'Kursleiter',
                    { lastRole: 'Fitnesstrainerin', company: 'Gym', education: 'Trainer', summary: 'Macht jetzt Gesundheitskurse.', yearsOfExperience: 5 },
                    'Bewegung ist Leben!',
                    { interviewerStart: 'Energiebündel.', strengths: ['Motivation'], weaknesses: ['Tiefe'], score: 7 },
                    { experience: 5, salary: 36000, skills: ['Sport', 'Ernährung'], culture: ['Aktiv'] },
                    { red: [], green: ['Mitreißend'] },
                    { title: 'Die Motivatorin', description: 'Alle haben Spaß, Inhalt ist zweitrangig.', type: 'success' }
                ),
                createCandidate('edu10', 'Chaos Karsten', 'Kursleiter',
                    { lastRole: 'Künstler', company: '-', education: 'Autodidakt', summary: 'Macht Kreativkurse.', yearsOfExperience: 3 },
                    'Lassen wir es fließen.',
                    { interviewerStart: 'Vergisst Namen.', strengths: ['Kreativität'], weaknesses: ['Struktur'], score: 3 },
                    { experience: 3, salary: 32000, skills: ['Malen'], culture: ['Chaotisch'] },
                    { red: ['Kommt zu spät'], green: ['Kreativ'] },
                    { title: 'Der Chaot', description: 'Vergisst die Unterlagen, improvsisiert dann.', type: 'failure' }
                )
            ];
        default:
            return [];
    }
};
