// lib/gamification.js

// 1. GAME ROLES TABLE
export const GAME_ROLES = [
    {
        id: "role_novice",
        name: "Novice",
        min_xp: 0,
        badge: "🌱",
        color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        description: "Just starting your journey. Exploring ideas.",
        order_index: 0
    },
    {
        id: "role_founder",
        name: "Founder",
        min_xp: 1000,
        badge: "🚀",
        color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        description: "Building your MVP. Validating problem statements.",
        order_index: 1
    },
    {
        id: "role_visionary",
        name: "Visionary",
        min_xp: 5000,
        badge: "🔮",
        color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
        description: "Scaling up. Leading teams and securing users.",
        order_index: 2
    },
    {
        id: "role_unicorn",
        name: "Unicorn",
        min_xp: 20000,
        badge: "🦄",
        color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
        description: "Market leader. Changing the world.",
        order_index: 3
    }
];

// 2. XP RULES TABLE
export const XP_RULES = {
    LESSON_COMPLETE: 100,
    QUIZ_PASS: 200,
    COURSE_COMPLETE: 1000,
    ONBOARDING_COMPLETE: 500,
};

// 3. ONBOARDING QUIZ
export const ONBOARDING_QUIZ = [
    {
        id: "q1",
        question: "What is the very first step in building a startup?",
        options: [
            "Building a website",
            "Identifying a Problem to Solve",
            "Hiring employees",
            "Raising money from investors"
        ],
        correct_index: 1,
        points: 100
    },
    {
        id: "q2",
        question: "Which AI tool creates images from text?",
        options: [
            "A) ChatGPT",
            "B) DALL·E / Midjourney",
            "C) Excel",
            "D) Google Maps"
        ],
        correct_index: 1,
        points: 100
    },
    {
        id: "q3",
        question: "What does 'MVP' stand for in startup terms?",
        options: [
            "Most Valuable Player",
            "Minimum Viable Product",
            "Maximum Viral Potential",
            "Money Vs Product"
        ],
        correct_index: 1,
        points: 100
    },
    {
        id: "q4",
        question: "A 'Pitch Deck' is used primarily to...",
        options: [
            "Play cards with employees",
            "Showcase your idea to investors/customers",
            "Design a logo",
            "Track expenses"
        ],
        correct_index: 1,
        points: 100
    },
    {
        id: "q5",
        question: "True or False: You need to know coding to build a tech startup today.",
        options: [
            "True, coding is mandatory.",
            "False, No-Code/AI tools make it possible for anyone."
        ],
        correct_index: 1,
        points: 100
    }
];

// Helpers
export const getGameRoleById = (id) => GAME_ROLES.find(r => r.id === id) || GAME_ROLES[0];

export const getLevelProgress = (xp) => {
    const currentRole = GAME_ROLES.slice().reverse().find(r => xp >= r.min_xp) || GAME_ROLES[0];
    const currentIndex = currentRole.order_index;
    const nextRole = GAME_ROLES[currentIndex + 1];

    if (!nextRole) return { progress: 100, next_xp: xp };

    const prev_xp_boundary = currentRole.min_xp;
    const next_xp_boundary = nextRole.min_xp;

    const progress = ((xp - prev_xp_boundary) / (next_xp_boundary - prev_xp_boundary)) * 100;

    return {
        progress: Math.min(100, Math.max(0, progress)),
        current_role: currentRole,
        next_role: nextRole,
        xp_needed: next_xp_boundary - xp
    };
};
