import React, { useEffect } from 'react'
import {
  SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser
} from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import 'boxicons/css/boxicons.min.css'

const Header = () => {
    // Clerk user state and navigation for post-sign-in redirect
    const { isLoaded, isSignedIn } = useUser()
    const navigate = useNavigate()
    useEffect(() => {
      if (isLoaded && isSignedIn) {
        navigate('/dashboard')
      }
    }, [isLoaded, isSignedIn, navigate])

    // Function to toggle the mobile menu
    const toggleMobileMenu = () => {
        const mobileMenu = document.getElementById('mobileMenu');

        // if it has hidden class remove it, otherwise add it

        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
        } else { 
        mobileMenu.classList.toggle('hidden');
        }
    }
  return (
    <header className='flex justify-between items-center py-4 px-4 lg:px-20 h-14'>
      {/* Example icon via boxicons */}
      <div className="flex items-center gap-2">
        <i className='bx bx-analyse text-2xl'></i>
        <h1 className='text-2xl md:text-2xl lg:text-3xl font-light m-0'>ANALYZER</h1>
      </div>

      {/* Desktop navigation links */}
      {/* <nav className='hidden md:flex items-center gap-8'>
        <a href='#company' className='text-base tracking-wider transition-colors hover:text-gray-300'>Company</a>
        <a href='#features' className='text-base tracking-wider transition-colors hover:text-gray-300'>Features</a>
        <a href='#resources' className='text-base tracking-wider transition-colors hover:text-gray-300'>Resources</a>
        <a href='#docs' className='text-base tracking-wider transition-colors hover:text-gray-300'>Docs</a>
      </nav> */}

      {/* Desktop auth buttons */}
      <div className="hidden md:flex items-center gap-4 z-50">
        <SignedOut>
          <SignInButton mode="modal" redirectUrl="/dashboard">
            <button className='bg-[#a7a7a7] text-black py-3 px-8 rounded-full font-medium hover:bg-white transition'>
              <i className='bx bx-log-in'></i> SIGN IN
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <SignOutButton redirectUrl="/" />
        </SignedIn>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={toggleMobileMenu} className='md:hidden text-3xl p-2 z-50' >
        <i className='bx bx-menu'></i>
      </button>

      {/* Mobile Menu - Hidden by default*/}
      <div id='mobileMenu' className='hidden fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden z-40 bg-black bg-opacity-70 backdrop:blur-md'>
        <nav className='flex flex-col gap-6 items-center'>
          {/* Clerk Auth Buttons for mobile */}
          <SignedOut>
            <SignInButton mode="modal" redirectUrl="/dashboard" />
          </SignedOut>
          <SignedIn>
            <UserButton />
            <SignOutButton redirectUrl="/" />
          </SignedIn>
        </nav>
      </div>


    </header>
  )
}

export default Header
