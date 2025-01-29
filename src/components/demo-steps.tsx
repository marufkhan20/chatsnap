"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { Facebook, ImageIcon, MessageCircle, Send, User } from "lucide-react";
import { useEffect, useState } from "react";

// Typing animation component
function TypingAnimation({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

const steps = [
  {
    title: "Name your chat",
    content: ({ onNext }: { onNext: () => void }) => {
      const [isTyping, setIsTyping] = useState(true);

      return (
        <div className="space-y-4 p-6">
          <Input
            value={isTyping ? undefined : "Chat with Elon Musk"}
            placeholder="Enter chat name"
          >
            {isTyping && (
              <TypingAnimation
                text="Chat with Elon Musk"
                onComplete={() => {
                  setIsTyping(false);
                  setTimeout(onNext, 1000);
                }}
              />
            )}
          </Input>
        </div>
      );
    },
  },
  {
    title: "Choose platform",
    content: ({ onNext }: { onNext: () => void }) => {
      const [selected, setSelected] = useState<string | null>(null);

      useEffect(() => {
        if (selected) {
          setTimeout(onNext, 1000);
        }
      }, [selected, onNext]);

      return (
        <div className="space-y-4 p-6">
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant={selected === "whatsapp" ? "default" : "outline"}
                className="w-full h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => setSelected("whatsapp")}
              >
                <MessageCircle className="w-8 h-8" />
                <span>WhatsApp</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant={selected === "instagram" ? "default" : "outline"}
                className="w-full h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => setSelected("instagram")}
              >
                <ImageIcon className="w-8 h-8" />
                <span>Instagram</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant={selected === "telegram" ? "default" : "outline"}
                className="w-full h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => setSelected("telegram")}
              >
                <Send className="w-8 h-8" />
                <span>Telegram</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant={selected === "facebook" ? "default" : "outline"}
                className="w-full h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => setSelected("facebook")}
              >
                <Facebook className="w-8 h-8" />
                <span>Facebook</span>
              </Button>
            </motion.div>
          </div>
        </div>
      );
    },
  },
  {
    title: "Select chat type",
    content: ({ onNext }: { onNext: () => void }) => {
      const [chatType, setChatType] = useState<"celebrity" | "manual" | null>(
        null
      );
      const [selectedCelebrity, setSelectedCelebrity] = useState<string | null>(
        null
      );
      const [manualName, setManualName] = useState("");

      useEffect(() => {
        if (
          (chatType === "celebrity" && selectedCelebrity) ||
          (chatType === "manual" && manualName)
        ) {
          setTimeout(onNext, 1000);
        }
      }, [chatType, selectedCelebrity, manualName, onNext]);

      return (
        <div className="space-y-4 p-6">
          <Tabs
            value={chatType || ""}
            onValueChange={(value) => setChatType(value as any)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="celebrity">Celebrity Chat</TabsTrigger>
              <TabsTrigger value="manual">Manual Chat</TabsTrigger>
            </TabsList>
          </Tabs>

          <AnimatePresence mode="wait">
            {chatType === "celebrity" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "1", name: "Elon Musk", role: "Entrepreneur" },
                    { id: "2", name: "Taylor Swift", role: "Singer" },
                    { id: "3", name: "Cristiano Ronaldo", role: "Athlete" },
                    { id: "4", name: "Tom Cruise", role: "Actor" },
                  ].map((celebrity) => (
                    <motion.div key={celebrity.id} whileHover={{ scale: 1.05 }}>
                      <Button
                        variant={
                          selectedCelebrity === celebrity.id
                            ? "default"
                            : "outline"
                        }
                        className="w-full h-20 flex items-center gap-4"
                        onClick={() => setSelectedCelebrity(celebrity.id)}
                      >
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt={celebrity.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="text-left">
                          <div className="font-medium">{celebrity.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {celebrity.role}
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {chatType === "manual" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Input
                    placeholder="Enter contact name"
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                  />
                  <div className="flex justify-center">
                    <User className="w-16 h-16 text-muted-foreground" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    },
  },
  {
    title: "Create messages",
    content: ({ onNext }: { onNext: () => void }) => {
      const [messages, setMessages] = useState<
        { text: string; isUser: boolean }[]
      >([]);
      const [currentMessage, setCurrentMessage] = useState("");
      const [isTyping, setIsTyping] = useState(true);

      useEffect(() => {
        if (isTyping) {
          const demoMessages = [
            { text: "Hey! How's it going?", isUser: true },
            { text: "Working on something exciting...", isUser: false },
            { text: "Can't wait to hear about it! 🚀", isUser: true },
          ];

          let index = 0;
          const interval = setInterval(() => {
            if (index < demoMessages.length) {
              setMessages((prev) => [...prev, demoMessages[index]]);
              index++;
            } else {
              setIsTyping(false);
              clearInterval(interval);
              setTimeout(onNext, 1000);
            }
          }, 1500);

          return () => clearInterval(interval);
        }
      }, [isTyping, onNext]);

      return (
        <div className="space-y-4 p-6">
          <div className="bg-gray-50 rounded-lg p-4 h-[300px] overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              disabled={isTyping}
            />
            <Button disabled={isTyping}>Send</Button>
          </div>
        </div>
      );
    },
  },
];

export function DemoSteps() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };

  return (
    <div className="relative">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Step title */}
      <div className="pt-6 px-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Step {currentStep + 1}: {steps[currentStep].title}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {steps[currentStep].content({ onNext: nextStep })}
        </motion.div>
      </AnimatePresence>

      {/* Step indicators */}
      <div className="flex justify-center gap-2 p-6">
        {steps.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentStep ? "bg-primary" : "bg-gray-200"
            }`}
            onClick={() => {
              setCurrentStep(index);
              setIsPlaying(false);
            }}
          />
        ))}
      </div>
    </div>
  );
}
