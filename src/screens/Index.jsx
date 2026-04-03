import React from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import CardLayout from '../components/CardLayout'
import Footer from '../components/Footer'
import ArrowIcon from '/arrow.png'


const Index = () => {
  return (
    <>
      <div className='px-2 w-full mx-auto relative' style={{ maxWidth: '1400px' }} >
        <Navbar />
        <div className='py-2  bg-yellow-200 text-lg font-light' >
          <marquee >
            <div className='flex items-center' >
              Generated <span className='underline flex mx-1  items-center gap-1' >
                <span className='text-xl' >Hash<span className='font-semibold underline' >Links</span></span>
                <img
                  src={ArrowIcon}
                  alt='website-icon'
                  height={12}
                  width={12}
                  className='mt-1 mr-4'
                />
              </span>
              are only valid till for one hour. Upgrade account for unlimited access with no expiry. Contact developer for more info.
            </div>
          </marquee>
        </div>
        <Input />
        <CardLayout />
        <Footer />
      </div>
    </>
  )
}

export default Index