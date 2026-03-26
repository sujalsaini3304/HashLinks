import React from "react";
import ArrowIcon from '/arrow.png'


export default function Footer() {
  return (
    <footer className="flex justify-center items-end py-6">
      <div className="text-center py-3 text-sm opacity-90 flex items-center gap-1 ">
        <div>
          © {new Date().getFullYear()}
        </div>
        <div className='flex  items-center gap-1' >
          <div className='text-sm' >Hash<span className='font-semibold underline' >Links</span></div>
          <img
            src={ArrowIcon}
            alt='website-icon'
            height={10}
            width={10}
            className='mt-1'
          />
        </div>
        <div>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}