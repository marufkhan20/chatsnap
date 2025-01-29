"use client";

import { FacebookPreview } from "@/components/chat-previews/facebook-preview";
import { InstagramPreview } from "@/components/chat-previews/instagram-preview";
import { TelegramPreview } from "@/components/chat-previews/telegram-preview";
import { WhatsAppPreview } from "@/components/chat-previews/whatsapp-preview";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Facebook,
  Instagram,
  MessageCircle,
  Plus,
  Send,
} from "lucide-react";
import { useState } from "react";

const platforms = [
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "whatsapp", name: "WhatsApp", icon: MessageCircle },
  { id: "telegram", name: "Telegram", icon: Send },
  { id: "facebook", name: "Facebook", icon: Facebook },
];

const categories = [
  { id: "singer", name: "Singers" },
  { id: "actor", name: "Actors" },
  { id: "athlete", name: "Athletes" },
  { id: "entrepreneur", name: "Entrepreneurs" },
];

const celebrities = {
  singer: [
    {
      id: 1,
      name: "Taylor Swift",
      image: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      name: "Ed Sheeran",
      image: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
  ],
  actor: [
    {
      id: 3,
      name: "Tom Cruise",
      image: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
    {
      id: 4,
      name: "Jennifer Lawrence",
      image: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
  ],
  athlete: [
    {
      id: 5,
      name: "Cristiano Ronaldo",
      image: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
    {
      id: 6,
      name: "Serena Williams",
      image: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
  ],
  entrepreneur: [
    {
      id: 7,
      name: "Elon Musk",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/cb/Elon_Musk_Royal_Society_crop.jpg",
    },
    {
      id: 8,
      name: "Bill Gates",
      image: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
  ],
};

interface Message {
  text: string;
  time: string;
  isUser: boolean;
}

export default function CreateChat() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    platform: "",
    chatType: "",
    category: "",
    celebrity: "",
    customName: "",
    customImage: "",
    messages: [] as Message[],
  });

  const [newMessage, setNewMessage] = useState({
    text: "",
    time: "",
    isUser: true,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleAddMessage = () => {
    if (newMessage.text && newMessage.time) {
      setFormData({
        ...formData,
        messages: [...formData.messages, newMessage],
      });
      setNewMessage({
        text: "",
        time: "",
        isUser: !newMessage.isUser,
      });
    }
  };

  const getContactName = () => {
    if (formData.chatType === "celebrity" && formData.celebrity) {
      const category = formData.category as keyof typeof celebrities;
      const celebrity = celebrities[category].find(
        (c) => c.id.toString() === formData.celebrity
      );
      return celebrity?.name || "";
    }
    return formData.customName;
  };

  const getContactImage = () => {
    if (formData.chatType === "celebrity" && formData.celebrity) {
      const category = formData.category as keyof typeof celebrities;
      const celebrity = celebrities[category].find(
        (c) => c.id.toString() === formData.celebrity
      );
      return celebrity?.image || "https://v0.dev/placeholder.svg";
    }
    return formData.customImage || "https://v0.dev/placeholder.svg";
  };

  const renderChatPreview = () => {
    const props = {
      contactName: getContactName(),
      contactImage: getContactImage(),
      messages: formData.messages,
    };

    switch (formData.platform) {
      case "whatsapp":
        return <WhatsAppPreview {...props} />;
      case "instagram":
        return <InstagramPreview {...props} />;
      case "telegram":
        return <TelegramPreview {...props} />;
      case "facebook":
        return <FacebookPreview {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Form */}
          <div>
            <Card>
              <CardContent className="p-6">
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(step / 4) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground text-center">
                    Step {step} of 4
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-bold mb-4">
                        Name your project
                      </h2>
                      <div className="space-y-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="My awesome chat"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-bold mb-4">
                        Select platform
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        {platforms.map((platform) => (
                          <Button
                            key={platform.id}
                            variant={
                              formData.platform === platform.id
                                ? "default"
                                : "outline"
                            }
                            className="h-32 flex flex-col items-center justify-center gap-2"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                platform: platform.id,
                              })
                            }
                          >
                            <platform.icon className="w-8 h-8" />
                            <span>{platform.name}</span>
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-bold mb-4">
                        Choose chat type
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          variant={
                            formData.chatType === "celebrity"
                              ? "default"
                              : "outline"
                          }
                          className="h-24"
                          onClick={() =>
                            setFormData({ ...formData, chatType: "celebrity" })
                          }
                        >
                          Chat with Celebrity
                        </Button>
                        <Button
                          variant={
                            formData.chatType === "custom"
                              ? "default"
                              : "outline"
                          }
                          className="h-24"
                          onClick={() =>
                            setFormData({ ...formData, chatType: "custom" })
                          }
                        >
                          Custom Chat
                        </Button>
                      </div>

                      {formData.chatType === "celebrity" && (
                        <div className="space-y-4 mt-4">
                          <Select
                            value={formData.category}
                            onValueChange={(value) =>
                              setFormData({ ...formData, category: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {formData.category && (
                            <div className="grid grid-cols-2 gap-4">
                              {celebrities[
                                formData.category as keyof typeof celebrities
                              ].map((celebrity) => (
                                <Button
                                  key={celebrity.id}
                                  variant={
                                    formData.celebrity ===
                                    celebrity.id.toString()
                                      ? "default"
                                      : "outline"
                                  }
                                  className="h-20 flex items-center gap-4"
                                  onClick={() =>
                                    setFormData({
                                      ...formData,
                                      celebrity: celebrity.id.toString(),
                                    })
                                  }
                                >
                                  <img
                                    src={celebrity.image || "/placeholder.svg"}
                                    alt={celebrity.name}
                                    className="w-12 h-12 rounded-full"
                                  />
                                  <span>{celebrity.name}</span>
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {formData.chatType === "custom" && (
                        <div className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="customName">Name</Label>
                            <Input
                              id="customName"
                              value={formData.customName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  customName: e.target.value,
                                })
                              }
                              placeholder="Contact name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="customImage">
                              Profile Image URL
                            </Label>
                            <Input
                              id="customImage"
                              value={formData.customImage}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  customImage: e.target.value,
                                })
                              }
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-bold mb-4">Create chat</h2>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 mb-6">
                          <Button
                            variant={newMessage.isUser ? "default" : "outline"}
                            onClick={() =>
                              setNewMessage({ ...newMessage, isUser: true })
                            }
                            className="flex-1"
                          >
                            Your message
                          </Button>
                          <Button
                            variant={!newMessage.isUser ? "default" : "outline"}
                            onClick={() =>
                              setNewMessage({ ...newMessage, isUser: false })
                            }
                            className="flex-1"
                          >
                            {getContactName()}&apos;s message
                          </Button>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Message</Label>
                            <Input
                              value={newMessage.text}
                              onChange={(e) =>
                                setNewMessage({
                                  ...newMessage,
                                  text: e.target.value,
                                })
                              }
                              placeholder={`Type ${
                                newMessage.isUser
                                  ? "your"
                                  : getContactName() + "'s"
                              } message`}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Time</Label>
                            <Input
                              type="time"
                              value={newMessage.time}
                              onChange={(e) =>
                                setNewMessage({
                                  ...newMessage,
                                  time: e.target.value,
                                })
                              }
                            />
                          </div>
                          <Button
                            onClick={handleAddMessage}
                            disabled={!newMessage.text || !newMessage.time}
                            className="w-full"
                          >
                            <Plus className="w-4 h-4 mr-2" /> Add Message
                          </Button>
                        </div>

                        {formData.messages.length > 0 && (
                          <div className="mt-6">
                            <h3 className="text-sm font-medium mb-2">
                              Added Messages
                            </h3>
                            <div className="space-y-2">
                              {formData.messages.map((msg, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 rounded bg-muted"
                                >
                                  <div>
                                    <span className="font-medium">
                                      {msg.isUser ? "You" : getContactName()}:{" "}
                                    </span>
                                    {msg.text}
                                  </div>
                                  <span className="text-sm text-muted-foreground">
                                    {msg.time}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button
                      className="ml-auto"
                      onClick={nextStep}
                      disabled={
                        (step === 1 && !formData.name) ||
                        (step === 2 && !formData.platform) ||
                        (step === 3 &&
                          (!formData.chatType ||
                            (formData.chatType === "celebrity" &&
                              !formData.celebrity) ||
                            (formData.chatType === "custom" &&
                              !formData.customName)))
                      }
                    >
                      Next <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button className="ml-auto">
                      <Download className="w-4 h-4 mr-2" /> Download Chat
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Preview */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="sticky top-8"
            >
              {/* <h3 className="text-lg font-semibold mb-4">Preview</h3> */}
              {formData.platform && step > 2 && renderChatPreview()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
