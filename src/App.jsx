import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleAction = () => {
    if (count < 3) {
      setCount(count + 1)
    }
  }

  const handleReset = () => {
    setCount(0)
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
    </div>
  )
}

export default App
