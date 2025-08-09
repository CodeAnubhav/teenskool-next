// File: app/submit/actions.js
"use server";

import { createClient } from '@supabase/supabase-js';

export async function submitIdea(formData) {
  // Securely get Supabase credentials from environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use the secret key on the server

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase environment variables are not set!");
    return { error: "Server configuration error." };
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  // 1. Create the submission data object from the form data
  const submissionData = {
    student_name: formData.get('studentName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    age: parseInt(formData.get('age'), 10),
    grade: formData.get('grade'),
    school_name: formData.get('schoolName'),
    city: formData.get('city'),
    state: formData.get('state'),
    idea_title: formData.get('ideaTitle'),
    category: formData.get('category'),
    description: formData.get('description'),
    status: 'pending',
  };

  // 2. Validate the data on the server
  const requiredFields = ['student_name', 'email', 'age', 'school_name', 'city', 'state', 'idea_title', 'category', 'description'];
  const missingFields = requiredFields.filter(field => !submissionData[field]);

  if (missingFields.length > 0) {
    return { error: `Missing required fields: ${missingFields.join(', ')}` };
  }

  // 3. Insert the data into the database
  try {
    const { error } = await supabase.from('idea_submissions').insert([submissionData]);
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Error submitting to Supabase:", error);
    return { error: "Database submission failed. " + error.message };
  }
}