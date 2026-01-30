"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Loader2, Copy, Check, User, Bot, Maximize2, X, Send } from "lucide-react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { sendMessage as sendMessageAction } from "./actions";

// --- FormattedMessage and FullScreenChat components remain the same as your provided code ---

// Markdown-like text formatter
const formatText = (text) => {
  if (!text) return "";

  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="inline">$1</code>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>');

  return formatted;
};

// Component to render formatted text
const FormattedMessage = ({ text, isUser }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (isUser) {
    return <div className="text-primary-foreground">{text}</div>;
  }

  const lines = text.split('\n');
  const elements = [];
  let currentList = [];
  let listType = null;

  lines.forEach((line) => {
    const trimmed = line.trim();

    const numberedMatch = trimmed.match(/^(\d+)\.\s(.+)/);
    if (numberedMatch) {
      if (listType !== 'ordered') {
        if (currentList.length > 0) {
          elements.push({ type: listType, items: [...currentList] });
          currentList = [];
        }
        listType = 'ordered';
      }
      currentList.push(numberedMatch[2]);
      return;
    }

    const bulletMatch = trimmed.match(/^[\*\-]\s(.+)/);
    if (bulletMatch) {
      if (listType !== 'unordered') {
        if (currentList.length > 0) {
          elements.push({ type: listType, items: [...currentList] });
          currentList = [];
        }
        listType = 'unordered';
      }
      currentList.push(bulletMatch[1]);
      return;
    }

    if (currentList.length > 0) {
      elements.push({ type: listType, items: [...currentList] });
      currentList = [];
      listType = null;
    }

    if (trimmed) {
      elements.push({ type: 'text', content: trimmed });
    } else {
      elements.push({ type: 'break' });
    }
  });

  if (currentList.length > 0) {
    elements.push({ type: listType, items: [...currentList] });
  }

  return (
    <div className="relative group chat-message">
      <div className="space-y-3 pb-8">
        {elements.map((element, index) => {
          if (element.type === 'ordered') {
            return (
              <ol key={index} className="list-decimal list-inside space-y-2 ml-4">
                {element.items.map((item, i) => (
                  <li key={i} className="text-foreground/90 leading-relaxed">
                    <span className="ml-2" dangerouslySetInnerHTML={{ __html: formatText(item) }} />
                  </li>
                ))}
              </ol>
            );
          }

          if (element.type === 'unordered') {
            return (
              <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                {element.items.map((item, i) => (
                  <li key={i} className="text-foreground/90 leading-relaxed">
                    <span className="ml-2" dangerouslySetInnerHTML={{ __html: formatText(item) }} />
                  </li>
                ))}
              </ul>
            );
          }

          if (element.type === 'break') {
            return <div key={index} className="h-2" />;
          }

          return (
            <p key={index} className="text-foreground/90 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatText(element.content) }} />
          );
        })}
      </div>

      <button
        onClick={copyToClipboard}
        className="absolute bottom-2 cursor-pointer right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 p-1.5 rounded-md hover:bg-background/50 hover:scale-110"
        title="Copy message"
      >
        {copied ?
          <Check className="w-3.5 h-3.5 text-green-500" /> :
          <Copy className="w-3.5 h-3.5 text-foreground/60 hover:text-foreground/80" />
        }
      </button>
    </div>
  );
};

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
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground tracking-tight">AI Co-Founder</h2>
            <p className="text-sm text-muted-foreground">Your strategic partner for building the next big thing.</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg cursor-pointer hover:bg-background/80 transition-colors"
          title="Close chat"
        >
          <X className="w-6 h-6 text-foreground/60" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollerRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-4 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role !== "user" && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium bg-background border-2 border-border">
                  <Bot className="w-5 h-5" />
                </div>
              )}
              <div className={`flex-1 max-w-3xl rounded-2xl px-6 py-4 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-surface border border-border"}`}>
                <FormattedMessage text={m.text} isUser={m.role === "user"} />
              </div>
              {m.role === "user" && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium bg-primary text-primary-foreground">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {sending && (
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="inline-flex items-center gap-3 bg-surface border border-border rounded-2xl px-6 py-4 text-sm shadow-sm">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                </div>
                <span className="text-muted-foreground font-medium text-xs uppercase tracking-wider">Analyzing</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="p-6 border-t border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={sendMessage} className="flex gap-3 relative group">
            <input
              className="w-full rounded-2xl border border-border bg-background px-6 py-4 pr-16 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-sm"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sending}
              autoFocus
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-primary text-black w-10 h-10 flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 shadow-lg shadow-primary/20 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Send"
            >
              {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


// --- MAIN CHATPANEL COMPONENT ---
export default function ChatPanel() {
  const { user } = useSupabase();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "I'm your AI Co-Founder. Let's build something great. What's on your mind?" }
  ]);
  const [sending, setSending] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const scrollerRef = useRef(null);

  /* User is now from context */

  useEffect(() => {
    if (!isFullScreen) {
      scrollerRef.current?.scrollTo({
        top: scrollerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isFullScreen]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const q = input.trim();
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
      <div className="flex flex-col h-full bg-surface rounded-3xl border border-border shadow-2xl relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

        {/* --- NEW HEADER --- */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/15 p-2 rounded-lg">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-foreground text-sm tracking-tight">AI Co-Founder</h2>
              <p className="text-xs text-muted-foreground">Always available to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsFullScreen(true)}
            className="p-2 rounded-lg hover:bg-background cursor-pointer transition-colors group"
            title="Open in full screen"
          >
            <Maximize2 className="w-4 h-4 text-foreground/60 group-hover:text-foreground/80" />
          </button>
        </div>

        {/* Chat stream */}
        <div ref={scrollerRef} className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role !== "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium bg-background border border-border">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-background"}`}>
                <FormattedMessage text={m.text} isUser={m.role === "user"} />
              </div>
              {m.role === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium bg-primary text-primary-foreground">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {sending && (
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-card border border-border flex items-center justify-center text-primary shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="inline-flex items-center gap-2.5 bg-card border border-border/50 rounded-2xl px-5 py-3 text-sm shadow-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" />
                </div>
                <span className="text-muted-foreground font-medium text-xs uppercase tracking-wider">Analyzing</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <form onSubmit={sendMessage} className="flex gap-2">
            <div className="flex-1 relative">
              <input
                className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                placeholder={user ? "Type your question…" : "Login to save chats (optional). Ask away!"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={sending}
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-xl bg-primary text-black w-9 h-9 disabled:opacity-50 transition-all hover:bg-primary/90 hover:scale-105 shadow-md shadow-primary/20 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Send"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Full-screen chat modal */}
      <FullScreenChat
        isOpen={isFullScreen}
        onClose={() => setIsFullScreen(false)}
        messages={messages}
        sending={sending}
        sendMessage={sendMessage}
        input={input}
        setInput={setInput}
      />

      {/* Custom styles for formatted content */}
      <style jsx global>{`
        .chat-message strong { font-weight: 600; color: inherit; }
        .chat-message em { font-style: italic; }
        .chat-message code.inline { background: var(--color-border); padding: 0.125rem 0.25rem; border-radius: 0.25rem; font-family: 'Courier New', monospace; font-size: 0.875em; }
        .chat-message pre { background: var(--color-background); padding: 0.75rem; border-radius: 0.5rem; overflow-x: auto; margin: 0.5rem 0; }
        .chat-message pre code { font-family: 'Courier New', monospace; font-size: 0.875em; line-height: 1.4; }
        .chat-message h1 { font-size: 1.25rem; font-weight: 700; margin: 0.75rem 0 0.5rem 0; }
        .chat-message h2 { font-size: 1.125rem; font-weight: 600; margin: 0.75rem 0 0.5rem 0; }
        .chat-message h3 { font-size: 1rem; font-weight: 600; margin: 0.5rem 0 0.25rem 0; }
      `}</style>
    </>
  );
}