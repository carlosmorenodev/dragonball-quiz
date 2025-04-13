import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QuizGame from './components/QuizGame'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QuizGame />
    </>
  )
}

export default App
