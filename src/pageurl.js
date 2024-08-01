import requests from "./requests";

export const NAVURL = {
    movie : '/movie',
    tv : '/tv',
    people : '/person',
}

// These are url which do not have movie genre id
export const MOVIESURL = {
    'top-rated' : { title: 'Top Rated', fetchurl : requests.fetchTopRated },
    'upcoming' : { title: 'Upcoming', fetchurl : requests.fetchUpcomingMovies },
};

// These are url which do not have tv genre id
export const TVSHOWSURL = {
    'top-rated' : { title: 'Top Rated', fetchurl : 'top_rated' },
    'popular' : { title: 'TV Shows', fetchurl : 'popular' },
    'on-the-air' : { title: 'On The Air', fetchurl : 'on_the_air' },
    'airing-today' : { title: 'Airing Today', fetchurl : 'airing_today' },
};

const PAGEURL = {
    trendingMovie : '/trending-now',
    topRatedMovie : NAVURL.movie + '/top-rated',
    upcomingMovie : NAVURL.movie + '/upcoming',
    actionMovie   : NAVURL.movie + '/action',
    horrorMovie   : NAVURL.movie + '/horror',
    romanceMovie  : NAVURL.movie + '/romance',
    documentries  : NAVURL.movie + '/documentary',

    airingTodayTVShow   : NAVURL.tv + '/airing-today',
    onTheAirTVShow      : NAVURL.tv + '/on-the-air',
    topRatedTVShow      : NAVURL.tv + '/top-rated',
}

export default PAGEURL;