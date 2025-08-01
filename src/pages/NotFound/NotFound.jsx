import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Notfound from "../../assets/imgs/Searching.json";
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1a1a1a] to-black text-center p-6">
      <Player
        autoplay
        loop
        src={Notfound}
        style={{ height: "300px", width: "320px" }}
      />
      <h1 className="text-white text-4xl font-bold mt-6 mb-2 drop-shadow-lg">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-300 text-lg max-w-md mb-6">
        The page you’re looking for doesn’t exist or has been moved. But hey, there’s still plenty to explore!
      </p>
      <Link
        to="/"
        className="bg-primary-600 hover:bg-primary-800 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}
