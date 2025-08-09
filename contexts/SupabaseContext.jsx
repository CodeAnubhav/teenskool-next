// File: contexts/SupabaseContext.jsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Create the context
const SupabaseContext = createContext(null);

// Create the provider component
export const SupabaseProvider = ({ children }) => {
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    // These should be in your environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const client = createClient(supabaseUrl, supabaseKey);
      setSupabase(client);
    } else {
      console.warn("Supabase URL or Key is missing. Check your .env.local file.");
    }
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

// Create a custom hook to use the context
export const useSupabase = () => {
  return useContext(SupabaseContext);
};