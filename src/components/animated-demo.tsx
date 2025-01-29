"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FacebookPreview } from "./chat-previews/facebook-preview";
import { InstagramPreview } from "./chat-previews/instagram-preview";
import { TelegramPreview } from "./chat-previews/telegram-preview";
import { WhatsAppPreview } from "./chat-previews/whatsapp-preview";

const demoMessages = [
  { text: "Hey! How's it going?", time: "09:30", isUser: true },
  {
    text: "I'm doing great! Just launched a new project.",
    time: "09:31",
    isUser: false,
  },
  {
    text: "That's awesome! Can't wait to see it 🚀",
    time: "09:31",
    isUser: true,
  },
  {
    text: "Thanks! I'll send you more details soon.",
    time: "09:32",
    isUser: false,
  },
];

const platforms = [
  {
    name: "WhatsApp",
    component: WhatsAppPreview,
    contactName: "Elon Musk",
    contactImage:
      "https://upload.wikimedia.org/wikipedia/commons/c/cb/Elon_Musk_Royal_Society_crop.jpg",
  },
  {
    name: "Instagram",
    component: InstagramPreview,
    contactName: "Taylor Swift",
    contactImage: "https://v0.dev/placeholder.svg?height=50&width=50",
  },
  {
    name: "Telegram",
    component: TelegramPreview,
    contactName: "Bill Gates",
    contactImage: "https://v0.dev/placeholder.svg?height=50&width=50",
  },
  {
    name: "Facebook",
    component: FacebookPreview,
    contactName: "Mark Zuckerberg",
    contactImage: "https://v0.dev/placeholder.svg?height=50&width=50",
  },
];

export function AnimatedDemo() {
  const [currentPlatform, setCurrentPlatform] = useState(0);
  const [messages, setMessages] = useState<typeof demoMessages>([]);

  useEffect(() => {
    // Reset messages when platform changes
    setMessages([]);

    // Animate messages appearing one by one
    const messageTimers = demoMessages.map((_, index) => {
      return setTimeout(() => {
        setMessages((prev) => [...prev, demoMessages[index]]);
      }, index * 1000);
    });

    // Change platform every 5 seconds
    const platformTimer = setTimeout(() => {
      setCurrentPlatform((prev) => (prev + 1) % platforms.length);
    }, 6000);

    return () => {
      messageTimers.forEach((timer) => clearTimeout(timer));
      clearTimeout(platformTimer);
    };
  }, []); // Removed currentPlatform from dependencies

  const Platform = platforms[currentPlatform].component;

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <motion.div
        key={currentPlatform}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5 }}
        className="transform-gpu"
      >
        <Platform
          contactName={platforms[currentPlatform].contactName}
          contactImage={platforms[currentPlatform].contactImage}
          messages={messages}
        />
      </motion.div>

      {/* Platform indicators */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            className={`w-2 h-2 rounded-full ${
              index === currentPlatform ? "bg-primary" : "bg-gray-200"
            }`}
            animate={{
              scale: index === currentPlatform ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
