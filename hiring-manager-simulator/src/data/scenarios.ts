import type { Scenario } from '../types';

export const scenarios: Scenario[] = [
    // ─────────────────────────────────────────────
    // OFFICE ASSISTANT
    // ─────────────────────────────────────────────
    {
        jobId: 'office_assistant',
        messages: [
            {
                id: 'oa_m1',
                sender: 'Frau Dr. Brenner',
                role: 'Geschäftsführerin',
                content: 'Bitte beachtet: Wir suchen jemanden, der wirklich eigenständig arbeiten kann. Das Chaos der letzten Büroassistenz hat uns zwei Monate Mehrarbeit gekostet. Qualität vor Schnelligkeit.',
                jobId: 'office_assistant',
                triggerPhase: 'screening',
                isRead: false
            },
            {
                id: 'oa_m2',
                sender: 'Klaus (Teamleitung)',
                role: 'Team Lead',
                content: 'Ich brauche jemanden, der reibungslos ins Team passt. Wir sind ein kleines Büro, da ist die Chemie entscheidend. Fachliches lässt sich trainieren – Charakter nicht.',
                jobId: 'office_assistant',
                triggerPhase: 'screening',
                isRead: false
            },
            {
                id: 'oa_m3',
                sender: 'Sabine (HR)',
                role: 'HR',
                content: 'Zur Info: Budget ist knapp. Wir können für eine wirklich starke Kandidatin etwas drauflegen, aber versucht unter 38.000 € zu bleiben. Der Vorstand schaut hin.',
                jobId: 'office_assistant',
                triggerPhase: 'screening',
                isRead: false
            },
            {
                id: 'oa_m4',
                sender: 'Klaus (Teamleitung)',
                role: 'Team Lead',
                content: 'Kleiner Hinweis: Meine Schwägerin hat sich beworben. Ich sag nur, gebt ihr eine faire Chance, ja? Sie ist wirklich ordentlich.',
                jobId: 'office_assistant',
                triggerPhase: 'interviews',
                isRead: false
            },
            {
                id: 'oa_m5',
                sender: 'Frau Dr. Brenner',
                role: 'Geschäftsführerin',
                content: 'Wir haben morgen ein wichtiges Kundengespräch. Ich brauche bis dann eine Entscheidung – die neue Kraft soll idealerweise nächste Woche beginnen.',
                jobId: 'office_assistant',
                triggerPhase: 'decision',
                effect: { type: 'urgency_increase', value: 60 },
                isRead: false
            },
            {
                id: 'oa_m6',
                sender: 'Sabine (HR)',
                role: 'HR',
                content: 'Eine unserer Kandidatinnen hat mir kurz geschrieben – sie hat ein weiteres Angebot auf dem Tisch. Falls wir sie wollen, müssen wir uns beeilen.',
                jobId: 'office_assistant',
                triggerPhase: 'decision',
                isRead: false
            }
        ],
        applicantEvents: [
            {
                id: 'oa_ae1',
                candidateId: 'oa1',
                jobId: 'office_assistant',
                triggerPhase: 'screening',
                type: 'question_email',
                sender: 'Anna Müller',
                subject: 'Rückfrage zur Stelle – Büroassistenz',
                body: 'Sehr geehrte Damen und Herren,\n\nvielen Dank für die spannende Stellenausschreibung. Ich hätte eine kurze Rückfrage: Wäre eine Teilzeitoption (30 Stunden) denkbar, oder ist die Stelle ausschließlich in Vollzeit zu besetzen?\n\nMit freundlichen Grüßen,\nAnna Müller',
                isRead: false
            },
            {
                id: 'oa_ae2',
                candidateId: 'oa5',
                jobId: 'office_assistant',
                triggerPhase: 'interviews',
                type: 'thank_you_mail',
                sender: 'Petra Fleißig',
                subject: 'Herzlichen Dank für das Gespräch!',
                body: 'Liebes Team,\n\nheute hat mir das Gespräch mit Ihnen wirklich Freude bereitet! Die offene Atmosphäre und die Aufgaben begeistern mich sehr. Ich habe bereits ein paar Ideen notiert, wie ich das Ablagesystem in Ihrem Büro noch effizienter gestalten könnte.\n\nIch freue mich sehr auf eine positive Antwort.\n\nHerzliche Grüße,\nPetra Fleißig',
                effect: { type: 'candidate_boost', candidateId: 'oa5', value: 1 },
                isRead: false
            },
            {
                id: 'oa_ae3',
                candidateId: 'oa2',
                jobId: 'office_assistant',
                triggerPhase: 'interviews',
                type: 'question_email',
                sender: 'Kevin Schneider',
                subject: 'Hey, wann hör ich von euch?',
                body: `Hey,\n\nalso wann geht's los? Ich bin ready. Schreibt mir kurz – ich check mein Handy immer.\n\nCheers,\nKevin`,
                isRead: false
            },
            {
                id: 'oa_ae4',
                candidateId: 'oa8',
                jobId: 'office_assistant',
                triggerPhase: 'decision',
                type: 'reference_letter',
                sender: 'Hannes Hilfreich',
                subject: 'Referenzschreiben meines Hoteldirektors',
                body: 'Sehr geehrte Damen und Herren,\n\nerbsunbegabt – mein früherer Vorgesetzter, Herr Radtke (Hotel Sonnenhöhe), hat mir freundlicherweise ein Referenzschreiben ausgestellt, das ich heute in Anlage an Sie weiterleite. Vielleicht ist dies hilfreich für Ihre finale Entscheidung.\n\nHerzliche Grüße,\nHannes Hilfreich',
                effect: { type: 'candidate_boost', candidateId: 'oa8', value: 1 },
                isRead: false
            },
            {
                id: 'oa_ae5',
                candidateId: 'oa10',
                jobId: 'office_assistant',
                triggerPhase: 'decision',
                type: 'withdrawal',
                sender: 'Romy Rückkehrerin',
                subject: 'Zurückziehung meiner Bewerbung',
                body: 'Sehr geehrte Damen und Herren,\n\nleider muss ich meine Bewerbung zurückziehen. Mein bisheriger Arbeitgeber hat mir eine Rückkehrmöglichkeit in Teilzeit angeboten, die ich annehmen möchte.\n\nIch entschuldige mich für die Unannehmlichkeiten.\n\nMit freundlichen Grüßen,\nRomy',
                effect: { type: 'candidate_lost', candidateId: 'oa10' },
                isRead: false
            }
        ]
    },

    // ─────────────────────────────────────────────
    // WAREHOUSE WORKER
    // ─────────────────────────────────────────────
    {
        jobId: 'warehouse_worker',
        messages: [
            {
                id: 'ww_m1',
                sender: 'Bernd Kellner',
                role: 'Logistikleiter',
                content: 'Ich brauche einen Lageristen der anpackt und JETZT anfangen kann. Staplerschein und körperliche Belastbarkeit sind Pflicht – keine Ausnahmen. Wir haben nächste Woche Großlieferung.',
                jobId: 'warehouse_worker',
                triggerPhase: 'screening',
                isRead: false
            },
            {
                id: 'ww_m2',
                sender: 'Markus (Sicherheitsbeauftragter)',
                role: 'Arbeitssicherheit',
                content: 'Bitte prüft unbedingt die Sicherheitsnachweise. Wir hatten letztes Jahr zwei Unfälle – der TÜV steht nächsten Monat vor der Tür. Jemand ohne Sicherheitsbewusstsein kommt für mich nicht infrage.',
                jobId: 'warehouse_worker',
                triggerPhase: 'screening',
                isRead: false
            },
            {
                id: 'ww_m3',
                sender: 'Bernd Kellner',
                role: 'Logistikleiter',
                content: 'Budget-Update: Finanzabteilung hat die Lohngrenze auf 34.000 € gedeckelt. Ich weiß, das ist knapp für einen erfahrenen Lageristen. Nehmt es trotzdem als harte Grenze.',
                jobId: 'warehouse_worker',
                triggerPhase: 'interviews',
                effect: { type: 'budget_cut', value: 4000 },
                isRead: false
            },
            {
                id: 'ww_m4',
                sender: 'Direktionsassistentin Pia',
                role: 'Direktion',
                content: 'Die Geschäftsführung fragt nach Stand der Stelle. Bitte bis Freitag entscheiden – die Schicht muss besetzt sein.',
                jobId: 'warehouse_worker',
                triggerPhase: 'decision',
                effect: { type: 'urgency_increase', value: 70 },
                isRead: false
            },
            {
                id: 'ww_m5',
                sender: 'Markus (Sicherheitsbeauftragter)',
                role: 'Arbeitssicherheit',
                content: 'Ich habe Rob Klaus gegoogelt. Da war mal eine Meldung zu einem Zwischenfall am alten Arbeitsplatz. Bin gespannt, was er dazu sagt im Interview.',
                jobId: 'warehouse_worker',
                triggerPhase: 'interviews',
                isRead: false
            }
        ],
        applicantEvents: [
            {
                id: 'ww_ae1',
                candidateId: 'ww1',
                jobId: 'warehouse_worker',
                triggerPhase: 'screening',
                type: 'question_email',
                sender: 'Thomas Wagner',
                subject: 'Frage zu den Schichtzeiten',
                body: 'Hallo,\n\nkonnte die Schichtzeiten in der Ausschreibung nicht genau entnehmen. Ich bevorzuge Frühschicht – ist das möglich?\n\nGruß,\nThomas Wagner',
                isRead: false
            },
            {
                id: 'ww_ae2',
                candidateId: 'ww9',
                jobId: 'warehouse_worker',
                triggerPhase: 'interviews',
                type: 'thank_you_mail',
                sender: 'Stapler Steffi',
                subject: 'Danke für das Gespräch!',
                body: 'Hallo Bernd,\n\nvielen Dank für das offene Gespräch heute. Das Lager ist gut organisiert – ich hätte noch ein paar Ideen für den Wareneingang, falls das Interesse besteht. Ich freue mich sehr auf die Möglichkeit!\n\nBeste Grüße,\nStefanie Kraus',
                effect: { type: 'candidate_boost', candidateId: 'ww9', value: 1 },
                isRead: false
            },
            {
                id: 'ww_ae3',
                candidateId: 'ww10',
                jobId: 'warehouse_worker',
                triggerPhase: 'screening',
                type: 'question_email',
                sender: 'Fritz Faulpelz',
                subject: 'Wann gibts Urlaub?',
                body: 'Hey,\n\nich brauch nächsten Monat 2 Wochen Urlaub. Geht das gleich ab Anfang? Sonst ist das nix für mich.\n\nFritz',
                isRead: false
            },
            {
                id: 'ww_ae4',
                candidateId: 'ww2',
                jobId: 'warehouse_worker',
                triggerPhase: 'decision',
                type: 'portfolio_link',
                sender: 'Justin',
                subject: 'Mein Zeugnis und Kursnachweis',
                body: 'Hallo!\n\nIch habe in der Zwischenzeit den Gabelstaplerkurs abgeschlossen! Den Nachweis lege ich bei. Ich hoffe das hilft.\n\nViele Grüße,\nJustin',
                effect: { type: 'candidate_boost', candidateId: 'ww2', value: 2 },
                isRead: false
            },
            {
                id: 'ww_ae5',
                candidateId: 'ww6',
                jobId: 'warehouse_worker',
                triggerPhase: 'decision',
                type: 'withdrawal',
                sender: 'Rob Klaus',
                subject: 'Bewerbung zurückgezogen',
                body: 'Guten Tag,\n\nein anderes Unternehmen hat mir ein Angebot gemacht, das ich annehmen werde. Ich wünsche Ihnen weiterhin viel Erfolg.\n\nRob Klaus',
                effect: { type: 'candidate_lost', candidateId: 'ww6' },
                isRead: false
            }
        ]
    },

    // ─────────────────────────────────────────────
    // CRAFTSMAN
    // ─────────────────────────────────────────────
    {
        jobId: 'craftsman',
        messages: [
            {
                id: 'cm_m1',
                sender: 'Walter (Werkstattleiter)',
                role: 'Werkstattleiter',
                content: 'Wir haben aktuell einen Auftragsstau von 3 Wochen. Ich brauche jemanden mit Meisterbrief oder mindestens 5 Jahre Erfahrung im Bau, der sofort eigenständig arbeiten kann.',
                jobId: 'craftsman',
                triggerPhase: 'screening',
                isRead: false
            },
            {
                id: 'cm_m2',
                sender: 'Frau Koch (Einkauf)',
                role: 'Einkauf',
                content: 'Wir haben gerade Beschwerden von Kunden wegen fehlerhafter Reparaturen. Bitte stellt niemanden ein, der billig ist aber schlechte Arbeit liefert. Qualität kostet, Pfusch kostet mehr.',
                jobId: 'craftsman',
                triggerPhase: 'screening',
                isRead: false
            },
            {
                id: 'cm_m3',
                sender: 'Walter (Werkstattleiter)',
                role: 'Werkstattleiter',
                content: 'Tim Taylor hat heute fast eine Schleifmaschine demontiert, die er gar nicht anfassen sollte. Ich würde ihn gerne aus dem Prozess nehmen, aber das liegt bei euch.',
                jobId: 'craftsman',
                triggerPhase: 'interviews',
                isRead: false
            },
            {
                id: 'cm_m4',
                sender: 'Herr Braun (CFO)',
                role: 'CFO',
                content: 'Handwerker sind teuer. Wir haben das Budget durch den Q3-Verlust um 5.000 € reduziert. Bitte im Rahmen bleiben.',
                jobId: 'craftsman',
                triggerPhase: 'interviews',
                effect: { type: 'budget_cut', value: 5000 },
                isRead: false
            },
            {
                id: 'cm_m5',
                sender: 'Kundin Frau Haas',
                role: 'Kundenfeedback',
                content: 'Meine Heizungsanlage wartet seit 2 Wochen auf Reparatur. Wenn ihr nicht bald einen Techniker schickt, gehe ich zur Konkurrenz. Bitte Entscheidung beschleunigen!',
                jobId: 'craftsman',
                triggerPhase: 'decision',
                effect: { type: 'urgency_increase', value: 55 },
                isRead: false
            }
        ],
        applicantEvents: [
            {
                id: 'cm_ae1',
                candidateId: 'cm1',
                jobId: 'craftsman',
                triggerPhase: 'screening',
                type: 'portfolio_link',
                sender: 'Meister Eder',
                subject: 'Referenzfotos meiner letzten Projekte',
                body: 'Grüß Gott,\n\nich schicke Ihnen einige Fotos meiner letzten Arbeiten. Schreinerarbeiten, Restaurierungen, Innenausbau. Ich hoffe das gibt einen besseren Eindruck als ein Lebenslauf.\n\nMit besten Grüßen,\nHans-Joachim Eder, Meister',
                effect: { type: 'candidate_boost', candidateId: 'cm1', value: 2 },
                isRead: false
            },
            {
                id: 'cm_ae2',
                candidateId: 'cm5',
                jobId: 'craftsman',
                triggerPhase: 'screening',
                type: 'question_email',
                sender: 'Azubi Ali',
                subject: 'Frage zur Stelle',
                body: 'Hallo,\n\ngibt es auch die Möglichkeit einer Ausbildung? Ich würde sehr gern was lernen.\n\nViele Grüße,\nAli',
                isRead: false
            },
            {
                id: 'cm_ae3',
                candidateId: 'cm6',
                jobId: 'craftsman',
                triggerPhase: 'interviews',
                type: 'thank_you_mail',
                sender: 'Elektro Evi',
                subject: 'Nachricht nach dem Gespräch',
                body: 'Guten Tag,\n\nvielen Dank für die angenehme Interviewatmosphäre. Ich möchte nochmals betonen: Ich bin sofort verfügbar und bringe alle Zertifizierungen für Elektroinstallationen mit. Falls noch Unterlagen benötigt werden, gerne sofort.\n\nFreundliche Grüße,\nEvi Bergmann',
                effect: { type: 'candidate_boost', candidateId: 'cm6', value: 1 },
                isRead: false
            },
            {
                id: 'cm_ae4',
                candidateId: 'cm3',
                jobId: 'craftsman',
                triggerPhase: 'interviews',
                type: 'question_email',
                sender: 'Tim Taylor',
                subject: 'Kann ich schon mal was tunen?',
                body: 'Hey!\n\nIch hab schon Ideen, wie wir eure Werkzeuge upgraden könnten. Wäre cool wenn ich vor dem Start schon kurz vorbeischauen darf. Ich bringe Werkzeug mit. MORE POWER!\n\nTim',
                isRead: false
            },
            {
                id: 'cm_ae5',
                candidateId: 'cm4',
                jobId: 'craftsman',
                triggerPhase: 'decision',
                type: 'withdrawal',
                sender: 'Genau Gustav',
                subject: 'Rückzug meiner Bewerbung',
                body: 'Sehr geehrte Damen und Herren,\n\nda ich bis heute keine Rückmeldung erhalten habe, gehe ich davon aus, dass eine zeitnahe Einstellung nicht geplant ist. Ich habe daher eine andere Stelle angenommen.\n\nGustav Pfeifer',
                effect: { type: 'candidate_lost', candidateId: 'cm4' },
                isRead: false
            }
        ]
    },

    // ─────────────────────────────────────────────
    // TECHNICIAN
    // ─────────────────────────────────────────────
    {
        jobId: 'technician',
        messages: [
            {
                id: 'tech_m1',
                sender: 'Ralf Müller',
                role: 'IT-Manager',
                content: 'Unsere Systeme laufen auf 70% Kapazität, seit der letzte Techniker gekündigt hat. Ich brauche innerhalb von 2 Wochen jemanden. Idealerweise jemand mit Erfahrung in Maschinensteuerung UND IT.',
                jobId: 'technician',
                triggerPhase: 'screening',
                isRead: false
            },
            {
                id: 'tech_m2',
                sender: 'CEO Frau Vogel',
                role: 'CEO',
                content: 'Der Ausfall kostet uns täglich Geld. Bitte keine langen Prozesse – ich akzeptiere auch einen leicht teureren Kandidaten wenn er sofort anfangen kann.',
                jobId: 'technician',
                triggerPhase: 'screening',
                isRead: false
            },
            {
                id: 'tech_m3',
                sender: 'Ralf Müller',
                role: 'IT-Manager',
                content: 'Kurzes Update: Cloud Claud hat mich nach dem Interview direkt per LinkedIn kontaktiert und gefragt ob wir zu AWS wechseln wollen. Das gibt mir zu denken.',
                jobId: 'technician',
                triggerPhase: 'interviews',
                isRead: false
            },
            {
                id: 'tech_m4',
                sender: 'CFO Herr Bauer',
                role: 'CFO',
                content: 'Der IT-Haushalt ist angespannt. Obere Grenze sind 55.000 €. Alles drüber braucht meinen persönlichen Sign-off.',
                jobId: 'technician',
                triggerPhase: 'interviews',
                effect: { type: 'budget_cut', value: 5000 },
                isRead: false
            },
            {
                id: 'tech_m5',
                sender: 'CEO Frau Vogel',
                role: 'CEO',
                content: 'Es ist jetzt Montag. Ich will bis Mittwochabend einen signierten Vertrag auf meinem Tisch sehen. Irgendwen einstellen ist besser als niemanden.',
                jobId: 'technician',
                triggerPhase: 'decision',
                effect: { type: 'urgency_increase', value: 80 },
                isRead: false
            }
        ],
        applicantEvents: [
            {
                id: 'tech_ae1',
                candidateId: 'tech1',
                jobId: 'technician',
                triggerPhase: 'screening',
                type: 'portfolio_link',
                sender: 'Ing. Daniel Düsentrieb',
                subject: 'GitHub-Link und Patente',
                body: 'Guten Tag,\n\nanbei mein GitHub-Profil sowie zwei Patentanmeldungen aus meiner Zeit bei Entenhausen AG. Nichts Weltbewegendes, aber es zeigt wie ich an Probleme herangehe.\n\nhttps://github.com/dduesentrieb\n\nMit freundlichen Grüßen,\nDaniel Düsentrieb, Dipl.-Ing.',
                effect: { type: 'candidate_boost', candidateId: 'tech1', value: 2 },
                isRead: false
            },
            {
                id: 'tech_ae2',
                candidateId: 'tech4',
                jobId: 'technician',
                triggerPhase: 'interviews',
                type: 'thank_you_mail',
                sender: 'Linux Lena',
                subject: 'Danke + kleines Skript als Mitbringsel',
                body: 'Hallo Ralf,\n\ndanke für das tolle Gespräch! Ich habe heute Nacht kurz ein Monitoring-Skript für euren Serverpark gebastelt, das ihr sofort einsetzen könntet. Liegt im Anhang (Bash).\n\nLG,\nLena',
                effect: { type: 'candidate_boost', candidateId: 'tech4', value: 2 },
                isRead: false
            },
            {
                id: 'tech_ae3',
                candidateId: 'tech9',
                jobId: 'technician',
                triggerPhase: 'screening',
                type: 'question_email',
                sender: 'Charly CCC',
                subject: 'Ich bin schon im internen Wiki',
                body: 'Hey,\n\nnur so als Info: Eure Firewall hat eine Fehlkonfiguration auf Port 8443. Kein Grund zur Panik, hab nix gemacht. Aber denkt mal drüber nach mich einzustellen.\n\nCharly',
                isRead: false
            },
            {
                id: 'tech_ae4',
                candidateId: 'tech7',
                jobId: 'technician',
                triggerPhase: 'interviews',
                type: 'question_email',
                sender: 'Cloud Claud',
                subject: 'Kurze Frage zu AWS-Budget',
                body: 'Hi!\n\nIch hab nach unserem Gespräch ein grobes Cloud-Migrationskonzept skizziert. Rechnet mal mit ca. 24.000 € Jahres-Lizenzkosten für AWS. Das amortisiert sich nach 2 Jahren. Soll ich das formal ausarbeiten?\n\nCheers,\nClaud',
                isRead: false
            },
            {
                id: 'tech_ae5',
                candidateId: 'tech3',
                jobId: 'technician',
                triggerPhase: 'decision',
                type: 'reference_letter',
                sender: 'Azubi Alex',
                subject: 'Empfehlung meines Lehrers',
                body: 'Hallo!\n\nMein Informatiklehrer hat mir spontan einen Referenzbrief geschrieben. Ich glaube, er beschreibt mein Potenzial ganz gut. Ich weiß, ich bin noch jung – aber ich gebe alles.\n\nViele Grüße,\nAlex',
                effect: { type: 'candidate_boost', candidateId: 'tech3', value: 1 },
                isRead: false
            }
        ]
    },

    // ─────────────────────────────────────────────
    // MARKETING ASSISTANT
    // ─────────────────────────────────────────────
    {
        jobId: 'marketing_assistant',
        messages: [
            {
                id: 'ma_m1',
                sender: 'Lisa (CMO)',
                role: 'Chief Marketing Officer',
                content: 'Ich will jemanden mit echtem Gespür für Social Media und aktuelle Trends. Die Person muss unsere Marke auf Instagram und TikTok weiterbringen. Zahlen allein reichen mir nicht.',
                jobId: 'marketing_assistant',
                triggerPhase: 'screening',
                isRead: false
            },
            {
                id: 'ma_m2',
                sender: 'Herr Gruber (CFO)',
                role: 'CFO',
                content: 'Das Social-Media-Budget wurde kürzlich halbiert. Wer auch immer eingestellt wird, muss mit wenig viel erreichen können. Effizienz ist das Stichwort.',
                jobId: 'marketing_assistant',
                triggerPhase: 'screening',
                isRead: false
            },
            {
                id: 'ma_m3',
                sender: 'Lisa (CMO)',
                role: 'CMO',
                content: 'Old-School Olaf hat im Interview tatsächlich von Zeitungsanzeigen gesprochen. Ich mein, ich bin ja tolerant, aber wir sind ein Digitalunternehmen. Bitte berücksichtigt das.',
                jobId: 'marketing_assistant',
                triggerPhase: 'interviews',
                isRead: false
            },
            {
                id: 'ma_m4',
                sender: 'Herr Gruber (CFO)',
                role: 'CFO',
                content: 'Das Quartalsergebnis ist schwach. Budget für die Stelle bitte max. 36.000 € Jahresgehalt. Ich weiß, das ist unter dem Markt, aber das sind die Rahmenbedingungen.',
                jobId: 'marketing_assistant',
                triggerPhase: 'interviews',
                effect: { type: 'budget_cut', value: 6000 },
                isRead: false
            },
            {
                id: 'ma_m5',
                sender: 'Lisa (CMO)',
                role: 'CMO',
                content: 'Wir launch nächste Woche eine Kampagne. Die neue Kraft muss direkt ab Tag 1 liefern können. Entscheidung bitte heute noch.',
                jobId: 'marketing_assistant',
                triggerPhase: 'decision',
                effect: { type: 'urgency_increase', value: 65 },
                isRead: false
            }
        ],
        applicantEvents: [
            {
                id: 'ma_ae1',
                candidateId: 'ma1',
                jobId: 'marketing_assistant',
                triggerPhase: 'screening',
                type: 'portfolio_link',
                sender: 'Sophie Social',
                subject: 'Mein Instagram- & TikTok-Portfolio',
                body: 'Hi!\n\nhier ist mein Content-Portfolio:\n📸 https://www.instagram.com/sophiesocial_muster\n🎵 https://www.tiktok.com/@sophiesocial\n\nBeide Accounts habe ich von Null aufgebaut. Die Engagement-Rate liegt über dem Branchendurchschnitt.\n\nFreue mich auf euch!\nSophie ✨',
                effect: { type: 'candidate_boost', candidateId: 'ma1', value: 2 },
                isRead: false
            },
            {
                id: 'ma_ae2',
                candidateId: 'ma2',
                jobId: 'marketing_assistant',
                triggerPhase: 'screening',
                type: 'portfolio_link',
                sender: 'Werner Wortgewandt',
                subject: 'Drei meiner besten Texte',
                body: 'Sehr geehrte Damen und Herren,\n\nanbei drei ausgewählte Texte: ein SEO-Artikel, ein Kundenmailing und ein Produkttext. Ich freue mich auf die Gelegenheit zu zeigen, wie Sprache Marken stärkt.\n\nMit freundlichen Grüßen,\nWerner Wortgewandt',
                effect: { type: 'candidate_boost', candidateId: 'ma2', value: 1 },
                isRead: false
            },
            {
                id: 'ma_ae3',
                candidateId: 'ma8',
                jobId: 'marketing_assistant',
                triggerPhase: 'interviews',
                type: 'question_email',
                sender: 'Kreativ Kim',
                subject: 'Ich hab eine Vision für euch',
                body: 'Heyyyy,\n\nkann ich beim nächsten Gespräch meine Skizzen für eure neue Brand Identity mitbringen? Ich hab die ganze Nacht gemalt. Deadline-mäßig bin ich übrigens total flexibel, Deadlines sind Kunst!\n\nKim 🎨',
                isRead: false
            },
            {
                id: 'ma_ae4',
                candidateId: 'ma5',
                jobId: 'marketing_assistant',
                triggerPhase: 'decision',
                type: 'thank_you_mail',
                sender: 'Analyse Anna',
                subject: 'Follow-up + Mini-Audit eurer Google Ads',
                body: 'Guten Tag,\n\nich habe mir Ihre öffentlichen Google Ads-Daten angesehen und ein kleines kostenfreies Audit erstellt (Anlage). Ich denke, Sie könnten mit optimiertem Targeting ca. 22 % Kosten einsparen.\n\nDas zeigt meinen Arbeitsansatz am besten.\n\nMit freundlichen Grüßen,\nAnna Bergmann',
                effect: { type: 'candidate_boost', candidateId: 'ma5', value: 2 },
                isRead: false
            },
            {
                id: 'ma_ae5',
                candidateId: 'ma7',
                jobId: 'marketing_assistant',
                triggerPhase: 'decision',
                type: 'withdrawal',
                sender: 'Old-School Olaf',
                subject: 'Ich ziehe meine Bewerbung zurück',
                body: 'Sehr geehrte Damen und Herren,\n\nda mir beim Gespräch klar wurde, dass bei Ihnen hauptsächlich Online-Marketing gefragt ist, möchte ich meine Bewerbung zurückziehen. Das ist nicht mein Bereich.\n\nMit freundlichem Gruß,\nOlaf Herzberg',
                effect: { type: 'candidate_lost', candidateId: 'ma7' },
                isRead: false
            }
        ]
    },

    // ─────────────────────────────────────────────
    // EDUCATOR
    // ─────────────────────────────────────────────
    {
        jobId: 'educator',
        messages: [
            {
                id: 'edu_m1',
                sender: 'Dr. Huber (Institutsdirektor)',
                role: 'Institutsdirektor',
                content: 'Wir haben einen Ruf als seriöses Bildungsinstitut. Die Person muss pädagogisch qualifiziert und verlässlich sein. Unsere Teilnehmer sind Erwachsene – Respekt und Kompetenz sind Pflicht.',
                jobId: 'educator',
                triggerPhase: 'screening',
                isRead: false
            },
            {
                id: 'edu_m2',
                sender: 'Frau Stern (Verwaltung)',
                role: 'Verwaltungsleitung',
                content: 'Das Bildungsministerium prüft unsere Fördergelder. Wir brauchen nachweisbare Qualifikation des Kursleiters – bitte Zeugnisse und Zertifikate einfordern.',
                jobId: 'educator',
                triggerPhase: 'screening',
                isRead: false
            },
            {
                id: 'edu_m3',
                sender: 'Kursteilnehmerin Frau Hofer',
                role: 'Teilnehmerfeedback',
                content: 'Wir haben gehört, dass ein neuer Kursleiter kommt. Bitte jemanden, der wirklich erklärt und nicht einfach Folien vorliest. Der letzte hat uns eingeschläfert.',
                jobId: 'educator',
                triggerPhase: 'interviews',
                isRead: false
            },
            {
                id: 'edu_m4',
                sender: 'Dr. Huber (Institutsdirektor)',
                role: 'Institutsdirektor',
                content: 'Business Boris möchte 55.000 €. Das sprengt unser Bildungsbudget deutlich. Trotzdem – wenn jemand wirklich gut ist, können wir intern umschichten.',
                jobId: 'educator',
                triggerPhase: 'interviews',
                isRead: false
            },
            {
                id: 'edu_m5',
                sender: 'Frau Stern (Verwaltung)',
                role: 'Verwaltungsleitung',
                content: 'Die Kurse starten in 10 Tagen. Wir müssen morgen einen Vertrag unterschreiben, sonst müssen wir absagen – das wäre ein Reputationsschaden.',
                jobId: 'educator',
                triggerPhase: 'decision',
                effect: { type: 'urgency_increase', value: 75 },
                isRead: false
            }
        ],
        applicantEvents: [
            {
                id: 'edu_ae1',
                candidateId: 'edu1',
                jobId: 'educator',
                triggerPhase: 'screening',
                type: 'portfolio_link',
                sender: 'Mag. Maria',
                subject: 'Unterrichtskonzept und Bewertungen',
                body: 'Sehr geehrte Damen und Herren,\n\nanbei ein exemplarisches Unterrichtskonzept für einen EDV-Grundkurs sowie anonymisierte Teilnehmerbewertungen aus dem letzten Jahr (Ø 4,7/5).\n\nMit freundlichen Grüßen,\nMag. Maria Hufeisen',
                effect: { type: 'candidate_boost', candidateId: 'edu1', value: 2 },
                isRead: false
            },
            {
                id: 'edu_ae2',
                candidateId: 'edu3',
                jobId: 'educator',
                triggerPhase: 'screening',
                type: 'question_email',
                sender: 'Coach Carmen',
                subject: 'Kurze Frage zur Zielgruppe',
                body: 'Liebe Team,\n\ndarf ich fragen wer die Kursteilnehmer sind? Ich arbeite am liebsten mit Menschen, die sich in einer Lebensveränderung befinden. Das macht mein Coaching wirklich lebendig!\n\nHerzlich,\nCarmen',
                isRead: false
            },
            {
                id: 'edu_ae3',
                candidateId: 'edu7',
                jobId: 'educator',
                triggerPhase: 'interviews',
                type: 'thank_you_mail',
                sender: 'Praktiker Paul',
                subject: 'Kurze Nachricht nach dem Gespräch',
                body: 'Grüß Gott,\n\nda fällt mir noch ein: ich könnte für die Teilnehmer eine kleine Übungsstation aufbauen. Hands-on Lernen, so macht man das richtig. Kein Schmus, nur Praxis.\n\nGruß,\nPaul Kainz',
                effect: { type: 'candidate_boost', candidateId: 'edu7', value: 1 },
                isRead: false
            },
            {
                id: 'edu_ae4',
                candidateId: 'edu10',
                jobId: 'educator',
                triggerPhase: 'interviews',
                type: 'question_email',
                sender: 'Chaos Karsten',
                subject: 'Hab den Termin vergessen – tut mir leid',
                body: 'Hey,\n\noh Gott, ich hab den Interviewtermin komplett vergessen. Können wir das nächste Woche nachholen? Ich hatte gerade so einen Flow beim Malen...\n\nSorry,\nKarsten',
                isRead: false
            },
            {
                id: 'edu_ae5',
                candidateId: 'edu6',
                jobId: 'educator',
                triggerPhase: 'decision',
                type: 'withdrawal',
                sender: 'Business Boris',
                subject: 'Absage meinerseits',
                body: 'Sehr geehrte Damen und Herren,\n\nnachdem ich keine Antwort auf mein Gehaltsangebot erhalten habe, gehe ich davon aus, dass wir keine gemeinsame Basis finden. Ich habe inzwischen ein besseres Angebot angenommen.\n\nMit freundlichen Grüßen,\nBoris Schreiber, MBA',
                effect: { type: 'candidate_lost', candidateId: 'edu6' },
                isRead: false
            }
        ]
    }
];
