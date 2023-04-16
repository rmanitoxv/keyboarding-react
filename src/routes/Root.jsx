import React from 'react'
import Menu from '../components/Menu'
import Sidebar from '../components/Sidebar'

const Root = () => {
  if(!localStorage.getItem('theme')) localStorage.setItem('theme', '#7dd3fc')
  return (
    <div className='h-screen bg-mainmenu bg-cover relative overflow-hidden'>
      <div className=' flex flex-col h-full justify-center items-center text-8xl text-center'>
        <p className='font-neonderthaw'>
            Welcome to 
        </p>
        <p className='font-raleway text-cyan-400 font-bold mb-8'>
            TECHNO<span className='text-yellow-300'>T</span>YPER
        </p>
        <Menu />
        <Sidebar />
      </div>
    </div>
  )
}

export default Root