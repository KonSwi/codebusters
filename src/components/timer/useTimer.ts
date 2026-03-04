import React from 'react'

export type TimerMode = 'stopwatch' | 'countdown'

export const useTimer = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [mode, setMode] = React.useState<TimerMode>('stopwatch')
  const [seconds, setSeconds] = React.useState<number>(0)
  const [isRunning, setIsRunning] = React.useState<boolean>(false)
  const [inputMinutes, setInputMinutes] = React.useState<string>('')
  const [isPageVisible, setIsPageVisible] = React.useState<boolean>(true)

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden)
    }

    handleVisibilityChange()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  React.useEffect(() => {
    if (!isRunning || mode !== 'stopwatch' || !isPageVisible) return

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, mode, isPageVisible])

  React.useEffect(() => {
    if (!isRunning || mode !== 'countdown' || !isPageVisible) return
    if (seconds <= 0) return

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, mode, seconds, isPageVisible])

  const toggleOpen = () => setIsOpen((prev) => !prev)

  const resetAll = () => {
    setIsRunning(false)
    setSeconds(0)
    setInputMinutes('')
  }

  const toggleStopwatchRunning = () => setIsRunning((prev) => !prev)

  const handleCountdownStartPause = () => {
    if (isRunning) {
      setIsRunning(false)
      return
    }

    if (seconds === 0) {
      const minutesRaw = inputMinutes.trim()
      const minutes = Number(minutesRaw)
      if (!minutesRaw || Number.isNaN(minutes) || minutes <= 0) return
      setSeconds(minutes * 60)
    }

    setIsRunning(true)
  }

  const setStopwatchMode = () => {
    if (isRunning) return
    setMode('stopwatch')
    setSeconds(0)
    setInputMinutes('')
  }

  const setCountdownMode = () => {
    if (isRunning) return
    setMode('countdown')
    setSeconds(0)
    setInputMinutes('')
  }

  const minutesRaw = inputMinutes.trim()
  const minutes = Number(minutesRaw)
  const countdownStartDisabled =
    !isRunning &&
    seconds === 0 &&
    (!minutesRaw || Number.isNaN(minutes) || minutes <= 0)

  return {
    isOpen,
    mode,
    seconds,
    isRunning,
    inputMinutes,
    countdownStartDisabled,
    setInputMinutes,
    toggleOpen,
    resetAll,
    setStopwatchMode,
    setCountdownMode,
    toggleStopwatchRunning,
    handleCountdownStartPause,
  }
}
