import type { Message } from '../types';

export const messages: Message[] = [
    // Screening Phase
    {
        id: 'm1',
        sender: 'CEO',
        role: 'CEO',
        content: "Team, we need this role filled efficiently. The board is watching our headcount/output ratio carefully. Don't just hire the most expensive person.",
        triggerPhase: 'screening',
        isRead: false
    },
    {
        id: 'm2',
        sender: 'Sarah (HR)',
        role: 'HR Director',
        content: "Heads up: The approved budget is strictly $120k base. We can stretch to $130k for a unicorn, but try to stay under.",
        triggerPhase: 'screening',
        isRead: false
    },

    // Interview Phase
    {
        id: 'm3',
        sender: 'CEO',
        role: 'CEO',
        content: "Hey, my nephew Brett Johnson applied. I'm not saying you HAVE to hire him, but at least give him a fair shake. He's a good kid.",
        triggerPhase: 'interviews',
        effect: {
            type: 'force_interview',
            value: 'c12' // Brett's ID
        },
        isRead: false
    },
    {
        id: 'm4',
        sender: 'Marcus (CFO)',
        role: 'CFO',
        content: "Bad news. Q3 projections are down. We need to cut the hiring budget for this role by $15k. New max is $105k firm.",
        triggerPhase: 'interviews',
        effect: {
            type: 'budget_cut',
            value: 15000
        },
        isRead: false
    },
    {
        id: 'm5',
        sender: 'Team Lead',
        role: 'Product Lead',
        content: "We're drowning in data requests. Please prioritize someone with SQL or Python skills. The last manager couldn't open a CSV.",
        triggerPhase: 'interviews',
        isRead: false
    },

    // Decision Phase
    {
        id: 'm6',
        sender: 'CEO',
        role: 'CEO',
        content: "I need a decision by EOD today. Just pick the best athlete and let's move.",
        triggerPhase: 'decision',
        effect: {
            type: 'urgency_increase',
            value: 100
        },
        isRead: false
    },
    {
        id: 'm7',
        sender: 'Recruiter',
        role: 'Recruiting',
        content: "Just heard that Candidate 1 (Alexandra) has another offer on the table. We need to decide NOW or she walks.",
        triggerPhase: 'decision',
        isRead: false
    }
];
