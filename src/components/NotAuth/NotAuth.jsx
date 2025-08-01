import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import heartLoad from "../../assets/imgs/Love is blind.json";
import { Link } from 'react-router-dom';

export default function NotAuth() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1a1a1a] to-black text-center p-6">
      <Player
        autoplay
        loop
        src={heartLoad}
        style={{ height: "300px", width: "320px" }}
      />
      <h1 className="text-white text-3xl sm:text-4xl font-bold mt-3 drop-shadow-lg animate-pulse max-w-md">
        Love is blind... <br className="hidden sm:block" />
        <span className="text-primary-600">but your favorites don't have to be.</span><br />
       
      </h1>
       <span className="text-smfont-medium pt-10 text-gray-400">
        <Link to="/login" className='text-primary-400 pe-2'>
        Sign in
        </Link>
         to see them!
        </span>
    </div>
  );
}
