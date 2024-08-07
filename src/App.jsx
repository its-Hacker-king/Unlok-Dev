import React from 'react'
import AppRoutes from './Routes/AppRoutes'
import './App.css'

const App = () => {
  return (
    <div className="absolute text-white top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <AppRoutes/>
    </div>
  )
}

export default App