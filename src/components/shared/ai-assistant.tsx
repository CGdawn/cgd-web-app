"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { aiVirtualAssistantChatbot } from "@/ai/flows/ai-virtual-assistant-chatbot";
import { cn } from "@/lib/utils";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Welcome to AetherCore! I'm your AI assistant. How can I help you today regarding CG DAWN's services or vision?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userText = query;
    setQuery("");
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const result = await aiVirtualAssistantChatbot({ query: userText });
      setMessages(prev => [...prev, { role: 'ai', text: result.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having a brief connection issue. Please try again or contact support." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="w-[350px] sm:w-[400px] h-[500px] glass rounded-3xl border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
          {/* Header */}
          <div className="p-4 bg-primary/20 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">AetherAI Assistant</h4>
                <p className="text-[10px] text-white/60 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Online
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
                <div className={cn(
                  "p-2 rounded-lg",
                  msg.role === 'user' ? "bg-secondary/20" : "bg-primary/20"
                )}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
                </div>
                <div className={cn(
                  "p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed",
                  msg.role === 'user' ? "bg-white/5 border border-white/10 rounded-tr-none" : "glass border border-white/5 rounded-tl-none"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Bot className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <div className="glass p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/20">
            <div className="relative">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me anything about CG DAWN..."
                className="bg-white/5 border-white/10 rounded-full pr-12 text-sm h-12"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading}
                className="absolute right-1 top-1 h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative p-4 rounded-2xl bg-primary shadow-2xl shadow-primary/20 hover:scale-110 transition-transform duration-300"
        >
          <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-secondary border-2 border-background animate-bounce">
            <Sparkles className="w-3 h-3 text-background" />
          </div>
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
}
