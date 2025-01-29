import { Input } from "@/components/ui/input";
import { Mic, MoreVertical, Paperclip, Phone, Sticker } from "lucide-react";

interface Message {
  text: string;
  time: string;
  isUser: boolean;
}

interface TelegramPreviewProps {
  contactName: string;
  contactImage: string;
  messages: Message[];
}

export function TelegramPreview({
  contactName,
  contactImage,
  messages,
}: TelegramPreviewProps) {
  return (
    <div className="flex flex-col h-[600px] w-full max-w-sm bg-white rounded-lg overflow-hidden border">
      {/* Header */}
      <div className="bg-[#5682a3] text-white p-3 flex items-center gap-3">
        <img
          src={contactImage || "https://v0.dev/placeholder.svg"}
          alt={contactName}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="font-semibold">{contactName}</div>
          <div className="text-xs opacity-80">last seen recently</div>
        </div>
        <div className="flex items-center gap-4">
          <Phone className="w-5 h-5" />
          <MoreVertical className="w-5 h-5" />
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#e6ebee]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-2 ${
                message.isUser ? "bg-[#effdde]" : "bg-white"
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

      {/* Input area */}
      <div className="bg-white p-3 flex items-center gap-2">
        <Paperclip className="w-6 h-6 text-gray-600" />
        <Input
          className="bg-white border rounded-full"
          placeholder="Write a message..."
        />
        <Sticker className="w-6 h-6 text-gray-600" />
        <Mic className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  );
}
