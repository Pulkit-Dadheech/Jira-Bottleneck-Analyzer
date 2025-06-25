import React from 'react'
import Spline from '@splinetool/react-spline'
import { useAuthModal } from '../context/AuthContext'

const Hero = () => {
  const { setShowAuthModal } = useAuthModal();
  return (
    <section className="flex flex-1 flex-col-reverse lg:flex-row items-center justify-between w-full">
      <div className="flex-1 flex items-center justify-start max-w-xl ml-[5%] z-10">
        <div>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
            Analyze Your Data <br />
            with Ease
          </h1>
          <p className='text-lg md:text-xl text-gray-600 mb-6'>
            Discover insights and trends in your data effortlessly with our powerful analysis tools.
          </p>
          <button
            className='bg-[#a7a7a7] text-black py-3 px-8 rounded-full font-medium border-none transition-all-500 hover:bg-white cursor-pointer'
            onClick={() => setShowAuthModal(true)}
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="flex-1">
        <Spline className='lg:absolute lg:top-0 top-0 bottom-0 lg:left-[25%] sm:left-[-2%] h-full' scene="https://prod.spline.design/NalwY5Corc-XmHsv/scene.splinecode" />
      </div>
    </section>
  )
}

export default Hero
