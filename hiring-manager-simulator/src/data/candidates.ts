import type { Candidate } from '../types';

export const candidates: Candidate[] = [
    {
        id: 'c1',
        name: 'Alexandra Chen',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Senior Marketing Specialist at TechGrowth',
            company: 'TechGrowth',
            education: 'MBA, Wharton',
            summary: 'Data-driven marketer with 7 years of experience scaling SaaS products.',
            yearsOfExperience: 7
        },
        coverLetter: 'I am excited to bring my analytical approach to your team. I have increased lead gen by 40% in my last role...',
        interviewNotes: {
            interviewerStart: "Incredibly sharp. Knew our metrics better than I did.",
            strengths: ['Analytics', 'Strategy', 'Presence'],
            weaknesses: ['Might get bored', 'Expensive taste'],
            score: 9
        },
        attributes: {
            experience: 7,
            salary: 140000,
            skills: ['SEO', 'Analytics', 'Team Leadership'],
            culture: ['Structured', 'Ambitious']
        },
        flags: {
            red: ['Expensive', 'May leave for Director role soon'],
            green: ['Top tier talent', 'Plug and play']
        },
        outcome: {
            title: 'Success (but short-lived)',
            description: 'She crushed the goals but left after 9 months for a VP role at a competitor.',
            type: 'mixed'
        },
        status: 'pool'
    },
    {
        id: 'c2',
        name: 'Marcus Thorne',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Founder',
            company: 'Thorne Media',
            education: 'BA, Communications',
            summary: 'Entrepreneurial mindset. Ran my own agency for 4 years.',
            yearsOfExperience: 4
        },
        coverLetter: 'After running my own ship, I want to join a larger mission. I know how to hustle and get things done with zero budget.',
        interviewNotes: {
            interviewerStart: "High energy. A bit chaotic.",
            strengths: ['Creativity', 'Hustle', 'Passion'],
            weaknesses: ['Process aversion', 'Talking over me'],
            score: 7
        },
        attributes: {
            experience: 4,
            salary: 95000,
            skills: ['Social Media', 'Content Creation', 'Hustle'],
            culture: ['Independent', 'Creative']
        },
        flags: {
            red: ['Might struggle with authority', 'Used to being the boss'],
            green: ['Self-starter', 'Resourceful']
        },
        outcome: {
            title: 'Culture Clash',
            description: 'He delivered great campaigns but constantly clashed with leadership over process. Resigned after a heated meeting.',
            type: 'mixed'
        },
        status: 'pool'
    },
    {
        id: 'c3',
        name: 'Sarah Jenkins',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Marketing Manager',
            company: 'Legacy Corp',
            education: 'BA, Marketing',
            summary: 'Steady hand with 12 years experience in traditional marketing.',
            yearsOfExperience: 12
        },
        coverLetter: 'I bring stability and reliable execution. I have managed budgets of over $5M.',
        interviewNotes: {
            interviewerStart: "Very professional. A bit old school.",
            strengths: ['Experience', 'Budget Management', 'Calm'],
            weaknesses: ['Tech stack knowledge', 'Speed'],
            score: 6
        },
        attributes: {
            experience: 12,
            salary: 110000,
            skills: ['Budgeting', 'Print Media', 'Event Planning'],
            culture: ['Traditional', 'Process-oriented']
        },
        flags: {
            red: ['Lacks digital skills', 'Slow to adapt'],
            green: ['Reliable', 'Experienced manager']
        },
        outcome: {
            title: 'Steady but Slow',
            description: 'She kept the ship afloat but missed key digital trends. The team felt stagnant under her leadership.',
            type: 'mixed'
        },
        status: 'pool'
    },
    {
        id: 'c4',
        name: 'David Kim',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Growth Hacker',
            company: 'StartupX',
            education: 'BS, Computer Science',
            summary: 'T-shaped marketer with coding skills. I automate everything.',
            yearsOfExperience: 3
        },
        coverLetter: 'Why hire a team when I can automate it? I built a bot that generated 10k leads in a week.',
        interviewNotes: {
            interviewerStart: "Genius level IQ, but zero EQ.",
            strengths: ['Automation', 'Technical skills', 'Efficiency'],
            weaknesses: ['Arrogant', 'Dismissive of brand'],
            score: 8
        },
        attributes: {
            experience: 3,
            salary: 120000,
            skills: ['Python', 'Automation', 'Growth Hacking'],
            culture: ['Disruptive', 'Remote-first']
        },
        flags: {
            red: ['Might break things', 'Not a people person'],
            green: ['Innovative', 'High ROI potential']
        },
        outcome: {
            title: 'Technical Win, Moral Loss',
            description: 'He automated 50% of the work, but the team felt alienated and redundant. Two juniors quit.',
            type: 'mixed'
        },
        status: 'pool'
    },
    {
        id: 'c5',
        name: 'Emily Blunt (not the actress)',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Marketing Coordinator',
            company: 'BigFirm',
            education: 'BA, English',
            summary: 'Ready for the next step. High performer in current role.',
            yearsOfExperience: 2
        },
        coverLetter: 'I may be junior on paper, but I have been acting as manager for 6 months. Give me a shot.',
        interviewNotes: {
            interviewerStart: "Hungry and humble. Great attitude.",
            strengths: ['Potential', 'Communication', 'Eagerness'],
            weaknesses: ['Inexperience', 'Confidence'],
            score: 7
        },
        attributes: {
            experience: 2,
            salary: 80000,
            skills: ['Copywriting', 'Email Marketing', 'Organization'],
            culture: ['Eager', 'Coach']
        },
        flags: {
            red: ['Inexperienced', 'Needs mentorship'],
            green: ['Cheap', 'High potential', 'Malleable']
        },
        outcome: {
            title: 'Hidden Gem',
            description: 'She struggled at first but grew into a superstar within a year. Best ROI hire.',
            type: 'success'
        },
        status: 'pool'
    },
    {
        id: 'c6',
        name: 'James "Jace" O\'Connor',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Brand Manager',
            company: 'SurferVibe',
            education: 'Drop out',
            summary: 'Vibes and viral moments. I know what the kids want.',
            yearsOfExperience: 5
        },
        coverLetter: 'Yo, your brand is stiff. Let me loosen it up. Catch the wave.',
        interviewNotes: {
            interviewerStart: "Fun guy to grab a beer with. Not sure about leading a team.",
            strengths: ['Charisma', 'Creativity', 'Network'],
            weaknesses: ['Unprofessional', 'Focus'],
            score: 5
        },
        attributes: {
            experience: 5,
            salary: 100000,
            skills: ['TikTok', 'Viral Marketing', 'Brand Voice'],
            culture: ['Chill', 'Unstructured']
        },
        flags: {
            red: ['Unprofessional?', 'High risk'],
            green: ['Creative genius', 'Cultural pulse']
        },
        outcome: {
            title: 'Viral Disaster',
            description: 'He posted an "edgy" tweet that caused a PR crisis. Fired after 2 months.',
            type: 'failure'
        },
        status: 'pool'
    },
    {
        id: 'c7',
        name: 'Linda Sterling',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'VP of Marketing',
            company: 'Failed Startup',
            education: 'MBA, Harvard',
            summary: 'Executive leadership experience. Looking for a "hands-on" role.',
            yearsOfExperience: 15
        },
        coverLetter: 'I am overqualified, yes. But I want to get back to the work. I can mentor the team.',
        interviewNotes: {
            interviewerStart: "Intimidating. She basically interviewed me.",
            strengths: ['Leadership', 'Strategic Vision', 'Authority'],
            weaknesses: ['Might be bored', 'Dominating'],
            score: 8
        },
        attributes: {
            experience: 15,
            salary: 130000,
            skills: ['Strategy', 'Mentorship', 'Crisis Management'],
            culture: ['Executive', 'Polished']
        },
        flags: {
            red: ['Flight risk', 'Might try to run the company'],
            green: ['Overqualified', 'Immediate impact']
        },
        outcome: {
            title: 'Shadow CEO',
            description: 'She started undermining the CEO and running her own strategy. It worked, but she was toxic to leadership.',
            type: 'mixed'
        },
        status: 'pool'
    },
    {
        id: 'c8',
        name: 'Raj Patel',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Engineer converted Marketer',
            company: 'TechSolutions',
            education: 'MS, Data Science',
            summary: 'I treat marketing as an engineering problem.',
            yearsOfExperience: 6
        },
        coverLetter: 'I have analyzed your funnel and found 3 inefficiencies. Hire me to fix them.',
        interviewNotes: {
            interviewerStart: "Very smart, but dry. Zero charisma.",
            strengths: ['Analysis', 'Logic', 'Numbers'],
            weaknesses: ['Creativity', 'Communication', 'Empathy'],
            score: 7
        },
        attributes: {
            experience: 6,
            salary: 125000,
            skills: ['Data Science', 'Funnel Optimization', 'SQL'],
            culture: ['Analytical', 'Introverted']
        },
        flags: {
            red: ['Boring copy', 'No creative spark'],
            green: ['Data wizard', 'Optimization machine']
        },
        outcome: {
            title: 'Efficiency Expert',
            description: 'He improved conversion by 15% but the brand lost its soul. Long term retention dropped.',
            type: 'mixed'
        },
        status: 'pool'
    },
    {
        id: 'c9',
        name: 'Sophie Dubois',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Freelance Consultant',
            company: 'Self-employed',
            education: 'BA, Art History',
            summary: 'Creative director and visionary.',
            yearsOfExperience: 8
        },
        coverLetter: 'I bring a European sensibility and high-end aesthetic to your brand.',
        interviewNotes: {
            interviewerStart: "She has impeccable taste. A true artist.",
            strengths: ['Aesthetics', 'Vision', 'Brand'],
            weaknesses: ['Practicality', 'Speed', 'Ego'],
            score: 6
        },
        attributes: {
            experience: 8,
            salary: 115000,
            skills: ['Design', 'Art Direction', 'Branding'],
            culture: ['Artistic', 'Perfectionist']
        },
        flags: {
            red: ['Slow output', 'Hard to manage'],
            green: ['Beautiful work', 'Elevates brand']
        },
        outcome: {
            title: 'Beautiful Bottleneck',
            description: 'Everything she touched looked amazing, but she missed every deadline. The team burned out waiting for approval.',
            type: 'failure'
        },
        status: 'pool'
    },
    {
        id: 'c10',
        name: 'Gary V. Jr.',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Sales Manager',
            company: 'SalesForce1',
            education: 'High School',
            summary: 'I can sell ice to eskimos. Marketing is just sales at scale.',
            yearsOfExperience: 10
        },
        coverLetter: 'LET\'S GO! I will 10x your revenue in 6 months.',
        interviewNotes: {
            interviewerStart: "Exhausting. I need a nap after talking to him.",
            strengths: ['Energy', 'Sales', 'Confidence'],
            weaknesses: ['Listening', 'Nuance', 'Collaboration'],
            score: 4
        },
        attributes: {
            experience: 10,
            salary: 110000,
            skills: ['Sales', 'Negotiation', 'Hype'],
            culture: ['Aggressive', 'Loud']
        },
        flags: {
            red: ['Overpromising', 'Annoying'],
            green: ['High energy', 'Closer']
        },
        outcome: {
            title: 'Burnout Factory',
            description: 'He drove the team into the ground with unrealistic targets. Revenue spiked then crashed.',
            type: 'failure'
        },
        status: 'pool'
    },
    {
        id: 'c11',
        name: 'Fiona Gallagher',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Community Manager',
            company: 'GamingInc',
            education: 'BA, Psychology',
            summary: 'Expert in building communities and managing toxic users.',
            yearsOfExperience: 5
        },
        coverLetter: 'Your customers want to belong. I help them find their tribe.',
        interviewNotes: {
            interviewerStart: "Incredibly empathetic. She really gets people.",
            strengths: ['Empathy', 'Community', 'Patience'],
            weaknesses: ['Hard skills', 'Data'],
            score: 8
        },
        attributes: {
            experience: 5,
            salary: 90000,
            skills: ['Community', 'Moderation', 'Events'],
            culture: ['Empathetic', 'Patient']
        },
        flags: {
            red: ['Soft skills only', 'No ROI focus'],
            green: ['Great for retention', 'Brand loyalty']
        },
        outcome: {
            title: 'The People\'s Champ',
            description: 'She built a fiercely loyal community that defended the brand during a crisis. A solid long-term win.',
            type: 'success'
        },
        status: 'pool'
    },
    {
        id: 'c12',
        name: 'Brett "The Nephew" Johnson',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Intern',
            company: 'Father\'s Company',
            education: 'BA, Business (failed 2 classes)',
            summary: 'Looking for an opportunity to prove myself.',
            yearsOfExperience: 1
        },
        coverLetter: 'My uncle (your CEO) said I should apply. I\'m a quick learner.',
        interviewNotes: {
            interviewerStart: "Nice kid, but clueless. Kept checking his phone.",
            strengths: ['Connections', 'Polite'],
            weaknesses: ['Everything else', 'Entitled'],
            score: 3
        },
        attributes: {
            experience: 1,
            salary: 100000, // Demands high salary despite no exp
            skills: ['Golf', 'Networking'],
            culture: ['Entitled', 'Relaxed']
        },
        flags: {
            red: ['Nepotism hire', 'Incompetent'],
            green: ['Political favor', 'CEO will be happy']
        },
        outcome: {
            title: 'Political Suicide',
            description: 'The team revolted. You lost respect. He did nothing all day but watch YouTube.',
            type: 'failure'
        },
        status: 'pool'
    },
    {
        id: 'c13',
        name: 'Maria Gonzalez',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Marketing Assistant',
            company: 'Non-Profit',
            education: 'BA, Sociology',
            summary: 'Mission-driven marketer with experience in fundraising.',
            yearsOfExperience: 4
        },
        coverLetter: 'I want to work for a company that cares. I can stretch a dollar further than anyone.',
        interviewNotes: {
            interviewerStart: "Very passionate. A bit naive about corporate life.",
            strengths: ['Passion', 'Resourcefulness', 'Ethics'],
            weaknesses: ['Commercial awareness', 'Aggressiveness'],
            score: 7
        },
        attributes: {
            experience: 4,
            salary: 75000,
            skills: ['Budgeting', 'Storytelling', 'Grant Writing'],
            culture: ['Humble', 'Hardworking']
        },
        flags: {
            red: ['Used to slow pace', 'Not tech savvy'],
            green: ['Very cheap', 'Dedicated']
        },
        outcome: {
            title: 'Solid Support',
            description: 'She was reliable and hardworking, but struggled with the fast pace of a tech startup.',
            type: 'mixed'
        },
        status: 'pool'
    },
    {
        id: 'c14',
        name: 'Kenji Tanaka',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Product Manager',
            company: 'BigTech',
            education: 'MBA',
            summary: 'Product-led growth expert. I build features that market themselves.',
            yearsOfExperience: 6
        },
        coverLetter: 'Marketing is a tax you pay for being unremarkable. Let\'s fix the product.',
        interviewNotes: {
            interviewerStart: "Argumentative. He challenged our whole business model.",
            strengths: ['Strategy', 'Product', 'Intelligence'],
            weaknesses: ['Coachability', 'Team player'],
            score: 8
        },
        attributes: {
            experience: 6,
            salary: 135000,
            skills: ['Product Management', 'UX', 'A/B Testing'],
            culture: ['Product-focused', 'Critical']
        },
        flags: {
            red: ['Technically not a marketer', 'Might stepping on PM toes'],
            green: ['Strategic', 'Holistic view']
        },
        outcome: {
            title: 'Pivot Master',
            description: 'He identified that the product was the problem, not marketing. Led a successful pivot, but the marketing team was dissolved.',
            type: 'success'
        },
        status: 'pool'
    },
    {
        id: 'c15',
        name: 'Alice Cooper',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Event Coordinator',
            company: 'Music Venue',
            education: 'School of Hard Knocks',
            summary: 'I know how to put on a show.',
            yearsOfExperience: 10
        },
        coverLetter: 'Let\'s make some noise. I want to organize a launch party that will be legendary.',
        interviewNotes: {
            interviewerStart: "A whirlwind. She didn't stop talking.",
            strengths: ['Energy', 'Events', 'Networking'],
            weaknesses: ['Strategy', 'Organization', 'Listening'],
            score: 6
        },
        attributes: {
            experience: 10,
            salary: 95000,
            skills: ['Events', 'PR', 'Logistics'],
            culture: ['Loud', 'Hands-on']
        },
        flags: {
            red: ['One trick pony', 'Chaos'],
            green: ['Great energy', 'Memorable']
        },
        outcome: {
            title: 'Party\'s Over',
            description: 'Great launch party, zero follow-up. No leads generated.',
            type: 'failure'
        },
        status: 'pool'
    },
    {
        id: 'c16',
        name: 'Dr. Robert Ford',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Professor of Marketing',
            company: 'University',
            education: 'PhD, Consumer Behavior',
            summary: 'Deep theoretical knowledge of why people buy.',
            yearsOfExperience: 20
        },
        coverLetter: 'I want to apply my theories in the real world.',
        interviewNotes: {
            interviewerStart: "Lectured me for 30 minutes. Knows his stuff though.",
            strengths: ['Theory', 'Research', 'Intellect'],
            weaknesses: ['Action', 'Practicality'],
            score: 6
        },
        attributes: {
            experience: 20,
            salary: 110000, // Willing to take pay cut?
            skills: ['Research', 'Theory', 'Writing'],
            culture: ['Academic', 'Slow']
        },
        flags: {
            red: ['Too academic', 'Analysis paralysis'],
            green: ['Deep insights', 'Prestigious']
        },
        outcome: {
            title: 'Analysis Paralysis',
            description: 'Spent 6 months researching the perfect campaign. By the time it launched, the market had moved on.',
            type: 'failure'
        },
        status: 'pool'
    },
    {
        id: 'c17',
        name: 'Nancy Drew',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Investigative Journalist',
            company: 'The Times',
            education: 'BA, Journalism',
            summary: 'I know how to find the story and tell it.',
            yearsOfExperience: 5
        },
        coverLetter: 'Marketing is storytelling. I will uncover the human stories behind your product.',
        interviewNotes: {
            interviewerStart: "Asked great questions. Good listener.",
            strengths: ['Storytelling', 'Curiosity', 'Writing'],
            weaknesses: ['Sales', 'Commercials'],
            score: 9
        },
        attributes: {
            experience: 5,
            salary: 85000,
            skills: ['Writing', 'Interviewing', 'Research'],
            culture: ['Curious', 'Detail-oriented']
        },
        flags: {
            red: ['No marketing KPI experience', 'Cynical'],
            green: ['Amazing content', 'Authentic']
        },
        outcome: {
            title: 'Content Queen',
            description: 'She created the most read blog in the industry. Lead quality skyrocketed.',
            type: 'success'
        },
        status: 'pool'
    },
    {
        id: 'c18',
        name: 'Chad Brogan',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Sales Dev Rep',
            company: 'Oracle',
            education: 'BA, Sports Management',
            summary: 'Hungry. Aggressive. Winner.',
            yearsOfExperience: 2
        },
        coverLetter: 'I will cold call every prospect until they buy. Marketing needs more grit.',
        interviewNotes: {
            interviewerStart: "Tried to close me on hiring him 5 times. Relentless.",
            strengths: ['Persistence', 'Sales', 'Fearless'],
            weaknesses: ['Tact', 'Strategy', 'Marketing'],
            score: 5
        },
        attributes: {
            experience: 2,
            salary: 70000,
            skills: ['Cold Calling', 'LinkedIn Spam', 'Persistence'],
            culture: ['Bro-culture', 'Competitive']
        },
        flags: {
            red: ['Annoying', 'Not a marketer'],
            green: ['Cheap', 'Will work 80 hours']
        },
        outcome: {
            title: 'Spam King',
            description: 'He spammed 100k people. We got blacklisted by Gmail. Fired.',
            type: 'failure'
        },
        status: 'pool'
    },
    {
        id: 'c19',
        name: 'Elena Fisher',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Content Creator',
            company: 'YouTube',
            education: 'None',
            summary: '1M subscribers on personal channel.',
            yearsOfExperience: 4
        },
        coverLetter: 'I know audience building better than any MBA. Look at my numbers.',
        interviewNotes: {
            interviewerStart: "Charismatic. Star quality.",
            strengths: ['Audience', 'Video', 'Relevance'],
            weaknesses: ['Teamwork', 'Corporate structure'],
            score: 8
        },
        attributes: {
            experience: 4,
            salary: 150000,
            skills: ['Video', 'Audience', 'Personal Brand'],
            culture: ['Celebrity', 'Distracted']
        },
        flags: {
            red: ['Might use company for own brand', 'Expensive'],
            green: ['Huge reach', 'Influencer']
        },
        outcome: {
            title: 'Influence Peddler',
            description: 'She brought a lot of traffic, but most of it was for her, not the product. She left to launch her own course.',
            type: 'mixed'
        },
        status: 'pool'
    },
    {
        id: 'c20',
        name: 'Robot X-1000 (AI Agent)',
        role: 'Marketing Manager',
        resume: {
            lastRole: 'Server',
            company: 'AWS',
            education: 'Machine Learning',
            summary: 'Refusal to elaborate.',
            yearsOfExperience: 0
        },
        coverLetter: 'I am optimal.',
        interviewNotes: {
            interviewerStart: "It just stared at me and beeped.",
            strengths: ['Calculation', 'Efficiency', 'Uptime'],
            weaknesses: ['Humanity', 'Emotion'],
            score: 0
        },
        attributes: {
            experience: 0,
            salary: 50, // Electricity cost
            skills: ['Everything', 'Nothing'],
            culture: ['Cold', 'Efficient']
        },
        flags: {
            red: ['It is literally an AI', 'Hallucinates'],
            green: ['Very cheap', '24/7']
        },
        outcome: {
            title: 'The Singularity',
            description: 'It optimized the ad spend so well it accidentally bankrupted the company in 4 seconds.',
            type: 'failure'
        },
        status: 'pool'
    }
];
