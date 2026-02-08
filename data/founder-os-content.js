// data/founder-os-content.js

export const MODULE_CONTENT = {
    "idea-research": {
        title: "Idea Research & Validation",
        tips: "Don't build until you sell. Use these prompts to find a problem worth solving and validate it with real data.",
        prompts: [
            {
                label: "Find a Problem",
                text: "Act as a startup expert. Help me identify 3 burning problems in the [target industry/market] industry that people are actively paying to solve. Focus on B2B SaaS ideas."
            },
            {
                label: "Validate Demand",
                text: "I have an idea for [describe idea]. Create a 5-question survey to validate this problem with potential customers. Also, suggest 3 creative ways to find these customers online."
            },
            {
                label: "Competitor Analysis",
                text: "Who are the main competitors for [describe idea]? List 3 weaknesses in their current products that I could exploit to build a better solution."
            }
        ]
    },
    "branding-marketing": {
        title: "Branding & Marketing",
        tips: "Your brand is what people say about you when you're not in the room. Make it memorable.",
        prompts: [
            {
                label: "Generate Brand Names",
                text: "Suggest 10 catchy, one-word startup names for a [describe product]. The names should be modern, easy to spell, and have a tech vibe. Check for available .com domains if possible."
            },
            {
                label: "Create a Slogan",
                text: "Write 5 punchy slogans for [company name] that convey trust, speed, and innovation. Keep them under 5 words."
            },
            {
                label: "30-Day Content Plan",
                text: "Create a 30-day social media content calendar for launching [product]. Focus on LinkedIn and Twitter/X. Include post topics and hooks for each day."
            }
        ]
    },
    "mvp-building": {
        title: "MVP Building",
        tips: "If you're not embarrassed by the first version of your product, you've launched too late.",
        prompts: [
            {
                label: "MVP Feature List",
                text: "I am building an MVP for [product]. List the top 3 core features I MUST have to solve the user's problem. Mark everything else as 'Version 2'."
            },
            {
                label: "Landing Page Copy",
                text: "Write high-converting headline and subheadline for a landing page selling [product]. The goal is to get visitors to join a waitlist."
            },
            {
                label: "No-Code Stack",
                text: "Be a no-code architect. Recommend the best no-code tools stack (Frontend, Backend, Database) to build [product] quickly and cheaply."
            }
        ]
    },
    "pitch-deck": {
        title: "Final Pitch Deck",
        tips: "Investors invest in stories, not just stats. Tell a compelling narrative.",
        prompts: [
            {
                label: "Pitch Structure",
                text: "Outline a 10-slide pitch deck structure for [product]. Describe exactly what should go on each slide, from Problem to Ask."
            },
            {
                label: "The 'Why Now' Slide",
                text: "Help me write the 'Why Now' slide. Why is this the perfect time for [product] to exist? Consider current market trends and technology shifts."
            },
            {
                label: "Elevator Pitch",
                text: "Write a 30-second elevator pitch for [product] that I can say to an investor in a casual setting. Make it punchy and memorable."
            }
        ]
    }
};
