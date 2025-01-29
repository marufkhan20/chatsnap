import { Input } from "@/components/ui/input";
import { Heart, Image, Info, Phone, Send, Video } from "lucide-react";

interface Message {
  text: string;
  time: string;
  isUser: boolean;
}

interface InstagramPreviewProps {
  contactName: string;
  contactImage: string;
  messages: Message[];
}

export function InstagramPreview({
  contactName,
  contactImage,
  messages,
}: InstagramPreviewProps) {
  return (
    <div className="flex flex-col h-[600px] w-full max-w-sm bg-white rounded-lg overflow-hidden border">
      {/* Header */}
      <div className="border-b p-3 flex items-center gap-3">
        <img
          src={contactImage || "https://v0.dev/placeholder.svg"}
          alt={contactName}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1 font-semibold">{contactName}</div>
        <div className="flex items-center gap-4">
          <Phone className="w-5 h-5" />
          <Video className="w-5 h-5" />
          <Info className="w-5 h-5" />
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            {!message.isUser && (
              <img
                src={contactImage || "https://v0.dev/placeholder.svg"}
                alt={contactName}
                className="w-6 h-6 rounded-full mr-2"
              />
            )}
            <div
              className={`max-w-[70%] rounded-2xl p-3 ${
                message.isUser ? "bg-[#0095F6] text-white" : "bg-gray-100"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-[10px] opacity-70 mt-1">{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input section */}
      <div className="border-t p-3 flex items-center gap-2">
        <Image className="w-6 h-6 text-gray-600" />
        <Input className="bg-gray-100 rounded-full" placeholder="Message..." />
        <Heart className="w-6 h-6 text-gray-600" />
        <Send className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  );
}
