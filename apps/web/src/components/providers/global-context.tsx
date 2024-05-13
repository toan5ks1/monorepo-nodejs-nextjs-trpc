'use client'

import { StepTitle, otpExpireTime } from '@/utils/config'
import React, { ReactNode, createContext, useContext, useState } from 'react'

// Define your context type

interface UserInfo {
  phone?: string
}

interface GlobalStateContextType {
  // Define your state variables and functions here
  step: number
  title: string
  nextStep: () => void
  updateTitle: (newTitle: string) => void
  setUserInfo: (info: UserInfo) => void
  userInfo: UserInfo
}

// Create context
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined,
)

// Custom hook to consume the context
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext)
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider')
  }
  return context
}

// Provider component
export const GlobalStateProvider = ({ children }: React.PropsWithChildren) => {
  const [step, setStep] = useState(0)
  const [title, setTitle] = useState(StepTitle[0])
  const [userInfo, setUserInfo] = useState({})

  const nextStep = () => {
    setStep((pre) => pre + 1)
    setTitle(StepTitle[step + 1])
  }

  const updateTitle = (newTitle: string) => {
    setTitle(newTitle)
  }

  return (
    <GlobalStateContext.Provider
      value={{ userInfo, setUserInfo, step, nextStep, title, updateTitle }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}
