import React, { useState, useEffect } from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../api";

const TVContainer = () => {
  const [topRated, settopRated] = useState();
  const [popular, setpopular] = useState();
  const [airingToday, setairingToday] = useState();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  const loadTVData = async () => {
    setloading(true);
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      settopRated(topRated);
      setpopular(popular);
      setairingToday(airingToday);
    } catch (e) {
      seterror(e);
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    loadTVData();
  }, []);

  return (
    <TVPresenter
      topRated={topRated}
      popular={popular}
      airingToday={airingToday}
      loading={loading}
      error={error}
    />
  );
};

export default TVContainer;
