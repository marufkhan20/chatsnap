"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Facebook, ImageIcon, MessageCircle, Send } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const DEMO_SEQUENCE = [
  {
    step: "name",
    duration: 2500, // Increased from 2000
    content: {
      text: "Chat with Elon Musk",
    },
  },
  {
    step: "platform",
    duration: 2000, // Increased from 1500
    content: {
      selected: "whatsapp",
    },
  },
  {
    step: "contact",
    duration: 2500, // Increased from 2000
    content: {
      name: "Elon Musk",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/cb/Elon_Musk_Royal_Society_crop.jpg",
      role: "Entrepreneur",
    },
  },
  {
    step: "messages",
    duration: 5000, // Increased from 4000
    content: {
      messages: [
        { text: "Hey Elon! Big fan of Tesla", time: "9:41 AM", isUser: true },
        {
          text: "Thanks! Working on something exciting...",
          time: "9:42 AM",
          isUser: false,
        },
        {
          text: "Can't wait to hear about it! 🚀",
          time: "9:42 AM",
          isUser: true,
        },
      ],
    },
  },
];

export function DemoShowcase() {
  const [currentStep, setCurrentStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);

  const resetStates = useCallback(() => {
    setTypedText("");
    setSelectedPlatform(null);
    setMessages([]);
    setCurrentStep(0);
  }, []);

  const startDemo = useCallback(() => {
    setIsAnimating(true);
    resetStates();

    const timeouts: NodeJS.Timeout[] = [];
    let currentTime = 0;

    // Type project name
    const typeText = DEMO_SEQUENCE[0].content.text || "";
    for (let i = 0; i <= typeText.length; i++) {
      timeouts.push(
        setTimeout(() => {
          setTypedText(typeText.slice(0, i));
        }, currentTime + i * 100)
      );
    }
    currentTime += DEMO_SEQUENCE[0].duration;

    // Select platform
    timeouts.push(
      setTimeout(() => {
        setCurrentStep(1);
        setSelectedPlatform("whatsapp");
      }, currentTime)
    );
    currentTime += DEMO_SEQUENCE[1].duration;

    // Select contact
    timeouts.push(
      setTimeout(() => {
        setCurrentStep(2);
      }, currentTime)
    );
    currentTime += DEMO_SEQUENCE[2].duration;

    // Show messages
    timeouts.push(
      setTimeout(() => {
        setCurrentStep(3);
      }, currentTime)
    );

    DEMO_SEQUENCE[3].content.messages.forEach((message, index) => {
      timeouts.push(
        setTimeout(() => {
          setMessages((prev) => [...prev, message]);
        }, currentTime + index * 1200) // Increased from 1000
      );
    });

    // Reset and restart demo
    timeouts.push(
      setTimeout(() => {
        setIsAnimating(false);
        resetStates();
        startDemo();
      }, currentTime + 6000) // Increased from 5000
    );

    return () => timeouts.forEach(clearTimeout);
  }, [resetStates]);

  useEffect(() => {
    const cleanup = startDemo();
    return () => cleanup();
  }, [startDemo]);

  return (
    <div className="relative max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }} // Increased from 0.5
        className="rounded-xl min-h-[400px] overflow-hidden border bg-white shadow-lg"
      >
        {/* Browser-like header */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }} // Increased from 0.3
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold mb-4">Name your chat</h3>
                <Input
                  value={typedText}
                  className="w-full"
                  placeholder="Enter chat name"
                />
                {/* <span className="animate-pulse text-primary">|</span> */}
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold mb-4">Choose platform</h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{
                      scale: selectedPlatform === "whatsapp" ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      variant={
                        selectedPlatform === "whatsapp" ? "default" : "outline"
                      }
                      className="h-24 w-full flex flex-col items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-8 h-8" />
                      <span>WhatsApp</span>
                    </Button>
                  </motion.div>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2"
                  >
                    <ImageIcon className="w-8 h-8" />
                    <span>Instagram</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2"
                  >
                    <Send className="w-8 h-8" />
                    <span>Telegram</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2"
                  >
                    <Facebook className="w-8 h-8" />
                    <span>Facebook</span>
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold mb-4">Select contact</h3>
                <div className="grid gap-4">
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      variant="default"
                      className="w-full h-20 flex items-center gap-4"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Elon_Musk_Royal_Society_crop.jpg"
                        alt="Elon Musk"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="text-left">
                        <div className="font-semibold">Elon Musk</div>
                        <div className="text-sm opacity-70">Entrepreneur</div>
                      </div>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <div className="bg-[#E4DDD6] max-h-[400px] rounded-lg p-4">
                  <div className="bg-[#075E54] text-white p-3 -mx-4 -mt-4 mb-4 rounded-t-lg flex items-center gap-3">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Elon_Musk_Royal_Society_crop.jpg"
                      alt="Elon Musk"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">Elon Musk</div>
                      <div className="text-xs opacity-80">online</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`flex ${
                          message.isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-2 ${
                            message.isUser
                              ? "bg-[#DCF8C6] rounded-tr-none"
                              : "bg-white rounded-tl-none"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-[10px] text-gray-500 text-right">
                            {message.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{
              width: `${((currentStep + 1) / DEMO_SEQUENCE.length) * 100}%`,
            }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
