// File: app/submit/page.jsx
"use client";

import React, { useState } from 'react';
import MotionDiv from '@/components/MotionDiv';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Send, Lightbulb, Database } from 'lucide-react';
import { submitIdea } from './actions'; // Import the new Server Action

// Assuming these are still needed for your form components
// import PersonalInfoForm from '@/components/submit/PersonalInfoForm';
// import SchoolInfoForm from '@/components/submit/SchoolInfoForm';
// import IdeaInfoForm from '@/components/submit/IdeaInfoForm';

export default function SubmitPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(event.currentTarget);
    const result = await submitIdea(formData); // Call the Server Action

    setIsSubmitting(false);

    if (result?.error) {
      toast({
        title: "Submission Error",
        description: result.error,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Idea Submitted Successfully! 🎉",
        description: "Thank you! Your innovative idea has been securely saved."
      });
      event.target.reset(); // Reset the form
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <MotionDiv initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
            Submit Your Big Idea
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Share your innovative business concept and join the community of young entrepreneurs.
          </p>
        </MotionDiv>

        <MotionDiv initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Submission Form</CardTitle>
              <CardDescription className="text-slate-400">Fill out all the details about your project.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* NOTE: I am placing a simplified form here. */}
              {/* You should replace this with your imported form components like: */}
              {/* <PersonalInfoForm />, <SchoolInfoForm />, etc. */}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                   <h3 className="text-lg font-semibold text-yellow-400">Personal Info</h3>
                   <input name="studentName" placeholder="Your Name" required className="w-full p-3 bg-slate-700 rounded-md border border-slate-600"/>
                   <input name="email" type="email" placeholder="Your Email" required className="w-full p-3 bg-slate-700 rounded-md border border-slate-600"/>
                   {/* ... add all other form fields from your components ... */}
                   <h3 className="text-lg font-semibold text-yellow-400 pt-4">Your Idea</h3>
                   <input name="ideaTitle" placeholder="Idea Title" required className="w-full p-3 bg-slate-700 rounded-md border border-slate-600"/>
                   <textarea name="description" placeholder="Describe your idea..." required className="w-full p-3 bg-slate-700 rounded-md border border-slate-600" rows={5}/>
                </div>

                <MotionDiv whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }} className="pt-6">
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-6 text-lg">
                    {isSubmitting ? (
                        <><Database className="h-5 w-5 mr-2 animate-spin" /> Submitting...</>
                    ) : (
                        <><Send className="h-5 w-5 mr-2" /> Submit My Idea</>
                    )}
                  </Button>
                </MotionDiv>
              </form>
            </CardContent>
          </Card>
        </MotionDiv>
      </div>
    </div>
  );
};