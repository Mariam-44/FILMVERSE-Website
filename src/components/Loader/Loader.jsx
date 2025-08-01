import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import load from "../../assets/imgs/CinemaAnimation.json";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1a1a1a] to-black text-center p-6">
      <Player
        autoplay
        loop
        src={load}
        style={{ height: "300px", width: "320px" }}
      />
    
    </div>
  );
}
