import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import 'boxicons/css/boxicons.min.css'
import { useSignIn } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
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
    <header className='flex justify-between items-center py-4 px-4 lg:px-20'>
      {/* Example icon via boxicons */}
      <div className="flex items-center gap-2">
        <i className='bx bx-analyse text-3xl'></i>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-light m-0'>ANALYZER</h1>
      </div>

      {/* Desktop auth buttons */}
      <div className="hidden md:block z-50">
        <SignedOut>
          {/* afterSignInUrl goes on the SignInButton component, not the <button> */}
          <SignInButton mode="modal" redirectUrl="/dashboard">
            <button className='bg-[#a7a7a7] text-black py-3 px-8 rounded-full font-medium hover:bg-white transition'>
              <i className='bx bx-log-in'></i> SIGN IN
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={toggleMobileMenu} className='md:hidden text-3xl p-2 z-50' >
        <i className='bx bx-menu'></i>
      </button>

      {/* Mobile Menu - Hidden by default*/}
      <div id='mobileMenu' className='hidden fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden z-40 bg-black bg-opacity-70 backdrop:blur-md'>
        <nav className='flex flex-col gap-6 items-center'>
          {/* <a href='#' className='text-base tracking-wider transition-colors hover:text-gray-300 z-50'>
              Company 
          </a>
          <a href='#' className='text-base tracking-wider transition-colors hover:text-gray-300 z-50'>
              Features 
          </a>
          <a href='#' className='text-base tracking-wider transition-colors hover:text-gray-300 z-50'>
              Resources
          </a>
          <a href='#' className='text-base tracking-wider transition-colors hover:text-gray-300 z-50'>
              Docs 
          </a> */}
          {/* Clerk Auth Buttons for mobile */}
          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl="/dashboard">
                <button className='bg-[#a7a7a7] text-black py-3 px-8 rounded-full font-medium border-none transition-all-500 hover:bg-white cursor-pointer'>
                    SIGN IN
                </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
              <UserButton />
          </SignedIn>
        </nav>
      </div>


    </header>
  )
}

export default Header
