import React from 'react'
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { Plus, MessageSquare, Trash2 } from "lucide-react"

interface ChatHistory {
  id: string
  title: string
  timestamp: string
}

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
  chatHistory: ChatHistory[]
  onSelectChat: (id: string) => void
  onNewChat: () => void
  onDeleteChat: (id: string) => void
  activeChat?: string
}

export function ChatSidebar({ 
  isOpen, 
  onClose, 
  chatHistory, 
  onSelectChat, 
  onNewChat, 
  onDeleteChat,
  activeChat 
}: ChatSidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-screen w-80 bg-card border-r border-border z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="p-4 border-b border-border">
            <Button 
              onClick={onNewChat}
              className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
          </header>

          {/* Chat History */}
          <ScrollArea className="flex-grow py-4">
            <div className="px-4 space-y-2">
              <h3 className="text-sm text-muted-foreground mb-3">Recent Chats</h3>
              {chatHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No chat history yet
                </p>
              ) : (
                chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      activeChat === chat.id 
                        ? 'bg-accent text-accent-foreground' 
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => onSelectChat(chat.id)}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm truncate">{chat.title}</p>
                        <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto text-muted-foreground hover:text-destructive"
                      onClick={(e: { stopPropagation: () => void }) => {
                        e.stopPropagation()
                        onDeleteChat(chat.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <footer className="mt-auto p-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Healthcare Assistant v1.0
            </p>
          </footer>
        </div>
      </aside>
    </>
  )
}