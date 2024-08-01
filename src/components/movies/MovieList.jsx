import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import GenreList from "./GenreList";
import Pagination from "../common/Pagination";

import requests, { fetchAllMoviesURL, fetchMoviesByURL, tbdbImgBaseURL } from "../../requests";
import AxiosInstance from "../../axios";
import { stringToSlug, changePageTitle, scrollToTop } from "../../functions";
import { NAVURL } from "../../pageurl";
import { MOVIESURL } from "../../pageurl";

const MovieList = ( {genreID, pageTitle = 'Movies List' } ) => {

    const [sortBy, setSortBy] = useState('vote_count.desc');
    const [movieData, setMovieData] = useState([]);
    const [loading, setLoading] = useState('loading');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect( () => {
        const fetchData = async () => {
            setLoading('loading');

            const APIURL = ( genreID in MOVIESURL ) ? fetchMoviesByURL( MOVIESURL[genreID].fetchurl, currentPage, sortBy ) : fetchAllMoviesURL( currentPage, sortBy, genreID );

            try {
                const request = await AxiosInstance.get(APIURL);
                setMovieData(request.data);
                setTotalPages(request.data.total_pages);
                setTimeout( () => {
                    setLoading('');
                }, 1000 );
                scrollToTop();
            } catch (error) {
                
            }
        }
       
        fetchData();
        changePageTitle(pageTitle);
    }, [sortBy, currentPage, genreID] );

    return (
        <section className="allmovies-section py-4">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="__sticky">
                            <h3 className="mb-4">Genre List</h3>
                            <GenreList fetchURL={requests.fetchMovieGenres} genreID={genreID} />
                        </div>
                    </div>
                    <div className={"col-lg-9 " + loading}>
                        {
                            (typeof movieData.results !== 'undefined' && movieData.results !== null)
                            ?
                            <>
                                <div className="row mb-4">
                                    <div className="col-sm-6">
                                        <h3>Total Results: {movieData.total_results}</h3>
                                    </div>
                                    <div className="col-sm-6 text-right">
                                        <div className="d-flex justify-content-end">
                                            <label htmlFor="sort"><strong>Sort Results By:</strong> &nbsp;</label>
                                            <select value={sortBy} name="sortBy" className="" onChange={(e)=>setSortBy(e.target.value)}>
                                                <option value="popularity.desc">Popularity Descending</option>
                                                <option value="popularity.asc">Popularity Ascending</option>
                                                <option value="vote_average.desc">Rating Descending</option>
                                                <option value="vote_average.asc">Rating Ascending</option>
                                                <option value="primary_release_date.desc">Release Date Descending</option>
                                                <option value="primary_release_date.asc">Release Date Ascending</option>
                                                <option value="vote_count.asc">Vote Count Ascending</option>
                                                <option value="vote_count.desc">Vote Count Descending</option>
                                                <option value="title.asc">Title (A-Z)</option>
                                                <option value="title.desc">Title (Z-A)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {
                                        movieData.results.map( (movie, i) => {
                                            const movieName = (typeof movie.title !== 'undefined' && movie.title !== null) ? movie.title : movie.name;
                                            const movieSlug = NAVURL.movie + '/' + movie.id + '-' + stringToSlug(movieName);
                                            return(
                                                <div key={i} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                                    <div className="movie-list-wrap">
                                                        <div className="image">
                                                            <Link to={movieSlug}>
                                                                    <img src={tbdbImgBaseURL + movie.poster_path} alt={movieName} />
                                                                </Link>
                                                            </div>
                                                        <div className="name">
                                                            <Link to={movieSlug}>{movieName}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        } )
                                    }
                                </div>
                                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                            </>
                            : null
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
export default MovieList;