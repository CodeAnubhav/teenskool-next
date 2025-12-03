// programs.js
// Centralized data source for all TeenSkool programs

const programs = [
  {
    id: "ai-startup-masterclass",
    title: "AI Startup Masterclass",
    shortDescription: "Launch your first business idea in 3 hours using only AI tools.",
    description: "This is a super-fast, hands-on workshop designed for new founders. You will learn the ultimate AI-First strategy to build a complete business prototype including a validated idea, brand, website, and investor pitch all in one single 3 hour session without writing a single line of code.",
    
    // Core Data
    Image: "/assets/programimage.png",
    price: 1999,
    duration: "3 Hours Live Workshop",
    nextBatch: "December 1, 2025",
    format: "Live Interactive Session", // Kept for sidebar
    level: "Beginner to Intermediate", // Kept for sidebar
    
    // Key Features - Highly compressed (max 3 words each)
    features: [
      "Idea to Prototype",
      "Zero Code", 
      "AI Automation",
      "Pitch Deck Ready"
    ],

    // What's Included - Focused on core deliverables
    includes: [
      "3 hours intensive hands-on training",
      "Functional startup prototype (live assets)",
      "Lifetime resource access & templates",
      "Professional certificate of completion",
      "90-day implementation support",
    ],

    // Core Strategy (Simplified from 'Methodology')
    strategy: {
      approach: "The AI-First Fast-Build Plan", // Simplified
      philosophy: "Get maximum results with minimum effort by focusing entirely on smart AI tools.", // Simplified
      focusAreas: [
        "Rapid Automation",
        "Zero Code Development", 
        "Data Driven Validation",
        "Professinal Branding"
      ]
    },

    // Simplified Curriculum for Timeline
    curriculum: [
      { segment: 1, title: "Mindset & Setup", timeframe: "0:00 - 0:22", keyFocus: "Learn the rules of building fast with AI and set up your tools." },
      { segment: 2, title: "Idea Validation", timeframe: "0:22 - 0:45", keyFocus: "Quickly check if your idea will make money and who your customer is." },
      { segment: 3, title: "Branding & Assets", timeframe: "0:45 - 1:10", keyFocus: "Create a unique logo, slogan, and visual style using AI." },
      { segment: 4, title: "Website Deployment", timeframe: "1:10 - 1:35", keyFocus: "Launch a live, mobile-friendly website in minutes." },
      { segment: 5, title: "Content Strategy", timeframe: "1:35 - 2:00", keyFocus: "Build a 30-day social media plan and make a promo video." },
      { segment: 6, title: "Pitch Deck Creation", timeframe: "2:00 - 2:25", keyFocus: "Create a professional presentation ready for investors." },
      { segment: 7, title: "Final Demo & Plan", timeframe: "2:25 - 3:00", keyFocus: "Show your finished prototype and plan your next 90 days." }
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