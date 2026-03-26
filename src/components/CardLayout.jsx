import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import useStore from "../../store";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default function CardLayout() {
  const { shortURL } = useStore();
  return (
    <div className="min-h-120 flex items-center justify-center bg-gradient-to-r from-orange-400 to-purple-400 p-6">

      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl rounded-3xl p-6 w-[320px] text-center text-white">

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">Scan Me</h2>
        <p className="text-sm opacity-80 mb-4">
          Access your link instantly
        </p>

        {/* QR Code */}
        { shortURL ?  <div className="flex justify-center mb-4">
          <div className="bg-white p-3 rounded-2xl shadow-md">
            <QRCodeCanvas
              value={shortURL}
              size={140}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
            />
          </div>
        </div> :
        <div className="flex justify-center  " >
          <DotLottieReact
            src="/qr_scan.lottie"
            loop
            autoplay
          />
        </div>
        }

        {/* Footer Info */}
        <div className="mt-4">
          <p className="text-sm font-semibold">QR Code</p>
          <p className="text-xs opacity-70">Powered by HashLinks</p>
        </div>

      </div>
    </div>
  );
}