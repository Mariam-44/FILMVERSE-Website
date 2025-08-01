import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import CardSlider from "../../components/CardSlider/CardSlider";
import HeaderSlider from "../../components/HeaderSlider/HeaderSlider";
import Loader from "../../components/Loader/Loader";
import GenreGrid from "../../components/GenreGrid/GenreGrid";
import Trending from "../../components/Trending/Trending";

export default function Home() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = import.meta.env.VITE_TMDB_TOKEN;
  const fetchMedia = async (type = "movie", category = "top_rated", setterFunc) => {
    const options = {
      url: `https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1`,
      method: "GET",
      headers: {
        accept: "application/json",
           Authorization:
          `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.request(options);
      setterFunc(data.results);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchAll = async () => {
      await Promise.all([
        fetchMedia("movie", "top_rated", setTopRatedMovies),
        fetchMedia("movie", "popular", setPopularMovies),
        fetchMedia("tv", "top_rated", setTopRatedSeries),
        fetchMedia("tv", "popular", setPopularSeries),
      ]);
      setLoading(false);
      AOS.refresh(); 
    };

    fetchAll();
  }, []);

  return (
    <>
      <HeaderSlider data-aos="fade-down" />

      {!loading ? (
        <>
          <div data-aos="fade-up">
            <CardSlider Media={topRatedMovies} type="movie" title="Top Rated Movies" />
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <CardSlider Media={popularMovies} type="movie" title="Popular Movies" />
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <GenreGrid />
          </div>
          <div data-aos="fade-up" data-aos-delay="300">
            <CardSlider Media={topRatedSeries} type="tv" title="Top Rated Series" />
          </div>
          <div data-aos="fade-up" data-aos-delay="400">
            <CardSlider Media={popularSeries} type="tv" title="Popular Series" />
          </div>
          <div data-aos="fade-up" data-aos-delay="500">
           <Trending/>
          </div>

          
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
