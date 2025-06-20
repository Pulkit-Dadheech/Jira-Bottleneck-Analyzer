import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

// this component lives inside BrowserRouter, so we can call useNavigate()
function ClerkWithRouter({ children }) {
  const navigate = useNavigate()
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      // Clerk will call this instead of window.location
      navigate={(to) => navigate(to)}
    >
      {children}
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkWithRouter>
        <App />
      </ClerkWithRouter>
    </BrowserRouter>
  </StrictMode>,
)
