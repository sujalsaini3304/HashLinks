import React from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import CardLayout from '../components/CardLayout'
import Footer from '../components/Footer'

const Index = () => {
  return (
    <>
      <div className='px-2 max-w-350 w-full mx-auto'>
        <Navbar />
        <Input />
        <CardLayout />
        <Footer />
      </div>
    </>
  )
}

export default Index