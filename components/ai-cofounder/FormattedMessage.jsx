"use client";
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';
import { Check, Copy } from 'lucide-react';

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

    // User messages are simple text
    if (isUser) {
        return <div className="text-primary-foreground font-medium p-1 whitespace-pre-wrap">{text}</div>;
    }

    // AI Assistant messages support rich markdown
    return (
        <div className="relative group chat-message text-foreground/90 overflow-hidden">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    // Code blocks with syntax highlighting
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <div className="relative my-4 rounded-lg overflow-hidden border border-border/50 shadow-md">
                                <div className="flex items-center justify-between px-4 py-1.5 bg-muted/50 border-b border-border/50 text-xs text-muted-foreground font-mono">
                                    <span>{match[1]}</span>
                                    <div className="flex gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-400/20"></span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/20"></span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-400/20"></span>
                                    </div>
                                </div>
                                <SyntaxHighlighter
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{ margin: 0, borderRadius: 0, fontSize: '0.9em', padding: '1rem', background: 'var(--card)' }}
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[0.9em] text-primary break-words" {...props}>
                                {children}
                            </code>
                        );
                    },
                    // Tables
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-4 border border-border rounded-lg shadow-sm">
                            <table className="w-full text-sm text-left border-collapse" {...props} />
                        </div>
                    ),
                    thead: ({ node, ...props }) => <thead className="bg-muted text-muted-foreground uppercase text-xs" {...props} />,
                    th: ({ node, ...props }) => <th className="px-4 py-3 font-semibold border-b border-border text-left" {...props} />,
                    td: ({ node, ...props }) => <td className="px-4 py-3 border-b border-border/50" {...props} />,
                    // Headings
                    h1: ({ node, ...props }) => <h1 className="text-xl font-bold mt-6 mb-4 tracking-tight" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-lg font-bold mt-5 mb-3 tracking-tight" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-base font-semibold mt-4 mb-2" {...props} />,
                    // Lists
                    ul: ({ node, ...props }) => <ul className="list-disc list-outside space-y-1 my-3 pl-5" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-outside space-y-1 my-3 pl-5" {...props} />,
                    li: ({ node, ...props }) => <li className="pl-1 leading-relaxed" {...props} />,
                    // Links
                    a: ({ node, ...props }) => <a className="text-primary underline underline-offset-4 hover:text-primary/70 transition-colors cursor-pointer" target="_blank" rel="noopener noreferrer" {...props} />,
                    // Formatting
                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary/40 pl-4 py-1 my-4 italic text-muted-foreground bg-muted/10 rounded-r pr-2" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-3 last:mb-0 leading-relaxed" {...props} />,
                    hr: ({ node, ...props }) => <hr className="my-6 border-border" {...props} />,
                }}
            >
                {text}
            </ReactMarkdown>

            {/* Internal Copy Button */}
            <button
                onClick={copyToClipboard}
                className="absolute top-0 right-0 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                title="Copy message"
            >
                {copied ?
                    <Check className="w-3.5 h-3.5 text-green-500" /> :
                    <Copy className="w-3.5 h-3.5" />
                }
            </button>

            {/* Math specific adjustments */}
            <style jsx global>{`
        .katex-display { margin: 1em 0; overflow-x: auto; overflow-y: hidden; }
      `}</style>
        </div>
    );
};

export default FormattedMessage;
