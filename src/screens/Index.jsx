import React from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import CardLayout from '../components/CardLayout'
import Footer from '../components/Footer'

const Index = () => {
  return (
    <>
      <div className='px-2 w-full mx-auto relative' style={{ maxWidth: '1400px' }} >
        <Navbar />
        <Input />
        <CardLayout />
        <Footer />
      </div>
    </>
  )
}

export default Index