import React from 'react'
import Header from './Header.jsx'
import Hero from './Hero.jsx'
import { Navigate } from 'react-router-dom'

const HomePage = () => {
  // Redirect authenticated users to dashboard
  const token = localStorage.getItem('token')
  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <main className="flex flex-col min-h-screen relative">
      {/*Gradient image */}
      <img className='absolute top-0 right-0 opacity-60 -z-1' src="/images/gradient.png" alt="Gradient-img" />
      {/* Blue effect */}
      <div className='h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#e99b63] -rotate-[30deg] -z-10'></div>

      <Header />
      <div className="flex-1 flex">
        <Hero />
      </div>

      {/* Footer */}
    </main>
  )
}

export default HomePage
