import { useState, useEffect } from 'react'

const useCountdown = (startFrom: number) => {
  const [countdown, setCountdown] = useState(startFrom)
  const [isActive, setIsActive] = useState(false)

  const startCountdown = () => {
    setIsActive(true)
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer)
            setIsActive(false) // Stop the countdown when it reaches 0
          }
          return prevCountdown - 1
        })
      }, 1000)
    } else if (countdown === 0) {
      setIsActive(false) // Stop the countdown when it reaches 0
    }

    // Clear the interval when the component unmounts or countdown reaches 0
    return () => clearInterval(timer)
  }, [isActive, countdown])

  const restartCountdown = () => {
    setCountdown(startFrom)
    startCountdown()
  }

  return { countdown, startCountdown, restartCountdown }
}

export default useCountdown
