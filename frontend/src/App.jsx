import React from 'react'
import Nav from './components/Nav'
import Mainroutes from './routes/Mainroutes'

const App = () => {
  return (
    <div className='w-full min-h-screen bg-gray-300 flex flex-col gap-[2rem]'>
      <Nav/>
      <Mainroutes/>
    </div>
  )
}

export default App
