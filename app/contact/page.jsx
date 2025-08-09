// File: app/contact/page.jsx
"use client";

import React, { useState } from 'react';
import MotionDiv from '@/components/ui/MotionDiv'; // Use our reusable animation component
import { useToast } from '@/components/ui/use-toast';
import { Send, Mail, User, Loader2 } from 'lucide-react';
import { sendEmail } from './actions'; // Import the new Server Action

const GridPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
);

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await sendEmail(formData); // Call the Server Action

    setLoading(false);

    if (result?.error) {
      toast({
        title: 'Error Sending Message',
        description: result.error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Message Sent Successfully!',
        description: 'Thank you for reaching out. We’ll get back to you shortly.',
      });
      event.target.reset(); // Reset the form fields
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative">
      <GridPattern />
      <div className="relative z-10 max-w-3xl mx-auto pt-32 pb-20 px-6">
        <MotionDiv initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <div className="inline-block bg-yellow-400/20 p-4 rounded-full mb-4">
            <Mail className="h-12 w-12 text-yellow-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Contact Us</h1>
          <p className="text-slate-600 text-lg max-w-xl mx-auto mt-4">
            We’d love to hear from you — whether it's questions, ideas, or collaboration opportunities!
          </p>
        </MotionDiv>

        <MotionDiv initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input type="text" id="name" name="name" placeholder="e.g., Ada Lovelace" className="w-full px-4 py-3 rounded-lg bg-slate-100 border border-slate-200" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" id="email" name="email" placeholder="e.g., ada.lovelace@example.com" className="w-full px-4 py-3 rounded-lg bg-slate-100 border border-slate-200" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea id="message" name="message" rows="4" placeholder="Your message here..." className="w-full px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 resize-none" required />
              </div>
              <MotionDiv whileTap={{ scale: 0.98 }}>
                <button type="submit" className="w-full flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-lg" disabled={loading}>
                  {loading ? (<><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>) : (<><Send className="w-5 h-5" /> Send Message</>)}
                </button>
              </MotionDiv>
            </form>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}