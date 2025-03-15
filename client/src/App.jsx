import { useState } from 'react'
import './App.css'
import Form from './components/form/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="main-container">
        <Form />
      </div>
      
    </>
  )
}

export default App
