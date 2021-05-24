import React, { useState, useEffect } from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "../../api";

const HomeContainer = () => {
  const [nowPlaying, setnowPlaying] = useState();
  const [upcoming, setupcoming] = useState();
  const [popular, setpopular] = useState();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  const loadMovieData = async () => {
    setloading(true);
    seterror(null);
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      setnowPlaying(nowPlaying);
      setupcoming(upcoming);
      setpopular(popular);
    } catch (e) {
      seterror(e);
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    loadMovieData();
  }, []);

  return (
    <HomePresenter
      nowPlaying={nowPlaying}
      upcoming={upcoming}
      popular={popular}
      error={error}
      loading={loading}
    />
  );
};

export default HomeContainer;
