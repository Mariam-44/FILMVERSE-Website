import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link, useNavigate } from "react-router-dom";

export default function CardSlider({ Media, title, type }) {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/ViewAll", { state: { title, data: Media, type } });
  };

  const filteredMedia = Array.isArray(Media)
    ? Media.filter((media) => media.poster_path)
    : [];

  if (!filteredMedia.length) return null;

  return (
    <div className="my-10 px-0 container mx-auto">
      <div className="section-header flex justify-between px-3">
        <h2 className="text-2xl font-bold text-textColor mb-4">{title}</h2>
        <button
          onClick={handleViewAll}
          className="text-textColor pt-4 pe-4 cursor-pointer"
        >
          See All
        </button>
      </div>

      <Swiper
        spaceBetween={10}
        slidesPerView={5}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {filteredMedia.map((media) => {
          const { id, poster_path, name, title, media_type } = media;
          const mediaTitle = title || name || "";
          

          return (
            <SwiperSlide key={id}>
              <Link to={`/CardDetails/${media_type || type}/${id}`}>
                <div className="p-2 text-center text-white">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                    alt={mediaTitle}
                    className="w-full h-full object-cover rounded-lg mx-auto mb-2"
                  />
                  <p className="font-semibold text-base line-clamp-1">
                    {mediaTitle}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
