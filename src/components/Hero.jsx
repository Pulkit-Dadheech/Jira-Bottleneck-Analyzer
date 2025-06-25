import React from 'react'
import Spline from '@splinetool/react-spline'
import { useAuthModal } from '../context/AuthContext'

const Hero = () => {
  const { setShowAuthModal } = useAuthModal();
  return (
    <section className="flex flex-1 flex-col-reverse lg:flex-row items-center justify-between w-full">
      <div className="flex-1 flex items-center justify-start max-w-xl ml-[5%] z-10">
        <div className="backdrop-blur-md p-10  shadow-xl max-w-xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
            <span className="text-white">Workflow Analytics</span><br />
            <span className="text-black text-outline-white">Made Effortless</span>
          </h1>
          <p className="text-md md:text-md text-gray-300 mb-6">
            Upload your CSV and instantly visualize your business process, spot bottlenecks, and get actionable AI recommendations—all in a secure, private dashboard.
          </p>
          <ul className="mb-8 space-y-2">
            <li className="flex items-center text-gray-400 text-base"><span className="mr-2 text-indigo-400">&#10003;</span> Path Tree & Process Maps</li>
            <li className="flex items-center text-gray-400 text-base"><span className="mr-2 text-indigo-400">&#10003;</span> Delay & Violation Analytics</li>
            <li className="flex items-center text-gray-400 text-base"><span className="mr-2 text-indigo-400">&#10003;</span> Personalized, Secure Insights</li>
          </ul>
          <button
            className="bg-gradient-to-r bg-black border-white border-[1px] hover:bg-white hover:text-black py-3 px-10 rounded-full font-bold shadow-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
            onClick={() => setShowAuthModal(true)}
          >
            Get Started Free
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
