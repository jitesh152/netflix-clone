import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PAGEURL, { NAVURL } from "./pageurl";

import Home from "./components/home/Home";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import NotFoundPage from "./NotFoundPage";
import Movies from "./components/movies/Movies";
import MovieDetails from "./components/movies/MovieDetails";
import Posters from "./components/movies/Posters";
import TVShows from "./components/tvshows/TVShows";
import TVShowsDetails from "./components/tvshows/TVShowsDetails";
import TVShowFullCast from "./components/tvshows/TVShowFullCast";
import TVShowSeasonList from "./components/tvshows/TVShowSeasonList";
import TVShowSingleSeason from "./components/tvshows/TVShowSingleSeason";
import Episode from "./components/tvshows/episode/Episode";

import TrendingNow from "./components/TrendingNow";
import Person from "./components/person/Person";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={PAGEURL.trendingMovie} element={<TrendingNow />} />
          <Route path={NAVURL.movie} element={<Movies />} />
          <Route path={NAVURL.movie + '/:movieSlug'} element={<MovieDetails />} />
          <Route path={NAVURL.movie + '/:movieID/images/:imgType'} element={<Posters />} />

          <Route path={NAVURL.tv} element={<TVShows />} />
          <Route path={NAVURL.tv + '/:tvShowSlug'} element={<TVShowsDetails />} />
          <Route path={NAVURL.tv + '/:tvShowSlug/cast'} element={<TVShowFullCast />} />
          <Route path={NAVURL.tv + '/:tvShowSlug/seasons'} element={<TVShowSeasonList />} />
          <Route path={NAVURL.tv + '/:tvShowSlug/season/:seasonID'} element={<TVShowSingleSeason />} />
          <Route path={NAVURL.tv + '/:tvShowSlug/season/:seasonID/episode/:episodeID'} element={<Episode />} />

          <Route path={NAVURL.people + '/:personSlug'} element={<Person />} />
          <Route path='*' exact={true} element={<NotFoundPage/>} />
        </Routes>  
        <Footer />
      </BrowserRouter>    
    </>
  );
}

export default App
