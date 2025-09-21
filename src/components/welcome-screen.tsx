import React from 'react'
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Heart, MessageCircle, Shield, Clock, Stethoscope, Pill, Calendar, Activity } from "lucide-react"

interface WelcomeScreenProps {
  onSendMessage: (message: string) => void
}

export function WelcomeScreen({ onSendMessage }: WelcomeScreenProps) {
  const suggestions = [
    {
      icon: Stethoscope,
      title: "Symptom Check",
      description: "Describe your symptoms for general guidance",
      prompt: "I'm experiencing some symptoms and would like general guidance."
    },
    {
      icon: Pill,
      title: "Medication Info",
      description: "Get information about medications",
      prompt: "Can you provide information about a medication?"
    },
    {
      icon: Calendar,
      title: "Health Reminders",
      description: "Set up health and wellness reminders",
      prompt: "Help me set up health reminders and wellness tips."
    },
    {
      icon: Activity,
      title: "Wellness Tips",
      description: "Get personalized wellness advice",
      prompt: "I'd like some personalized wellness and lifestyle tips."
    }
  ]

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
              <Heart className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl text-foreground">Welcome to Healthcare Assistant</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your personal AI health companion. Get reliable health information, 
            symptom guidance, and wellness support 24/7.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon
            return (
              <Card 
                key={index}
                className="p-6 cursor-pointer hover:bg-accent/50 transition-colors border-border bg-card"
                onClick={() => onSendMessage(suggestion.prompt)}
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base text-foreground">{suggestion.title}</h3>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Important Notice */}
        <Card className="p-6 bg-accent/20 border-accent">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="text-sm text-foreground">Important Medical Disclaimer</h3>
              <p className="text-sm text-muted-foreground">
                This AI assistant provides general health information only and is not a substitute 
                for professional medical advice, diagnosis, or treatment. Always consult with 
                healthcare professionals for medical concerns.
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="flex justify-center">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <p className="text-2xl text-foreground">24/7</p>
            <p className="text-sm text-muted-foreground">Available</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <p className="text-2xl text-foreground">Private</p>
            <p className="text-sm text-muted-foreground">& Secure</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <p className="text-2xl text-foreground">Instant</p>
            <p className="text-sm text-muted-foreground">Responses</p>
          </div>
        </div>
      </div>
    </div>
  )
}