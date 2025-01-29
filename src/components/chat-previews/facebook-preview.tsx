import { Input } from "@/components/ui/input";
import { Image, Info, Phone, Sticker, ThumbsUp, Video } from "lucide-react";

interface Message {
  text: string;
  time: string;
  isUser: boolean;
}

interface FacebookPreviewProps {
  contactName: string;
  contactImage: string;
  messages: Message[];
}

export function FacebookPreview({
  contactName,
  contactImage,
  messages,
}: FacebookPreviewProps) {
  return (
    <div className="flex flex-col h-[600px] w-full max-w-sm bg-white rounded-lg overflow-hidden border">
      {/* Header */}
      <div className="border-b p-3 flex items-center gap-3 bg-white">
        <img
          src={contactImage || "https://v0.dev/placeholder.svg"}
          alt={contactName}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="font-semibold">{contactName}</div>
          <div className="text-xs text-green-500">Active Now</div>
        </div>
        <div className="flex items-center gap-4">
          <Phone className="w-5 h-5 text-blue-600" />
          <Video className="w-5 h-5 text-blue-600" />
          <Info className="w-5 h-5 text-blue-600" />
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
                message.isUser ? "bg-[#0084ff] text-white" : "bg-gray-100"
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
        <Image className="w-6 h-6 text-blue-600" />
        <Sticker className="w-6 h-6 text-blue-600" />
        <Input className="bg-gray-100 rounded-full" placeholder="Aa" />
        <ThumbsUp className="w-6 h-6 text-blue-600" />
      </div>
    </div>
  );
}
