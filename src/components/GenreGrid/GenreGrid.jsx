import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function GenreGrid() {
  const [Geners, setGeners] = useState([]);
  const token = import.meta.env.VITE_TMDB_TOKEN;

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);



  async function GenresPosters() {
    const genreOptions = {
      url: "https://api.themoviedb.org/3/genre/movie/list",
      method: "GET",
      headers: {
        accept: "application/json",
           Authorization:
          `Bearer ${token}`,
      },
    };

    try {
      const { data: genreData } = await axios.request(genreOptions);

      const allowedIds = [28, 12, 16, 35, 80, 27];
      const genres = genreData.genres.filter((genre) =>
        allowedIds.includes(genre.id)
      );

      const top6 = genres.slice(0, 6);

      const promises = top6.map(async (genre) => {
        const movieOptions = {
          url: `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&sort_by=popularity.desc`,
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzhhNGY3ZmZmYjk3ZWU1NzRmMzdjMDI4MjdhODgzYyIsIm5iZiI6MTc1MzgxMzg4Mi4xNjIsInN1YiI6IjY4ODkxMzdhNDNlODNmMjE5Y2VkMDIwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G_3ZKGFydbPSEpsdfs0Iho9hriJ4cNgSMe9nwgkIfiA",
          },
        };

        const { data: movieData } = await axios.request(movieOptions);
        const genreMovies = movieData.results;
        let ImgPath;

        if (genre.name === "Comedy") {
          ImgPath = genreMovies[5]?.backdrop_path;
        } else if (genre.name === "Horror") {
          ImgPath = genreMovies[11]?.backdrop_path;
        } else {
          ImgPath = genreMovies[14]?.backdrop_path;
        }

        return {
          ...genre,
          image: ImgPath
            ? `https://image.tmdb.org/t/p/w780${ImgPath}`
            : null,
        };
      });

      const genresData = await Promise.all(promises);
      setGeners(genresData);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  useEffect(() => {
    GenresPosters();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-white text-3xl font-bold mb-6">Top Genres</h2>
      <div className="grid grid-cols-4 grid-rows-4 gap-5 w-full h-screen">
        {Geners.map((genre, index) => (
          <div
            key={genre.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className={`rounded-lg overflow-hidden ${
              index === 0 ? "col-start-1 col-end-3 row-start-1 row-end-2" : ""
            }
            ${index === 1 ? "col-start-3 col-end-5 row-start-1 row-end-2" : ""}
            ${index === 2 ? "col-start-1 col-end-3 row-start-2 row-end-4" : ""}
            ${index === 3 ? "col-start-1 col-end-2 row-start-4 row-end-5" : ""}
            ${index === 4 ? "col-start-2 col-end-3 row-start-4 row-end-5" : ""}
            ${
              index === 5 ? "col-start-3 col-end-5 row-start-2 row-end-5" : ""
            }`}
          >
            <Link
              to="/viewgenres"
              state={{
                title: genre.name,
                data: genre,
                type: "genre",
              }}
              className=" w-full h-full text-white font-bold text-xl flex items-end p-4 bg-cover bg-center relative cursor-pointer"
              style={{
                backgroundImage: genre.image
                  ? `url(${genre.image})`
                  : undefined,
                backgroundColor: genre.image ? "" : "#333",
              }}
            >
              <div className="uppercase w-full py-2 px-4 absolute bottom-0 left-0">
                {genre.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
