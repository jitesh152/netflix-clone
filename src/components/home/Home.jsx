
import RowView from '../common/RowView'
import requests from "../../requests";
import PAGEURL from '../../pageurl';

import Banner from './Banner';

import { changePageTitle } from '../../functions';
import { useEffect } from 'react';

export default function Home() {

    useEffect( () => {
        changePageTitle('Home');
    } )

    return (
        <>
            <Banner />
            <RowView title="NETFLIX ORIGINALS" fetchURL = {requests.fetchNetflixOriginals} />
            <RowView title="Trending Now" fetchURL = {requests.fetchTrending} pageURL={PAGEURL.trendingMovie} />
            <RowView title="Top Rated" fetchURL = {requests.fetchTopRated} pageURL={PAGEURL.topRatedMovie} />
            <RowView title="Upcoming Movies" fetchURL = {requests.fetchUpcomingMovies} pageURL={PAGEURL.upcomingMovie} />
            <RowView title="Action Movies" fetchURL = {requests.fetchActionMovies} pageURL={PAGEURL.actionMovie} />
            <RowView title="Horror Movies" fetchURL = {requests.fetchHorrorMovies} pageURL={PAGEURL.horrorMovie} />
            <RowView title="Romance Movies" fetchURL = {requests.fetchRomanceMovies} pageURL={PAGEURL.romanceMovie} />
        </>
    )
}
