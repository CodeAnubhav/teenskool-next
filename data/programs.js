// programs.js
// Centralized data source for all TeenSkool programs

const programs = [
  {
    id: "ai-startup-masterclass",
    title: "AI Founder Launchpad",
    shortDescription: "Launch your AI startup in 4 simple steps: Idea, Brand, MVP, Pitch.",
    description: "The AI Founder Launchpad is your express ticket to becoming a founder. This intensive program guides you through a proven 4-step framework to research ideas, build a brand, launch an MVP, and create a winning pitch deck—all powered by AI tools.",

    // Core Data
    Image: "/assets/programimage.png",
    price: 4999,
    brochureLink: "/assets/brochure.pdf",
    duration: "4-Module Self-Paced Program",
    nextBatch: "Instant Access",
    format: "Interactive AI-Guided Modules", // Kept for sidebar
    level: "Beginner", // Kept for sidebar

    // Key Features - Highly compressed (max 3 words each)
    features: [
      "Idea to Launch",
      "No-Code MVP",
      "AI Branding",
      "Investor Pitch"
    ],

    // What's Included - Focused on core deliverables
    includes: [
      "Full access to AI Founder OS",
      "Certificate of Young Founder",
      "30 Days Post-Launch Support",
      "Exclusive Community Access",
      "Lifetime Access to All Updates"
    ],

    // Core Strategy (Simplified from 'Methodology')
    strategy: {
      approach: "The 4-Step Launchpad", // Simplified
      philosophy: "Don't just learn about startups—build one. We focus on execution over theory.", // Simplified
      focusAreas: [
        "Rapid Validation",
        "Visual Identity",
        "No-Code Building",
        "Storytelling"
      ]
    },

    // Simplified Curriculum for Timeline
    curriculum: [
      { segment: 1, title: "Idea Research & Validation", timeframe: "Module 1", keyFocus: "Find a problem worth solving and use AI to validate market demand." },
      { segment: 2, title: "Branding & Marketing", timeframe: "Module 2", keyFocus: "Create a pro logo, color palette, and marketing strategy in minutes." },
      { segment: 3, title: "MVP Building", timeframe: "Module 3", keyFocus: "Launch a functional Minimum Viable Product using no-code tools." },
      { segment: 4, title: "Final Pitch Deck Building", timeframe: "Module 4", keyFocus: "Craft a slide deck that tells your story and attracts investors." }
    ],

    // Learning Outcomes - Renamed to key results
    keyResults: [
      "Master the process of building with AI",
      "Validate profitable business ideas",
      "Design a professional brand identity",
      "Build a functional website without coding",
      "Develop a pitch deck ready for investors",
      "Use AI tools for everyday business tasks"
    ],

    // AI Tools used - Ready for logo display
    toolsUsed: [
      { name: "ChatGPT", logo: "/assets/tools/chatgpt.png" },
      { name: "Claude", logo: "/assets/tools/claude.png" },
      { name: "Gemini", logo: "/assets/tools/gemini.png" },
      { name: "perplexity", logo: "/assets/tools/perplexity.png" },
      { name: "MidJourney", logo: "/assets/tools/midj.png" },
      { name: "Gamma", logo: "/assets/tools/gamma.png" },
      { name: "Durable", logo: "/assets/tools/durable.png" },
    ],

    // Support simplified to a single object
    support: {
      duration: "90 days",
      includes: [
        "Email support for implementation questions",
        "Monthly group office hours sessions",
        "Private alumni community access",
      ]
    }
  }
];

export default programs;