import React from 'react'
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Card } from "./ui/card"
import { Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  
  return (
    <div className={`flex gap-3 max-w-4xl mx-auto px-4 py-6 ${
      isUser ? 'flex-row-reverse' : ''
    }`}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className={`${
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-accent text-accent-foreground'
        }`}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex-1 space-y-2 ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div className={`inline-block max-w-[80%] ${
          isUser 
            ? 'bg-primary text-primary-foreground rounded-lg px-4 py-2' 
            : ''
        }`}>
          <p className={`text-sm leading-relaxed ${
            isUser ? 'text-primary-foreground' : 'text-foreground'
          }`}>
            {message.content}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}