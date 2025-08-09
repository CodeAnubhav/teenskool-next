// This file serves as the central data source for all educational programs.
// Using a centralized file like this makes it easy to update program details
// across the entire website without editing individual components.

const programs = [
  {
    id: "1",
    title: "AI for Entrepreneurs Bootcamp",
    shortDescription: "Launch your first AI-powered startup idea in just one day. No coding required.",
    description: "A comprehensive bootcamp designed to empower students with the skills to conceptualize, build, and pitch their own AI-powered startups. This hands-on program covers everything from idea generation using ChatGPT to creating visual assets with DALL-E and presenting a compelling business case.",
    price: 4999,
    image: "https://placehold.co/1200x600/fde047/1e293b?text=AI+Bootcamp",
    nextBatch: "August 15, 2024",
    duration: "1-Day Workshop",
    curriculum: "NEP 2020 Aligned",
    features: ["ChatGPT", "DALL-E", "Canva AI"], // For the home page cards
    includes: [
        "Live mentorship from IIT/IIM alumni",
        "Hands-on experience with ChatGPT, DALL-E, and Canva",
        "Interactive group brainstorming sessions",
        "Shark Tank-style pitch practice",
        "Certificate of Completion",
        "Access to an exclusive community of innovators",
    ]
  },
  {
    id: "2",
    title: "Web Development Mastery",
    shortDescription: "Build and deploy modern, responsive websites from scratch.",
    description: "Dive deep into the world of web development. This course covers the essentials of HTML, CSS, and JavaScript, and then moves on to advanced topics using React and Tailwind CSS. You'll build several projects, including a fully functional portfolio website.",
    price: 7999,
    image: "https://placehold.co/1200x600/a78bfa/1e293b?text=Web+Mastery",
    nextBatch: "September 1, 2024",
    duration: "4-Week Course",
    curriculum: "Project-Based Learning",
    features: ["React", "Tailwind CSS", "Firebase"],
    includes: [
        "20+ hours of live, interactive classes",
        "Build and deploy 3 real-world projects",
        "Personalized code reviews and feedback",
        "Career guidance and portfolio building session",
        "Lifetime access to course materials",
        "Official Certificate of Mastery",
    ]
  },
  {
    id: "3  ",
    title: "Digital Marketing Pro",
    shortDescription: "Learn to grow any business with cutting-edge marketing strategies.",
    description: "This program covers the A-Z of digital marketing. You will learn about Search Engine Optimization (SEO), Social Media Marketing (SMM), content creation, and data analytics to make informed decisions that drive growth for any business.",
    price: 3999,
    image: "https://placehold.co/1200x600/60a5fa/1e293b?text=Marketing+Pro",
    nextBatch: "August 20, 2024",
    duration: "2-Week Intensive",
    curriculum: "Industry Aligned",
    features: ["SEO", "Social Media", "Analytics"],
    includes: [
        "Mastering Google Analytics 4",
        "Running successful social media campaigns",
        "Content strategy and creation workshops",
        "Building a professional digital marketing portfolio",
        "Live Q&A sessions with industry experts",
        "Certificate in Digital Marketing",
    ]
  }
];

export default programs;
