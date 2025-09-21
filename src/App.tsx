import React, { useState, useRef, useEffect } from 'react'
import { ThemeProvider } from './components/theme-provider'
import { ChatHeader } from './components/chat-header'
import { ChatSidebar } from './components/chat-sidebar'
import { ChatMessage } from './components/chat-message'
import { ChatInput } from './components/chat-input'
import { WelcomeScreen } from './components/welcome-screen'
import { ScrollArea } from './components/ui/scroll-area'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

interface ChatHistory {
  id: string
  title: string
  timestamp: string
  messages: Message[]
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [textboxExpanded, setTextboxExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentChat = chatHistory.find(chat => chat.id === currentChatId)
  const messages = currentChat?.messages || []

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI response with healthcare-focused content
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    const responses = [
      "Thank you for reaching out. Based on what you've described, here are some general considerations to keep in mind. However, I strongly recommend consulting with a healthcare professional for personalized advice.",
      "I understand your concern. While I can provide general health information, it's important to remember that every individual's health situation is unique. Please consider discussing this with your doctor.",
      "That's a great question about health and wellness. Here's some general information that might be helpful, but always consult with healthcare professionals for medical advice specific to your situation.",
      "I appreciate you sharing this with me. From a general health perspective, here are some points to consider. Remember, this information is educational and not a substitute for professional medical advice.",
      "Thank you for your question. Here's some general health information that might be useful. However, for any health concerns, please consult with a qualified healthcare provider for proper evaluation and treatment."
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = async (content: string) => {
    const messageId = Date.now().toString()
    const timestamp = new Date().toISOString()
    
    const userMessage: Message = {
      id: messageId,
      content,
      role: 'user',
      timestamp
    }

    let updatedChatHistory = [...chatHistory]
    
    if (!currentChatId) {
      // Create new chat
      const newChatId = Date.now().toString()
      const newChat: ChatHistory = {
        id: newChatId,
        title: content.length > 50 ? content.substring(0, 50) + '...' : content,
        timestamp: new Date().toLocaleString(),
        messages: [userMessage]
      }
      updatedChatHistory = [newChat, ...chatHistory]
      setCurrentChatId(newChatId)
    } else {
      // Add to existing chat
      updatedChatHistory = chatHistory.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    }
    
    setChatHistory(updatedChatHistory)
    setIsTyping(true)

    try {
      const assistantResponse = await generateResponse(content)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: assistantResponse,
        role: 'assistant',
        timestamp: new Date().toISOString()
      }

      setChatHistory(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: [...chat.messages, assistantMessage] }
          : chat
      ))
    } catch (error) {
      console.error('Error generating response:', error)
    } finally {
      setIsTyping(false)
    }
  }

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId)
    setSidebarOpen(false)
  }

  const handleNewChat = () => {
    setCurrentChatId(null)
    setSidebarOpen(false)
  }

  const handleDeleteChat = (chatId: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId))
    if (currentChatId === chatId) {
      setCurrentChatId(null)
    }
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="healthcare-chat-theme">
      <div className="flex h-screen bg-background text-foreground">
        {/* Sidebar */}
        <div className={`transition-all duration-500 ease-in-out ${sidebarOpen ? 'lg:w-80' : 'lg:w-0'} flex-shrink-0 overflow-hidden lg:relative`}>
          <div className={`transform transition-transform duration-500 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}>
            <ChatSidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              chatHistory={chatHistory}
              onSelectChat={handleSelectChat}
              onNewChat={handleNewChat}
              onDeleteChat={handleDeleteChat}
              activeChat={currentChatId || undefined}
            />
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
          
          {messages.length === 0 ? (
            <WelcomeScreen onSendMessage={handleSendMessage} textboxExpanded={textboxExpanded} />
          ) : (
            <ScrollArea className="flex-1">
              <div className={`space-y-0 transition-all duration-500 ${textboxExpanded ? 'pb-48' : 'pb-20'}`}>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 max-w-4xl mx-auto px-4 py-6">
                    <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Healthcare Assistant is typing...</p>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          )}
        </div>
        
        {/* Floating Chat Input */}
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping} 
          sidebarOpen={sidebarOpen}
          onExpandedChange={setTextboxExpanded}
        />
      </div>
    </ThemeProvider>
  )
}