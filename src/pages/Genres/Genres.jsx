import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchInput from "../../components/SearchInput/SearchInput";
import axios from "axios";

export default function Genres() {
  const location = useLocation();
  const { title, data: genre } = location.state || {};
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const token = import.meta.env.VITE_TMDB_TOKEN;

  async function GenreMovies() {
    try {
      const options = {
        url: `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&sort_by=popularity.desc`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      setMovies(data.results);
      setFilteredMovies(data.results);
    } catch (error) {
      console.log("Error getting details:", error);
    }
  }

  useEffect(() => {
    if (!genre?.id) return;
    GenreMovies();
  }, [genre]);
  

  useEffect(() => {
    const filtered = movies.filter((item) => {
      const mediaTitle = item.title || item.name || "";
      return mediaTitle.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredMovies(filtered);
  }, [searchTerm, movies]);

  if (!genre || !genre.id)
    return <p className="text-white">No genre selected.</p>;

  return (
    <div className="container mx-auto px-4 my-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl pt-16 font-bold text-white mb-4">
          All{" "}
          <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <SearchInput
          placeholder={`Search In ${title}...`}
          onSearch={(value) => setSearchTerm(value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredMovies.map((item) => {
          const mediaTitle = item.title || item.name || "Untitled";

          return (
            <Link to={`/CardDetails/movie/${item.id}`} key={item.id}>
              <div className="text-white text-center">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={mediaTitle}
                  className="w-full h-72 object-cover rounded-lg mb-2 hover:scale-105 transition-transform"
                />
                <p className="font-semibold">{mediaTitle}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
