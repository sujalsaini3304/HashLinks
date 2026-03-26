import React from 'react'
import Icon from '/hash.png'
import ArrowIcon from '/arrow.png'
import { LogOutIcon } from 'lucide-react'

const Navbar = () => {
    return (
        <>
            <div className='h-16 sticky top-0 z-50 bg-white shadow-sm flex items-center justify-between px-4 ' >

                <div className='flex items-center gap-2'>
                    <img
                        src={Icon}
                        alt='website-icon'
                        height={40}
                        width={40}
                    />
                    <div className='flex items-center gap-1' >
                        <div className='text-xl' >Hash<span className='font-semibold underline' >Links</span></div>
                        <img
                            src={ArrowIcon}
                            alt='website-icon'
                            height={12}
                            width={12}
                            className='mt-1'
                        />
                    </div>
                </div>

                <div>
                    <ul type='none' className='flex items-center text-lg'>
                        <li></li>
                        <li onClick={()=>{
                            alert("Coming soon");
                        }} className='hover:cursor-pointer hover:underline hover:font-semibold flex items-center gap-1 ' > <LogOutIcon size={20} /> Logout</li>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Navbar