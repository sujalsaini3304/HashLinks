import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from './screens/Index'
import Dashboard from './screens/Dashboard'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Index/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
    </>
  )
}

export default App