"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { sendMessage as sendMessageAction } from "./actions"; // Import your server action

export default function ChatPanel() {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm your Virtual Mentor. Ask me anything about startups, ideas, or growth." }
  ]);
  const [sending, setSending] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user ?? null);
    };
    init();
  }, []);

  useEffect(() => {
    // Auto-scroll on new messages
    scrollerRef.current?.scrollTo({ 
      top: scrollerRef.current.scrollHeight, 
      behavior: "smooth" 
    });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const q = input.trim();
    if (!q || sending) return;

    // Add user message immediately
    const userMessage = { role: "user", text: q };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setSending(true);

    try {
      // Call your server action
      const response = await sendMessageAction(q);
      
      // Add AI response
      const assistantMessage = { role: "assistant", text: response };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      const errorMessage = { 
        role: "assistant", 
        text: "Sorry, I encountered an error. Please try again." 
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[520px]">
      {/* Chat stream */}
      <div ref={scrollerRef} className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
              ${m.role === "user" 
                ? "ml-auto bg-slate-900 text-white" 
                : "bg-slate-100 text-slate-800"
              }`}
          >
            {m.text}
          </div>
        ))}
        {sending && (
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 rounded-2xl px-4 py-3 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            Thinking…
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder={user ? "Type your question…" : "Login to save chats (optional). Ask away!"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-4 md:px-5 py-3 font-semibold disabled:opacity-50"
          aria-label="Send"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}