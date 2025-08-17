import React, { useEffect, useState } from "react";
import { useWishlist } from "../../context/Favorite.Context";
import { useWatchLater } from "../../context/WatchLater.Context";
import CardSlider from "../../components/CardSlider/CardSlider";
import axios from "axios";
import ProfileSideBar from "../../components/ProfileSideBar/ProfileSideBar";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const [trending, setTrending] = useState([]);
  const [userName, setUserName] = useState("");

  const { wishlist, getWishlist } = useWishlist();
  const { watchLater, getWatchLater } = useWatchLater();

  const token = import.meta.env.VITE_TMDB_TOKEN;
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  async function getTrending() {
    try {
      const options = {
        url: "https://api.themoviedb.org/3/trending/movie/day",
        headers,
        params: { language: "en-US" },
      };
      const { data } = await axios.request(options);
      setTrending(data.results);
    } catch (error) {
      console.log("Error :", error);
    }
  }
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("Guest");
      }
    });

    getWishlist();
    getWatchLater();
    getTrending();

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-bgColor">
      <div className="relative z-10 flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 px-4 sm:px-6 md:px-8 lg:px-10 pt-16 sm:pt-18 md:pt-20 pb-8 md:pb-10">
        <div className="relative w-full lg:w-3/4 order-2 lg:order-1 pt-10 md:pt-0 ">
          <div className="relative group">
            <div className="relative h-60 sm:h-72 md:h-80 rounded-2xl md:rounded-3xl  bg-gradient-to-r to-black via-red-800 from-black">
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
                  <div className="relative">
                    <div class="relative w-36 h-36 overflow-hidden bg-gray-100  rounded-full dark:bg-gray-600">
                      <svg
                        class="absolute w-36 h-36 text-gray-400 top-4 "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div className="flex-1 mt-6 sm:pb-4 md:pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold  text-gray-300 ">
                        {userName}
                      </h1>
                    </div>
                    <p className="text-gray-300 text-base sm:text-lg font-light mb-2 sm:mb-4">
                      Exploring the World Through Cinema
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 space-y-6 sm:space-y-8">
            <div className="rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden">
              <div className=" sm:p-6 md:p-8 border-b border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12  rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                      <i class="fa-solid fa-heart text-3xl bg-primary-600 text-textColor p-3 pe-10 rounded-2xl"></i>
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-3xl font-bold text-white">
                        Your Favorites
                      </h2>
                      <p className="text-gray-400 text-sm sm:text-base">
                        Movies you love the most
                      </p>
                    </div>
                  </div>
                  <div className="bg-red-500/20 backdrop-blur-sm text-red-300 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold border border-red-500/30 w-fit sm:w-auto">
                    {wishlist?.length || 0} movies
                  </div>
                </div>
              </div>
              <div className="px-10">
                <CardSlider Media={wishlist} title="" type="movie" />
              </div>
            </div>
            <div className="rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden">
              <div className=" sm:p-6 md:p-8 border-b border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                      <i className="fa-solid fa-clock text-3xl bg-white/10 text-textColor sm:p-3 sm:pe-10 rounded-2xl"></i>
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-3xl font-bold text-white">
                        Watch Later
                      </h2>
                      <p className="text-gray-400 text-sm sm:text-base">
                        Movies you saved to watch later
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-500/20 backdrop-blur-sm text-blue-300 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold border border-blue-500/30 w-fit sm:w-auto">
                    {watchLater?.length || 0} movies
                  </div>
                </div>
              </div>
              <div className="px-10">
                <CardSlider Media={watchLater} title="" type="movie" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/4 space-y-4 sm:space-y-6 md:space-y-8 order-3 lg:order-2">
          <div className="rounded-2xl md:rounded-3xl border border-white/10 ">
            <div className="p-4 sm:p-6 border-b border-white/10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12  rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <i class="fa-solid fa-chart-line text-xl bg-primary-600 text-textColor p-3 pe-8 rounded-2xl"></i>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Trending Now
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    What's hot today
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <ProfileSideBar Media={trending} title="" type="movie" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
