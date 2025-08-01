import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import CardSlider from "../../components/CardSlider/CardSlider";
import HeaderSlider from "../../components/HeaderSlider/HeaderSlider";
import Loader from "../../components/Loader/Loader";
import GenreGrid from "../../components/GenreGrid/GenreGrid";
import Trending from "../../components/Trending/Trending";
import Aos from "aos";

export default function Home() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = import.meta.env.VITE_TMDB_TOKEN;

  async function getMedia(type = "movie", category = "top_rated", setterFunc) {
    try {
      const options = {
        url: `https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.request(options);
      setterFunc(data.results);
    } catch (error) {
      console.log("Error :", error);
    }
  }

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    async function getAllMedia() {
      await Promise.all([
        getMedia("movie", "top_rated", setTopRatedMovies),
        getMedia("movie", "popular", setPopularMovies),
        getMedia("tv", "top_rated", setTopRatedSeries),
        getMedia("tv", "popular", setPopularSeries),
      ]);
      setLoading(false);
      Aos.refresh();
    }
    getAllMedia();
  }, []);

  return (
    <>
      <HeaderSlider data-aos="fade-down" />

      {!loading ? (
        <>
          <div data-aos="fade-up">
            <CardSlider
              Media={topRatedMovies}
              type="movie"
              title="Top Rated Movies"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <CardSlider
              Media={popularMovies}
              type="movie"
              title="Popular Movies"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <GenreGrid />
          </div>
          <div data-aos="fade-up" data-aos-delay="300">
            <CardSlider
              Media={topRatedSeries}
              type="tv"
              title="Top Rated Series"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="400">
            <CardSlider
              Media={popularSeries}
              type="tv"
              title="Popular Series"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="500">
            <Trending />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
