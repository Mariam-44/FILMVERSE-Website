import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import CardSlider from "../../components/CardSlider/CardSlider";
import { useWishlist } from "../../context/Favorite.Context";

export default function CardDetails() {
  const [itemDetails, setItemDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [cast, setCast] = useState([]);
  const { id, type } = useParams();

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const token = import.meta.env.VITE_TMDB_TOKEN;
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  async function getDetails() {
    try {
      const options = {
        url: `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
        headers,
      };
      const { data } = await axios.request(options);
      setItemDetails(data);
    } catch (error) {
      console.log("Error getting details:", error);
    }
  }
  async function getTrailer() {
    try {
      const options = {
        url: `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`,
        headers,
      };
      const { data } = await axios.request(options);
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (error) {
      console.log("Error getting details:", error);
    }
  }

    async function getCast() {
    try {
      const options = {
        url: `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`,
        headers,
      };
      const { data } = await axios.request(options);
     setCast(data.cast);
    } catch (error) {
      console.log("Error getting details:", error);
    }
  }
    async function getRecommendations() {
    try {
      const options = {
        url: `https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US&page=1`,
        headers,
      };
      const { data } = await axios.request(options);
     setRecommendations(data.results);
    } catch (error) {
      console.log("Error getting details:", error);
    }
  }

  useEffect(() => {
    getDetails();
    getTrailer();
    getCast();
    getRecommendations();
  }, [id, type]);

  const handleWishlistClick = () => {
    if (!itemDetails) return;

    if (isInWishlist(itemDetails.id)) {
      removeFromWishlist(itemDetails.id);
    } else {
      addToWishlist({
        itemId: itemDetails.id,
        title: itemDetails.title || itemDetails.name,
        poster_path: itemDetails.poster_path,
        type: type,
      });
    }
  };

  return (
    <>
      {itemDetails ? (
        <div className="container mx-auto">
          <div className="grid grid-cols-12 xl:px-48 xs:px-16 pt-32 mt-7 mx-auto">
            <div className="col-span-12">
              {trailerKey ? (
                <div className="w-full aspect-video -mt-16">
                  <ReactPlayer
                    src={`https://www.youtube.com/watch?v=${trailerKey}`}
                    controls
                    width="100%"
                    height="100%"
                    playing
                    muted
                    className="rounded-xl overflow-hidden cursor-pointer"
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="col-span-12 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-16 mt-6 sm:mt-8 md:mt-10">
                <div className="space-y-3 sm:space-y-4 md:col-span-3 pt-4 sm:pt-6 md:pt-10 order-2 md:order-1">
                  <div>
                    <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-textColor pt-1 sm:pt-2">
                      {itemDetails.title || itemDetails.name}
                    </h2>
                    <h3 className="text-primary-400 font-semibold pt-2 sm:pt-3 text-sm sm:text-base">
                      {itemDetails.release_date || itemDetails.first_air_date}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-sm sm:text-base">
                    {itemDetails.overview}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-3 sm:pt-4">
                    {itemDetails.genres?.map((genre) => (
                      <span
                        key={genre.id}
                        className="border border-gray-200 text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 pt-4 sm:pt-6">
                    <div className="bg-yellow-500 text-bgColor font-extrabold p-0.5 sm:p-1 px-1 sm:px-2 rounded-xs sm:rounded-sm text-xs sm:text-sm">
                      IMDB
                    </div>
                    <span className="text-textColor text-base sm:text-lg font-bold">
                      {itemDetails.vote_average?.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-3 flex-wrap">
                    <div className="bg-primary-400 text-gray-200 font-semibold p-1.5 sm:p-2 px-2 sm:px-3 rounded-md sm:rounded-lg hover:bg-primary-600 cursor-pointer text-sm sm:text-base">
                      Watch Now
                    </div>
                    <div className="border-gray-300 border text-gray-200 font-semibold p-1.5 sm:p-2 px-2 sm:px-3 rounded-md sm:rounded-lg hover:bg-slate-100 hover:text-bgColor cursor-pointer text-sm sm:text-base">
                      Watch Later
                    </div>
                    <i
                      className={`${
                        isInWishlist(itemDetails.id)
                          ? "fa-solid text-red-500"
                          : "fa-regular text-gray-200"
                      } fa-heart text-xl sm:text-2xl cursor-pointer`}
                      onClick={handleWishlistClick}
                    ></i>
                  </div>
                </div>

                <div className="md:col-span-2 overflow-hidden  w-80 sm:w-64 md:w-80 h-auto rounded-md order-1 md:order-2">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${itemDetails.poster_path}`}
                    alt={itemDetails.title || itemDetails.name}
                    className="rounded w-full h-auto max-h-[400px] sm:max-h-none sm:h-full object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 mt-24">
              <h3 className="text-3xl font-semibold text-white mb-7">Cast</h3>
              <Swiper
                modules={[Scrollbar]}
                spaceBetween={20}
                slidesPerView={4}
                scrollbar={{ draggable: true }}
                breakpoints={{
                  320: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 5 },
                }}
              >
                {cast?.map((actor) => (
                  <SwiperSlide key={actor.id}>
                    <div className="text-center text-white">
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                            : "https://via.placeholder.com/200x300?text=No+Image"
                        }
                        alt={actor.name}
                        className="w-40 h-100 object-cover rounded-lg mx-auto mb-2"
                      />
                      <p className="font-semibold">{actor.name}</p>
                      <p className="text-sm text-gray-400">{actor.character}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="col-span-12 mt-24">
              <CardSlider
                Media={recommendations}
                title="Recommended For You"
                type="movie"
              />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
