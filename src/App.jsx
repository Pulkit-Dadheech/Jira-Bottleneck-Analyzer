import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import HomePage from './components/HomePage'
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from './context/SidebarContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SidebarProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </SidebarProvider>
    </>
  )
}

export default App
