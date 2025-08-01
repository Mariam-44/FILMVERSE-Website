import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchInput from "../../components/SearchInput/SearchInput";
import Loader from "../../components/Loader/Loader";

export default function Series() {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = import.meta.env.VITE_TMDB_TOKEN;
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  async function getSeriesShow() {
    try {
      const options = {
        url: "https://api.themoviedb.org/3/tv/top_rated",
        headers,
        params: {
          language: "en-US",
          page: 1,
          region: "US",
        },
      };
      const { data } = await axios.request(options);
      setShows(data.results);
      setFilteredShows(data.results);
    } catch (error) {
      console.log("Error :", error);
    }
  }

  useEffect(() => {
    getSeriesShow();
  }, []);

  useEffect(() => {
    const filtered = shows.filter((item) => {
      const title = item.name || item.original_name || "";
      return title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredShows(filtered);
  }, [searchTerm, shows]);

  return (
    <div className="container mx-auto px-4 my-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl pt-16 font-bold text-white mb-4">
          All{" "}
          <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Series
          </span>
        </h1>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <SearchInput
          placeholder="Search TV Shows..."
          onSearch={(value) => setSearchTerm(value)}
        />
      </div>

      {filteredShows && filteredShows.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredShows.map((item) => (
            <Link to={`/CardDetails/tv/${item.id}`} key={item.id}>
              <div className="text-white text-center">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                      : "https://placekitten.com/200/300"
                  }
                  alt={item.name || item.original_name}
                  className="w-full h-72 object-cover rounded-lg mb-2 hover:scale-105 transition-transform"
                />
                <p className="font-semibold">
                  {item.name || item.original_name}
                </p>
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
