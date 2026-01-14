"use client";

import React from 'react';
import { motion } from "framer-motion";

// --- Data ---
// Adapted to TeenSkool context
const testimonials = [
    {
        text: "This was the most fun I've had in a class all year. I loved creating with AI and pitching my startup idea!",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Priya Sharma",
        role: "Student, Kendriya Vidyalaya",
    },
    {
        text: "I had no idea AI could be this exciting. I feel more confident and creative now.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Aarav Mehta",
        role: "Student, Delhi Public School",
    },
    {
        text: "Our team learned teamwork, pitching, and design in just a few hours. We even made our logo using AI!",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Saanvi Kapoor",
        role: "Student, Bal Bharti Public School",
    },
    {
        text: "The mentor feedback was incredible. It felt like a real startup accelerator but for teens.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Omar Raza",
        role: "Aspiring Founder",
    },
    {
        text: "I never thought I could build a website without coding. This workshop changed my mindset completely.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Zainab Hussain",
        role: "Grade 11 Student",
    },
    {
        text: "The tools we learned are so useful. I'm already using them for my school projects.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Aliza Khan",
        role: "Future Innovator",
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(0, 3); // Reuse for density if needed

// --- Sub-Components ---
const TestimonialsColumn = (props) => {
    return (
        <div className={props.className}>
            <motion.ul
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <motion.li
                                    key={`${index}-${i}`}
                                    whileHover={{
                                        scale: 1.03,
                                        y: -8,
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                                        transition: { type: "spring", stiffness: 400, damping: 17 }
                                    }}
                                    className="p-10 rounded-3xl border border-border bg-surface/80 backdrop-blur-sm shadow-sm max-w-xs w-full transition-all duration-300 cursor-default select-none group"
                                >
                                    <blockquote className="m-0 p-0">
                                        <p className="text-muted-foreground leading-relaxed font-normal m-0 transition-colors duration-300">
                                            "{text}"
                                        </p>
                                        <footer className="flex items-center gap-3 mt-6">
                                            <img
                                                width={40}
                                                height={40}
                                                src={image}
                                                alt={`Avatar of ${name}`}
                                                className="h-10 w-10 rounded-full object-cover ring-2 ring-border group-hover:ring-primary/30 transition-all duration-300 ease-in-out"
                                            />
                                            <div className="flex flex-col">
                                                <cite className="font-semibold not-italic tracking-tight leading-5 text-foreground transition-colors duration-300">
                                                    {name}
                                                </cite>
                                                <span className="text-sm leading-5 tracking-tight text-muted-foreground mt-0.5 transition-colors duration-300">
                                                    {role}
                                                </span>
                                            </div>
                                        </footer>
                                    </blockquote>
                                </motion.li>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.ul>
        </div>
    );
};

export function Testimonial() {
    return (
        <section
            aria-labelledby="testimonials-heading"
            className="bg-transparent py-24 relative overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0, y: 50, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: 0.8 }
                }}
                className="container px-4 z-10 mx-auto"
            >
                <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16">
                    <div className="flex justify-center">
                        <div className="border border-border py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-muted-foreground bg-surface transition-colors">
                            Testimonials
                        </div>
                    </div>

                    <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 text-center text-foreground transition-colors">
                        STUDENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">VOICES</span>
                    </h2>
                    <p className="text-center mt-5 text-muted-foreground text-lg leading-relaxed max-w-sm transition-colors">
                        Real feedback from young innovators who joined the bootcamp.
                    </p>
                </div>

                <div
                    className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
                    role="region"
                    aria-label="Scrolling Testimonials"
                >
                    <TestimonialsColumn testimonials={firstColumn} duration={25} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={28} />
                </div>
            </motion.div>
        </section>
    );
}
