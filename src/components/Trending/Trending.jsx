import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Trending() {
  const [movies, setMovies] = useState([]);
  const token = import.meta.env.VITE_TMDB_TOKEN;

  async function getTrendingMovies() {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
        {
          headers: {
            accept: "application/json",
              Authorization:
          `Bearer ${token}`,
          },
        }
      );

      setMovies(res.data.results?.slice(0, 9) || []);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (
    <div className="py-10 px-0 container mx-auto">
      <h2 className="text-white text-2xl font-bold mb-6">
        Trending This Weak
      </h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        initialSlide={1}
        slidesPerView={3}
        spaceBetween={0}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="w-full max-w-7xl mx-auto"
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <Link to={`/CardDetails/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-[400px] h-[380px] object-cover rounded-xl"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
