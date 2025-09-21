import React, { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send, Paperclip, Mic } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  sidebarOpen?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export function ChatInput({
  onSendMessage,
  disabled,
  sidebarOpen = false,
  onExpandedChange,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandedChange = (expanded: boolean) => {
    setIsExpanded(expanded);
    onExpandedChange?.(expanded);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div 
      className={`fixed bottom-4 z-50 transition-all duration-500 ease-in-out ${
        sidebarOpen 
          ? 'left-1/2 ml-40 transform -translate-x-1/2' 
          : 'left-1/2 transform -translate-x-1/2'
      }`}
    >
      <div className={`bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 rounded-xl border border-border shadow-lg transition-all duration-500 ease-in-out ${
        isExpanded ? "w-[800px]" : "w-fit"
      }`}>
        <div
          className={`transition-all duration-500 ease-in-out mx-auto ${isExpanded ? "w-full p-4" : "w-fit px-1 py-1"}`}
        >
          <form
            onSubmit={handleSubmit}
            className={`transition-all duration-500 ${isExpanded ? "space-y-3" : "space-y-0"}`}
          >
            <div className="relative">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => handleExpandedChange(true)}
                onBlur={() => {
                  if (!message.trim()) {
                    handleExpandedChange(false);
                  }
                }}
                placeholder={
                  isExpanded
                    ? "Ask me anything about your health..."
                    : "Ask me anything..."
                }
                className={`transition-all duration-500 resize-none border-input bg-input-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring ${
                  isExpanded
                    ? "min-h-[60px] max-h-[200px] pr-20 w-full"
                    : "min-h-[40px] max-h-[40px] pr-65"
                }`}
                disabled={disabled}
              />
              <div
                className={`absolute transition-all duration-500 ${isExpanded ? "bottom-2 right-2 flex gap-1" : "bottom-1 right-1 flex gap-0"}`}
              >
                {isExpanded && (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground opacity-0 animate-in fade-in-0 duration-500"
                      disabled={disabled}
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground opacity-0 animate-in fade-in-0 duration-500 delay-75"
                      disabled={disabled}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                  </>
                )}
                <Button
                  type="submit"
                  size="sm"
                  disabled={!message.trim() || disabled}
                  className={`bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500 ${
                    isExpanded
                      ? "gap-2 px-3"
                      : "gap-1 px-2 h-6 w-6"
                  }`}
                >
                  <Send
                    className={`transition-all duration-500 ${isExpanded ? "h-4 w-4" : "h-3 w-3"}`}
                  />
                  {isExpanded && "Send"}
                </Button>
              </div>
            </div>

            {isExpanded && (
              <div className="flex justify-between items-center animate-in fade-in-0 slide-in-from-top-2 duration-500">
                <p className="text-xs text-muted-foreground">
                  Press Enter to send, Shift + Enter for new
                  line
                </p>
              </div>
            )}
          </form>

          {isExpanded && (
            <div className="mt-3 text-center animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-150">
              <p className="text-xs text-muted-foreground">
                Healthcare Assistant can make mistakes. Please
                verify important information.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}