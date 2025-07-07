import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Message } from "@/types/message";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  const copyMessage = () => {
    navigator.clipboard.writeText(message.content || "");
    toast.success("Message copied");
  };

  return (
    <div
      className={`flex gap-4 group ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isUser ? (
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="bg-emerald-500 text-white">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      ) : null}

      <div
        className={`max-w-[60%] space-y-2 ${
          isUser ? "text-right" : "text-left"
        }`}
      >
        <div
          className={`inline-block px-4 py-2 ${
            isUser
              ? "bg-emerald-700 text-white rounded-t-xl rounded-bl-xl"
              : "bg-gray-50 border border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors duration-200 rounded-t-xl rounded-br-xl"
          }`}
        >
          <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">
            {message.content}
          </div>
        </div>

        <div
          className={`flex items-center gap-2 ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {!isUser && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                onClick={copyMessage}
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-gray-600"
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-emerald-600"
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-red-500"
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
