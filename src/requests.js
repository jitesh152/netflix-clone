
const APIKEY = '';

const TommorrowDate = ( num = 6 ) => {
    let today = new Date();
    let nextDay = new Date(today);
    nextDay.setDate(today.getDate() + num);
    return nextDay.toISOString().slice(0, 10);
}

const requests = {
    fetchTrending           : '/trending/all/week?api_key=' + APIKEY + '&language=en-US',
    fetchTrendingDay        : '/trending/all/day?api_key=' + APIKEY + '&language=en-US',
    fetchNetflixOriginals   : '/discover/tv?api_key=' + APIKEY + '&with_networks=213',
    fetchTopRated           : '/discover/movie?api_key=' + APIKEY + '&language=en-US&without_genres=99,10755&vote_count.gte=200',
    fetchUpcomingMovies     : '/discover/movie?language=en-US&with_release_type=2|3&release_date.gte='+ TommorrowDate() +'&release_date.lte='+TommorrowDate(180)+'&api_key=' + APIKEY,
    fetchActionMovies       : '/discover/movie?api_key=' + APIKEY + '&with_genres=28',
    fetchComedyMovies       : '/discover/movie?api_key=' + APIKEY + '&with_genres=35',
    fetchHorrorMovies       : '/discover/movie?api_key=' + APIKEY + '&with_genres=27',
    fetchRomanceMovies      : '/discover/movie?api_key=' + APIKEY + '&with_genres=10749',
    fetchDocumentries       : '/discover/movie?api_key=' + APIKEY + '&with_genres=99',

    fetchMovieGenres        : '/genre/movie/list?api_key=' + APIKEY + '&language=en',
    fetchTvGenres           : '/genre/tv/list?api_key=' + APIKEY + '&language=en',
}

export default requests;

export const tbdbImgBaseURL = 'https://image.tmdb.org/t/p/original';

/*================================
        Movie API URL
=================================*/

export const fetchMovieDetailsURL = ( movieID ) => {
    if( (typeof movieID !== 'undefined' && movieID !== null) ) {
        return '/movie/'+ movieID +'?api_key=' + APIKEY;
    } 
    return;
}
export const fetchMovieCastURL = ( movieID ) => {
    if( (typeof movieID !== 'undefined' && movieID !== null) ) {
        return '/movie/'+ movieID +'/credits?language=en-US&api_key=' + APIKEY;
    } 
    return;
}
export const fetchMovieRecommendationsURL = ( movieID ) => {
    if( (typeof movieID !== 'undefined' && movieID !== null) ) {
        return '/movie/'+ movieID +'/recommendations?language=en-US&api_key=' + APIKEY;
    } 
    return;
}
export const fetchMovieSimilarURL = ( movieID ) => {
    if( (typeof movieID !== 'undefined' && movieID !== null) ) {
        return '/movie/'+ movieID +'/similar?language=en-US&api_key=' + APIKEY;
    } 
    return;
}
export const fetchMovieVideosURL = ( movieID ) => {
    if( (typeof movieID !== 'undefined' && movieID !== null) ) {
        return '/movie/'+ movieID +'/videos?api_key=' + APIKEY;
    } 
    return;
}
export const fetchMovieImagesURL = ( movieID ) => {
    if( (typeof movieID !== 'undefined' && movieID !== null) ) {
        return '/movie/'+ movieID +'/images?api_key=' + APIKEY;
    } 
    return;
}
export const fetchAllMoviesURL = ( page = 1, sortBy = 'popularity.asc', genreID = '' ) => {
    const genre = ( genreID !== '' && genreID !== 0 ) ? '&with_genres=' + genreID : '';
    return '/discover/movie?language=en-US&page='+ page +'&sort_by='+ sortBy +'&api_key=' + APIKEY + genre;
}
export const fetchAllTopRatedMoviesURL = ( page = 1, sortBy = 'vote_average.desc' ) => {
    return  requests.fetchTopRated + '&page='+ page + '&sort_by=' + sortBy;
}
export const fetchMoviesByURL = ( fetchURL, page = 1, sortBy = 'vote_average.desc') => {
    if( fetchURL === '' ) return;
    return  fetchURL + '&page='+ page + '&sort_by=' + sortBy;
}


/*================================
        Person API URL
=================================*/ 

export const fetchPersonDetailsURL = ( personID ) => {
    if( (typeof personID !== 'undefined' && personID !== null) ) {
        return '/person/'+ personID +'?api_key=' + APIKEY;
    } 
    return;
}
export const fetchPersonCreditsURL = ( personID, type = 'all' ) => {
    if( (typeof personID !== 'undefined' && personID !== null) ) {
        if( type === 'movie' )
            return '/person/'+ personID +'/movie_credits?api_key=' + APIKEY;
        else if( type === 'tv' ) 
            return '/person/'+ personID +'/tv_credits?api_key=' + APIKEY;
        else 
            return '/person/'+ personID +'/combined_credits?api_key=' + APIKEY;
    } 
    return;
}

/*================================
        TV Shows API URL
=================================*/

export const fetchTVShowsURL = ( type = 'popular', page = 1 ) => {
    return '/tv/'+ type +'?language=en-US&api_key=' + APIKEY + '&page=' + page
}
export const fetchAllTVShowsURL = ( page = 1, sortBy = 'popularity.asc', genreID = '' ) => {
    const genre = ( genreID !== '' && genreID !== 0 ) ? '&with_genres=' + genreID : '';
    return '/discover/tv?language=en-US&page='+ page +'&sort_by='+ sortBy +'&api_key=' + APIKEY + genre;
}
export const fetchTVShowsDetailsURL = ( tvShowsID ) => {
    if( (typeof tvShowsID !== 'undefined' && tvShowsID !== null) ) {
        return '/tv/'+ tvShowsID +'?language=en-US&api_key=' + APIKEY;
    } 
    return;
}
export const fetchTVShowsVideosURL = ( tvShowsID ) => {
    if( (typeof tvShowsID !== 'undefined' && tvShowsID !== null) ) {
        return '/tv/'+ tvShowsID +'/videos?api_key=' + APIKEY;
    } 
    return;
}
export const fetchTVShowsCastURL = ( tvShowsID ) => {
    if( (typeof tvShowsID !== 'undefined' && tvShowsID !== null) ) {
        return '/tv/'+ tvShowsID +'/credits?language=en-US&api_key=' + APIKEY;
    } 
    return;
}
export const fetchTVShowsRecommendationsURL = ( tvShowsID ) => {
    if( (typeof tvShowsID !== 'undefined' && tvShowsID !== null) ) {
        return '/tv/'+ tvShowsID +'/recommendations?language=en-US&api_key=' + APIKEY;
    } 
    return;
}
export const fetchTVShowsSimilarURL = ( tvShowsID ) => {
    if( (typeof tvShowsID !== 'undefined' && tvShowsID !== null) ) {
        return '/tv/'+ tvShowsID +'/similar?language=en-US&api_key=' + APIKEY;
    } 
    return;
}
export const fetchTVShowsSeasonURL = ( tvShowsID, seasonID ) => {
    if( (typeof tvShowsID !== 'undefined' && tvShowsID !== null && typeof seasonID !== 'undefined') ) {
        return '/tv/'+ tvShowsID +'/season/'+ seasonID +'?language=en-US&api_key=' + APIKEY;
    } 
    return;
}
export const fetchTVShowsSeasonEpisodeURL = ( tvShowsID, seasonID, episodeID ) => {
    if( (typeof tvShowsID !== 'undefined' && tvShowsID !== null && typeof seasonID !== 'undefined' && typeof episodeID !== 'undefined') ) {
        return '/tv/'+ tvShowsID +'/season/'+ seasonID +'/episode/'+ episodeID +'?language=en-US&api_key=' + APIKEY;
    } 
    return;
}
export const fetchTVShowEpisodeVideosURL = ( tvShowsID, seasonID, episodeID ) => {
    if( (typeof tvShowsID !== 'undefined' && tvShowsID !== null) && typeof episodeID !== 'undefined' && typeof seasonID !== 'undefined' ) {
        return '/tv/'+ tvShowsID +'/season/'+ seasonID +'/episode/'+ episodeID +'/videos?language=en-US&api_key=' + APIKEY;
    } 
    return;
}
export const fetchTVShowEpisodeImageURL = ( tvShowsID, seasonID, episodeID ) => {
    if( (typeof tvShowsID !== 'undefined' && tvShowsID !== null) && typeof episodeID !== 'undefined' && typeof seasonID !== 'undefined' ) {
        return '/tv/'+ tvShowsID +'/season/'+ seasonID +'/episode/'+ episodeID +'/images?language=en-US&api_key=' + APIKEY;
    } 
    return;
}