import React from 'react'
import { Button } from "./ui/button"
import { Menu, X, Sun, Moon } from "lucide-react"
import { MedicalHeartLogo } from "./medical-heart-logo"
import { useTheme } from "./theme-provider"

interface ChatHeaderProps {
  onMenuClick: () => void
  sidebarOpen?: boolean
}

export function ChatHeader({ onMenuClick, sidebarOpen = false }: ChatHeaderProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <header className="border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMenuClick}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMenuClick}
            className="hidden lg:flex"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
          <div className="flex items-center gap-2">
            <MedicalHeartLogo size="md" />
            <div>
              <h1 className="text-lg font-medium text-foreground">Healthcare Assistant</h1>
              <p className="text-xs text-muted-foreground">Your personal health companion</p>
            </div>
          </div>
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleTheme}
          className="text-foreground hover:bg-accent"
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </div>
    </header>
  )
}