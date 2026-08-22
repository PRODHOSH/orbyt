"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, User, Loader2, Bot, ArrowDownCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

type Message = {
  id: string;
  role: "user" | "model";
  content: string;
};

export default function AskOrbytPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      content: "Hello! I am ORBYT, your intelligent campus agent. Ask me about your attendance, schedule, or campus safety."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Add empty model message to stream into
    const modelMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: modelMsgId, role: "model", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let text = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        text += chunkValue;

        setMessages(prev => 
          prev.map(msg => 
            msg.id === modelMsgId ? { ...msg, content: text } : msg
          )
        );
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === modelMsgId ? { ...msg, content: "Sorry, I am currently offline or experiencing an error. Please ensure the GEMINI_API_KEY is configured." } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedPrompts = [
    "What's my current attendance?",
    "Which clubs are recruiting?",
    "How do I report a safety concern?",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto">
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 1 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="h-20 w-20 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shadow-inner">
              <Sparkles className="h-10 w-10 text-blue-500" />
            </div>
            <div className="max-w-md">
              <h2 className="text-2xl font-bold font-sora">Ask ORBYT</h2>
              <p className="text-muted-foreground mt-2">I am plugged into the campus OS. I know your academic profile, regulations, and live campus data.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-lg">
              {suggestedPrompts.map(prompt => (
                <Button 
                  key={prompt} 
                  variant="outline" 
                  className="rounded-full text-xs font-normal border-blue-100 dark:border-blue-900/30 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  onClick={() => setInput(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6 pb-20">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4 max-w-[85%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
                  msg.role === "user" ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" : "bg-blue-500 text-white shadow-md shadow-blue-500/20"
                )}>
                  {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                
                <div className={cn(
                  "rounded-2xl p-4 shadow-sm",
                  msg.role === "user" 
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-tr-sm" 
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-sm prose prose-sm dark:prose-invert max-w-none"
                )}>
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <ReactMarkdown>{msg.content || "..."}</ReactMarkdown>
                  )}
                  {msg.role === "model" && msg.content && (
                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                      <Sparkles className="h-3 w-3" /> ORBYT Intelligence Layer
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-background/80 backdrop-blur-xl border-t">
        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your campus..."
            className="pr-12 py-6 rounded-2xl border-slate-300 dark:border-slate-700 focus-visible:ring-blue-500 shadow-sm"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 h-10 w-10 rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-md"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-4 w-4 ml-0.5" />}
          </Button>
        </form>
        <p className="text-center text-xs text-muted-foreground mt-2">
          ORBYT can make mistakes. Verify critical academic regulations directly.
        </p>
      </div>
    </div>
  );
}
