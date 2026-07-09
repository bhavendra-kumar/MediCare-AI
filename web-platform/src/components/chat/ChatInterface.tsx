"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Send, Bot, User, Sparkles, Mic, MicOff, Paperclip,
  Image as ImageIcon, Plus, MessageSquare, X, FileText, ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { TypographyH2, TypographyH3, TypographyP, TypographySmall } from "@/components/ui/typography";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";


interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  onstart: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

interface Attachment {
  id: string;
  type: "file" | "image";
  name: string;
  url?: string;
}

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  attachments?: Attachment[];
}

interface ChatSession {
  id: string;
  title: string;
  time: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "ai", content: "Hello! I am your MediCare AI Assistant. How can I help you regarding your health today?" },
  ]);
  const [input, setInput] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("chat_draft_message") || "";
    }
    return "";
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  const recentChats: ChatSession[] = [
    { id: "c1", title: "Blood pressure analysis", time: "Today" },
    { id: "c2", title: "Skin rash symptoms", time: "Yesterday" },
    { id: "c3", title: "Vitamin D deficiency", time: "Last Week" },
  ];

  const suggestedPrompts = [
    "I have had a mild headache for two days.",
    "What do my last blood test results mean?",
    "Can you explain hypertension in simple terms?",
    "I'm feeling fatigued constantly.",
  ];

  useEffect(() => {
    localStorage.setItem("chat_draft_message", input);
  }, [input]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = (window as unknown as { SpeechRecognition: SpeechRecognitionConstructor }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition: SpeechRecognitionConstructor }).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onstart = () => setIsRecording(true);

    let startTranscript = input;
    if (startTranscript && !startTranscript.endsWith(" ")) {
      startTranscript += " ";
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          startTranscript += event.results[i][0].transcript + " ";
          setInput(startTranscript);
        } else {
          interimTranscript += event.results[i][0].transcript;
          setInput(startTranscript + interimTranscript);
        }
      }
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, attachments]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "file" | "image") => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newAttachment: Attachment = {
        id: Date.now().toString(),
        type,
        name: file.name,
        url: type === "image" ? URL.createObjectURL(file) : undefined,
      };
      setAttachments((prev) => [...prev, newAttachment]);
      e.target.value = "";
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && attachments.length === 0) return;

    const messageContent = input.trim();

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setAttachments([]);
    setIsLoading(true);

    try {
      const response = await api.post("/ai/chat", {
        user_id: user?.id || "demo-user",
        message: messageContent,
        language: "en",
      });

      if (response.data && response.data.success) {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: response.data.response,
        };
        setMessages((prev) => [...prev, aiResponse]);
      } else {
        toast.error("Failed to get response from AI Assistant.");
      }
    } catch (error) {
      console.error("AI Chat error:", error);
      const err = error as { response?: { data?: { detail?: string } } };
      toast.error(err.response?.data?.detail || "An error occurred while connecting to the AI Assistant.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white dark:bg-slate-950">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 lg:w-72 border-r border-slate-200 bg-slate-50/50 dark:bg-slate-900/20 dark:border-slate-800">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <Button onClick={() => router.push("/dashboard")} variant="ghost" className="w-full justify-start gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
          <Button className="w-full justify-start gap-2 bg-white text-slate-700 hover:text-sky-600 hover:bg-sky-50 border border-slate-200 shadow-sm dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-sky-900/30 dark:hover:text-sky-400">
            <Plus className="h-4 w-4" /> New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <TypographyH3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Recent</TypographyH3>
            <div className="space-y-1">
              {recentChats.map((chat) => (
                <button key={chat.id} className="w-full flex items-center gap-3 px-2 py-2 text-sm text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors group dark:text-slate-400 dark:hover:bg-slate-800">
                  <MessageSquare className="h-4 w-4 text-slate-400 group-hover:text-sky-500" />
                  <TypographySmall className="truncate flex-1 text-left">{chat.title}</TypographySmall>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-100/50 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-linear-to-tr from-sky-400 to-indigo-500 flex items-center justify-center p-[2px]">
              <div className="bg-white dark:bg-slate-950 w-full h-full rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-sky-500" />
              </div>
            </div>
            <div>
              <TypographyP className="text-sm font-medium text-slate-900 dark:text-white">MediCare Plus</TypographyP>
              <TypographyP className="text-xs text-sky-600 dark:text-sky-400">Upgrade for more limits</TypographyP>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-950 relative">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 md:px-6 py-4 dark:border-slate-800 bg-white/80 backdrop-blur-sm z-10 dark:bg-slate-950/80 absolute top-0 w-full">
          <div className="flex items-center gap-3">
            <Button onClick={() => router.push("/dashboard")} variant="ghost" size="icon" className="md:hidden text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-lg bg-sky-100 flex items-center justify-center dark:bg-sky-900/50 shrink-0">
              <Bot className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <TypographyH2 className="text-base font-semibold text-slate-900 dark:text-white leading-tight">AI Health Assistant</TypographyH2>
              <TypographyP className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
              </TypographyP>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 pt-24 pb-4 space-y-6 scroll-smooth">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-4 max-w-3xl ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <Avatar className="h-8 w-8 shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm">
                  {msg.role === "ai" ? (
                    <AvatarFallback className="bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-end">
                      {msg.attachments.map((att) => (
                        <div key={att.id} className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm max-w-[200px]">
                          {att.type === "image" && att.url ? (
                            <>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={att.url} alt={att.name} className="w-full h-auto object-cover max-h-32" />
                            </>
                          ) : (
                            <div className="flex items-center gap-2 p-3">
                              <FileText className="h-8 w-8 text-indigo-500 shrink-0" />
                              <TypographySmall className="text-xs text-slate-600 dark:text-slate-300 truncate w-24 leading-tight">{att.name}</TypographySmall>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.content && (
                    <div className={`rounded-2xl px-5 py-3.5 shadow-sm text-[15px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-sky-600 text-white rounded-tr-sm"
                        : "bg-white border border-slate-200 text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 rounded-tl-sm"
                    }`}>
                      <TypographyP>{msg.content}</TypographyP>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 max-w-2xl mr-auto">
              <Avatar className="h-8 w-8 shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm">
                <AvatarFallback className="bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="rounded-2xl rounded-tl-sm px-5 py-4 bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex items-center h-12">
                <div className="flex gap-1.5 items-center">
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay }}
                      className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} className="h-2" />
        </div>

        <div className="px-4 pb-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence>
              {messages.length <= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mb-4 flex flex-wrap gap-2 justify-center"
                >
                  {suggestedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(prompt)}
                      className="text-xs px-4 py-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm text-slate-600 hover:bg-white hover:border-sky-300 hover:text-sky-700 transition-all shadow-sm dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:border-sky-700 dark:hover:text-sky-400"
                    >
                      {prompt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-400 transition-all dark:bg-slate-900 dark:border-slate-800 dark:focus-within:border-sky-500 dark:focus-within:ring-sky-900/20">
              {attachments.length > 0 && (
                <div className="flex gap-3 p-3 border-b border-slate-100 dark:border-slate-800 overflow-x-auto">
                  {attachments.map((att) => (
                    <div key={att.id} className="relative group shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 w-16 h-16 flex flex-col items-center justify-center">
                      {att.type === "image" && att.url ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={att.url} alt={att.name} className="w-full h-full object-cover" />
                        </>
                      ) : (
                        <FileText className="h-6 w-6 text-indigo-500 mb-1" />
                      )}
                      <button
                        type="button"
                        onClick={() => removeAttachment(att.id)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleSend} className="flex items-end gap-2 p-2 relative">
                <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleFileUpload(e, "file")} accept=".pdf,.doc,.docx,.txt" />
                <input type="file" ref={imageInputRef} className="hidden" onChange={(e) => handleFileUpload(e, "image")} accept="image/*" />

                <div className="flex gap-1 mb-1 ms-1 shrink-0">
                  <Button type="button" variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} className="h-8 w-8 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800" title="Attach document">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => imageInputRef.current?.click()} className="h-8 w-8 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800" title="Upload image">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1 min-w-0">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isRecording ? "Listening..." : "Type your query here..."}
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-2 py-3 text-[15px] placeholder:text-slate-400 w-full"
                    disabled={isLoading}
                    autoFocus
                  />
                </div>

                <div className="flex gap-1.5 mb-1 mr-1 shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={toggleRecording}
                    className={`h-9 w-9 rounded-full transition-all ${isRecording ? "bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-pulse" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"}`}
                    title={isRecording ? "Stop recording" : "Use microphone"}
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || (!input.trim() && attachments.length === 0)}
                    size="icon"
                    className={`h-9 w-9 rounded-full transition-all ${(!input.trim() && attachments.length === 0) ? "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600" : "bg-sky-600 text-white shadow-md shadow-sky-600/20 hover:bg-sky-700 active:scale-95"}`}
                  >
                    <Send className="h-4 w-4 transform translate-x-0.5 -translate-y-0.5" />
                  </Button>
                </div>
              </form>
            </div>
            <div className="text-center mt-3">
              <TypographySmall className="text-[11px] text-slate-400 dark:text-slate-500">
                MediCare AI can make mistakes. Always verify important medical advice with a healthcare professional.
              </TypographySmall>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
