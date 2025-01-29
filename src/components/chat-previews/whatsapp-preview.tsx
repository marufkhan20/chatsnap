import { Input } from "@/components/ui/input";
import {
  Camera,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Video,
} from "lucide-react";

interface Message {
  text: string;
  time: string;
  isUser: boolean;
}

interface WhatsAppPreviewProps {
  contactName: string;
  contactImage: string;
  messages: Message[];
}

export function WhatsAppPreview({
  contactName,
  contactImage,
  messages,
}: WhatsAppPreviewProps) {
  return (
    <div className="flex flex-col h-[600px] w-full max-w-sm bg-[#E4DDD6] rounded-lg overflow-hidden border">
      {/* Header */}
      <div className="bg-[#075E54] text-white p-3 flex items-center gap-3">
        <img
          src={contactImage || "https://v0.dev/placeholder.svg"}
          alt={contactName}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="font-semibold">{contactName}</div>
          <div className="text-xs opacity-80">online</div>
        </div>
        <div className="flex items-center gap-4">
          <Video className="w-5 h-5" />
          <Phone className="w-5 h-5" />
          <MoreVertical className="w-5 h-5" />
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
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
          </div>
        ))}
      </div>

      {/* Input section */}
      <div className="bg-[#F0F2F5] p-3 flex items-center gap-2">
        <Camera className="w-6 h-6 text-[#54656F]" />
        <Paperclip className="w-6 h-6 text-[#54656F]" />
        <Input className="bg-white rounded-full" placeholder="Type a message" />
        <Mic className="w-6 h-6 text-[#54656F]" />
      </div>
    </div>
  );
}
