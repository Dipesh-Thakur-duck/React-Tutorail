import { useState } from 'react'
import './App.css'

function App() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <h1 className="title">Hello, welcome to my website</h1>
      <input placeholder="Email" className="emailEl" />
      <div className="password-container">
        <input
          placeholder="Password"
          className="passwordEl"
          type={showPassword ? 'text' : 'password'}
        />
        <button
          className="show-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <div className="btn-container">
        <button className="btn">Login</button>
        <button className="btn">Sign up</button>
      </div>
    </>
  )
}

export default App