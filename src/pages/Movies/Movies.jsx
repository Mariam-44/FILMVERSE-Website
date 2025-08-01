import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchInput from "../../components/SearchInput/SearchInput";
import Loader from "../../components/Loader/Loader";

const categories = [
  { label: "Popular", value: "popular", endpoint: "/movie/popular" },
  { label: "Top Rated", value: "top_rated", endpoint: "/movie/top_rated" },
  {
    label: "Now Playing",
    value: "now_playing",
    endpoint: "/movie/now_playing",
  },
];

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const token = import.meta.env.VITE_TMDB_TOKEN;
   const headers = {
    accept: "application/json",
      Authorization:
          `Bearer ${token}`,
  };

  async function getMovies() {
    const selected = categories.find((c) => c.value === selectedCategory);
    const endpoint = selected?.endpoint || "/movie/popular";
    try {
      const options = {
        url: `https://api.themoviedb.org/3${endpoint}`,
        headers,
         params: { language: "en-US", page: 1 },
      };
      const { data } = await axios.request(options);
      setMovies(data.results);
      setFilteredMovies(data.results);
    } catch (error) {
      console.log("Error :", error);
    }
  }

  useEffect(() => {
    getMovies();
  }, [selectedCategory]);


  useEffect(() => {
    const filtered = movies.filter((item) =>
      (item.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchTerm, movies]);

  return (
    <div className="container mx-auto px-4 my-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl pt-16 font-bold text-white mb-4">
          All{" "}
          <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Movies
          </span>
        </h1>
      </div>
      <div className="max-w-md mx-auto mb-10">
        <SearchInput
          placeholder="Search in movies..."
          onSearch={(value) => setSearchTerm(value)}
        />
      </div>{" "}
      <div className="flex flex-wrap justify-center gap-2 my-4">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-1 text-sm rounded-full border transition ${
              selectedCategory === cat.value
                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                : "bg-primary text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      {filteredMovies && filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-4">
          {filteredMovies.map((item) => (
            <Link to={`/CardDetails/movie/${item.id}`} key={item.id}>
              <div className="text-white text-center">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                      : "https://placekitten.com/200/300"
                  }
                  alt={item.title}
                  className="w-full h-72 object-cover rounded-lg mb-2 hover:scale-105 transition-transform"
                />
                <p className="font-semibold">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
