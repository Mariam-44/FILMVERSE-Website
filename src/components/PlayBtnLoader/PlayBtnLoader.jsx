import React from 'react'
import { Player } from "@lottiefiles/react-lottie-player";
import watchLoad from "../../assets/imgs/Play Button (1).json";
import { Link } from "react-router-dom";
export default function PlayBtnLoader() {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <Player
        autoplay
        loop
        src={watchLoad}
        style={{ height: "300px", width: "250px" }}
      />
      <h2 className="text-3xl font-bold text-gray-300 mb-4">
        Your Watch Later List is Empty
      </h2>
      <p className="text-gray-400 text-lg mb-8">
        Start adding movies and shows to watch them later!
      </p>
      <Link
        to="/"
        className=" px-6 py-3  bg-primary-500  text-textColor font-semibold rounded-lg hover:bg-primary-600"
      >
        <i className="fas fa-search mr-2"></i>
        Discover Movies
      </Link>
    </div>
      
    </>
  )
}
