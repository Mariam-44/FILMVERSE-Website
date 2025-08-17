import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export default function PopularMoviesSlider() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const token = import.meta.env.VITE_TMDB_TOKEN;
  
const headers = {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  async function getPopularMovies() {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      headers,
    };

    try {
      const { data } = await axios.request(options);
      const slicedMovies = data.results.slice(9, 15);
      setMovies(slicedMovies);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPopularMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  const currentMovie = movies[currentIndex];

  return (
    <>
      {movies.length > 0 ? (
        <div className="relative top-0">
          <div className="h-[100vh] relative overflow-hidden">
            {movies.map((movie, index) => (
              <div
              key ={movie.id}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
              </div>
            ))}

            <div className="relative z-20  px-6  md:px-16 text-white flex flex-col justify-center  h-full">
              <h1 className="sm:text-2xl text-3xl md:text-4xl lg:text-6xl font-bold mb-4 ">
                {currentMovie?.title}
              </h1>
              <p className="text-md md:text-lg   max-w-2xl line-clamp-2 xs:line-clamp-3 ">
                {currentMovie?.overview?.slice(0, 200) ||
                  "No description available."}
              </p>
              <div className="flex items-center gap-3 pt-10">
                <Link to={`/CardDetails/movie/${currentMovie?.id}`} className="bg-primary-400 text-base text-gray-200 font-semibold p-2 px-3 rounded-lg hover:bg-primary-600 cursor-pointer">
               Watch Now
                </Link>

                <div className="border-gray-300 border text-gray-200 font-semibold p-2 px-3 rounded-lg hover:bg-slate-100 hover:text-bgColor cursor-pointer">
                  Watch Later
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 w-2/6 end-0 px-10 md:px-16 pb-4 z-30">
            <Swiper
              spaceBetween={10}
              slidesPerView={3}
              modules={[Autoplay]}
              autoplay={{ delay: 5000 }}
            >
              {movies.map((movie, index) => (
                <SwiperSlide key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className={`rounded-md cursor-pointer hover:scale-105 transition-transform duration-300 border-2 ${
                      index === currentIndex
                        ? "border-white"
                        : "border-transparent"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
