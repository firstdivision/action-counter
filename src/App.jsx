import { useState, useEffect } from 'react'
import NoSleep from 'nosleep.js'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [wakeLockActive, setWakeLockActive] = useState(false)
  const [noSleep] = useState(new NoSleep())
  const [toast, setToast] = useState({ show: false, message: '' })

  useEffect(() => {
    return () => {
      // Clean up wake lock on unmount
      if (wakeLockActive && noSleep) {
        noSleep.disable()
      }
    }
  }, [wakeLockActive, noSleep])

  const showToast = (message) => {
    setToast({ show: true, message })
    setTimeout(() => {
      setToast({ show: false, message: '' })
    }, 2000)
  }

  const handleAction = () => {
    if (count < 3) {
      setCount(count + 1)
    }
  }

  const handleReset = () => {
    setCount(0)
  }

  const toggleWakeLock = async () => {
    if (!wakeLockActive) {
      try {
        // Try modern Screen Wake Lock API first (Android)
        if (navigator.wakeLock) {
          await navigator.wakeLock.request('screen')
        }
        // Use NoSleep as fallback/enhancement (works better on iOS)
        await noSleep.enable()
        setWakeLockActive(true)
        showToast('Screen will stay on')
      } catch (err) {
        console.error('Failed to enable wake lock:', err)
        showToast('Failed to enable wake lock')
      }
    } else {
      try {
        noSleep.disable()
        setWakeLockActive(false)
        showToast('Screen can now sleep')
      } catch (err) {
        console.error('Failed to disable wake lock:', err)
        showToast('Failed to disable wake lock')
      }
    }
  }

  return (
    <div className="app-container">
      <div className="counter-display">
        <h1>{count}</h1>
      </div>
      <div className="button-container">
        <button 
          className="action-button" 
          onClick={handleAction}
          disabled={count >= 3}
        >
          Action
        </button>
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <button 
        className={`wake-lock-button ${wakeLockActive ? 'active' : ''}`}
        onClick={toggleWakeLock}
        title={wakeLockActive ? 'Screen will stay on' : 'Screen may sleep'}
      >
        {wakeLockActive ? '🔒' : '💤'}
      </button>
      {toast.show && <div className="toast">{toast.message}</div>}
    </div>
  )
}

export default App
