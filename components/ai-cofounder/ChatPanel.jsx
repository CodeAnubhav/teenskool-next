"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Loader2, Copy, Check, User, Bot, Maximize2, X, Send } from "lucide-react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { sendMessage as sendMessageAction } from "./actions";
import dynamic from 'next/dynamic';

// Lazy Load the Heavy FormattedMessage Component
const FormattedMessage = dynamic(() => import('./FormattedMessage'), {
  loading: () => <div className="h-4 w-24 bg-white/5 animate-pulse rounded"></div>,
  ssr: false
});

// Full-screen chat modal
const FullScreenChat = ({ isOpen, onClose, messages, sending, sendMessage, input, setInput }) => {
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      scrollerRef.current?.scrollTo({
        top: scrollerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#050505] z-50 flex flex-col animate-in fade-in duration-200 text-white font-sans selection:bg-primary/30">

      {/* Glow Effect Background (Consistent Green Brand) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[60%] bg-primary/20 blur-[130px] rounded-full pointer-events-none" />
      {messages.length > 0 && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      )}

      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md z-20 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center ring-1 ring-inset ring-primary/30">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">AI Co-Founder</h2>
            <p className="text-sm text-white/50">Your strategic partner for building the next big thing.</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
          title="Close chat"
        >
          <X className="w-6 h-6 text-white/60" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollerRef} className="flex-1 overflow-y-auto p-6 space-y-6 z-10 relative pb-32">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-4 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role !== "user" && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium bg-[#1a1a1a] border border-white/10">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
              )}
              <div className={`flex-1 max-w-3xl rounded-2xl px-6 py-4 text-sm shadow-sm leading-relaxed ${m.role === "user" ? "bg-primary text-black font-medium" : "bg-[#161616] border border-white/5 text-gray-200"}`}>
                <FormattedMessage text={m.text} isUser={m.role === "user"} />
              </div>
              {m.role === "user" && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium bg-primary text-black">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {sending && (
            <div className="flex gap-4 fade-in duration-300">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium bg-[#1a1a1a] border border-white/10">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="inline-flex items-center gap-2.5 bg-[#161616] border border-white/5 rounded-2xl px-5 py-3 text-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                </div>
                <span className="text-white/40 font-medium text-xs uppercase tracking-wider">Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input - Floating Glass */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-30">
        <form onSubmit={sendMessage} className="relative group">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <input
            className="w-full rounded-full border border-white/10 bg-[#1a1a1a]/80 backdrop-blur-xl px-8 py-5 pr-16 text-base text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:bg-[#202020] transition-all shadow-2xl relative z-10"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={sending}
            autoFocus
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-black hover:scale-105 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed z-20"
            aria-label="Send"
          >
            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- PERSISTENT CHAT LAYOUT (Ruixen Style) ---
const ChatInterface = ({ messages, input, setInput, onSend, sending, isFullScreen, setIsFullScreen, user }) => {
  const prompts = [
    { label: "Validate my idea", icon: <Check className="w-4 h-4" /> },
    { label: "Create a pitch deck", icon: <Copy className="w-4 h-4" /> },
    { label: "Find target audience", icon: <User className="w-4 h-4" /> },
    { label: "Business Model Canvas", icon: <Maximize2 className="w-4 h-4" /> },
    { label: "Marketing strategy", icon: <ArrowUp className="w-4 h-4" /> }
  ];

  const scrollerRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo({
        top: scrollerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  // Dynamic Class for Input Container (Floating if active chat)
  const inputContainerClass = messages.length === 0
    ? "w-full max-w-3xl mx-auto p-6 relative z-20 mt-auto" // Bottom anchored for empty
    : "absolute bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl z-30"; // Floating for active

  return (
    <div className="flex flex-col h-full bg-[#050505] rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden text-white font-sans selection:bg-primary/30">

      {/* Glow Effect Background (Consistent Green Brand) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[60%] bg-primary/20 blur-[130px] rounded-full pointer-events-none" />
      {messages.length > 0 && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      )}

      {/* --- HEADER --- */}
      <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#0a0a0a]/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-xl ring-1 ring-inset ring-primary/30">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-white text-sm tracking-tight leading-none mb-1">AI Co-Founder</h2>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-white/50">Available 24/7</p>
          </div>
        </div>
        <button
          onClick={() => setIsFullScreen(true)}
          className="p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors group"
          title="Open in full screen"
        >
          <Maximize2 className="w-4 h-4 text-white/50 group-hover:text-white" />
        </button>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 overflow-hidden relative flex flex-col z-10">

        {/* 1. EMPTY STATE CENTERED CONTENT */}
        {messages.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500 pointer-events-none">
            <div className="text-center space-y-3 mb-8 pointer-events-auto">
              <h1 className="text-4xl font-bold tracking-tight text-white">AI Co-Founder</h1>
              <p className="text-lg text-white/60">
                Build something amazing — just start typing below.
              </p>
            </div>
          </div>
        )}

        {/* 2. MESSAGES LIST (If active) */}
        {messages.length > 0 && (
          <div ref={scrollerRef} className="flex-1 overflow-y-auto space-y-6 p-6 scroll-smooth z-10 pb-32">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-4 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role !== "user" && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium bg-[#1a1a1a] border border-white/10">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div className={`flex-1 max-w-3xl rounded-2xl px-6 py-4 text-sm shadow-sm leading-relaxed ${m.role === "user" ? "bg-primary text-black font-medium" : "bg-[#161616] border border-white/5 text-gray-200"}`}>
                  <FormattedMessage text={m.text} isUser={m.role === "user"} />
                </div>
                {m.role === "user" && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium bg-primary text-black">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}

            {sending && (
              <div className="flex gap-4 fade-in duration-300">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium bg-[#1a1a1a] border border-white/10">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="inline-flex items-center gap-2.5 bg-[#161616] border border-white/5 rounded-2xl px-5 py-3 text-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                  </div>
                  <span className="text-white/40 font-medium text-xs uppercase tracking-wider">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- BOTTOM INPUT SECTION (Common for both states) --- */}
        <div className={inputContainerClass}>

          {/* Input Field */}
          <div className="relative group">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (input.trim()) onSend(input);
              }}
              className="relative"
            >
              {/* Input Glow only on empty state to highlight action */}
              {messages.length === 0 && (
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your request..."
                className={`w-full bg-[#1a1a1a] border-white/10 rounded-2xl p-5 pr-14 text-base text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:bg-[#202020] transition-all shadow-xl relative z-10 ${messages.length > 0 ? 'backdrop-blur-xl bg-[#1a1a1a]/80 shadow-2xl border-white/10' : ''}`}
                autoFocus
                disabled={sending}
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={!input.trim() || sending}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-black hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed z-20"
                title="Send Message"
              >
                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
              </button>
            </form>
          </div>

          {/* Quick Prompts - Show only in Empty State */}
          {messages.length === 0 && (
            <div className="hidden md:flex flex-wrap items-center justify-center gap-3 mt-8 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-200">
              {prompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => onSend(p.label)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1a1a1a] hover:bg-[#252525] border border-white/5 hover:border-primary/30 text-sm text-white/60 hover:text-white transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                >
                  {p.icon}
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN CHATPANEL CONTAINER ---
export default function ChatPanel() {
  const { user } = useSupabase();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // Start empty
  const [sending, setSending] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const sendMessage = async (eOrText) => {
    // Handle both event (form submit) and direct text (Quick Prompts)
    if (eOrText && eOrText.preventDefault) eOrText.preventDefault();

    const q = typeof eOrText === 'string' ? eOrText : input.trim();
    if (!q || sending) return;

    const userMessage = { role: "user", text: q };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setSending(true);

    try {
      const response = await sendMessageAction(q);
      const assistantMessage = { role: "assistant", text: response };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
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
    <>
      <ChatInterface
        messages={messages}
        input={input}
        setInput={setInput}
        onSend={sendMessage}
        sending={sending}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        user={user}
      />

      <FullScreenChat
        isOpen={isFullScreen}
        onClose={() => setIsFullScreen(false)}
        messages={messages}
        sending={sending}
        sendMessage={sendMessage}
        input={input}
        setInput={setInput}
      />
    </>
  );
}