"use client";

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Send, Mail, Loader2 } from "lucide-react";

// Background grid animation
const GridPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px] animate-grid-scroll" />
);

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    toast({
      title: "Sending your message...",
      description: "Please wait while we deliver it.",
    });

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      setLoading(false);
      toast({
        title: "Configuration Error",
        description:
          "The email service is not set up correctly. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    try {
      await emailjs.sendForm(serviceID, templateID, form.current, publicKey);
      toast({
        title: "Message Sent ✅",
        description: "Thanks for reaching out. We'll get back to you shortly!",
      });
      event.target.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Error Sending Message",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <GridPattern />
      <div className="relative z-10 max-w-3xl mx-auto pt-32 pb-20 px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-primary/20 p-4 rounded-full mb-4">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Contact Us
          </h1>
          <p className="text-foreground/80 text-lg max-w-xl mx-auto mt-4">
            We’d love to hear from you — whether it’s questions, ideas, or
            collaboration opportunities!
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-surface border border-border rounded-2xl shadow-2xl shadow-black/20 p-8">
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground/90 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="from_name"
                  placeholder="e.g., Ada Lovelace"
                  className="w-full px-4 py-3 rounded-lg bg-background/70 border border-border placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground/90 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="from_email"
                  placeholder="e.g., ada.lovelace@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-background/70 border border-border placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground/90 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Your message here..."
                  className="w-full px-4 py-3 rounded-lg bg-background/70 border border-border placeholder:text-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <motion.div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Send Message
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
