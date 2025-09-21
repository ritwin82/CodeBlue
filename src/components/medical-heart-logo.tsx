import React from 'react'
import { Heart, Plus } from "lucide-react"

interface MedicalHeartLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function MedicalHeartLogo({ size = 'md', className = '' }: MedicalHeartLogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  }
  
  const heartSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-7 w-7'
  }
  
  const plusSizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3'
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-primary flex items-center justify-center relative ${className}`}>
      <Heart className={`${heartSizeClasses[size]} text-card fill-current`} />
      <Plus className={`${plusSizeClasses[size]} text-primary absolute inset-0 m-auto stroke-4`} />
    </div>
  )
}