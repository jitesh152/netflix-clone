import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DefaultBanner from "./common/DefaultBanner";
import { changePageTitle, stringToSlug, scrollToTop } from "../functions";
import Pagination from "./common/Pagination";
import requests, { tbdbImgBaseURL, fetchMoviesByURL } from "../requests";
import AxiosInstance from "../axios";
import { NAVURL } from "../pageurl";

export default function TrendingNow() {

    const [APIRequest, setAPIRequest] = useState(requests.fetchTrending);
    const [activeClass, setActiveClass] = useState({daily: '', weekly: 'active'});

    const [sortBy, setSortBy] = useState('vote_count.desc');
    const [movieData, setMovieData] = useState([]);
    const [loading, setLoading] = useState('loading');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleClick = (e) => {
        let name = e.target.name;
        if( name === 'daily' ) {
            setActiveClass({daily: 'active', weekly: ''});
            setAPIRequest(requests.fetchTrendingDay);
            setCurrentPage(1);
        } else {
            setActiveClass({daily: '', weekly: 'active'});
            setAPIRequest(requests.fetchTrending);
            setCurrentPage(1);
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect( () => {

        const fetchData = async() => {
            setLoading('loading');
            try {
                const APIURL = fetchMoviesByURL(APIRequest, currentPage, sortBy);
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
        changePageTitle('Trending Now');
    },[APIRequest, sortBy, currentPage] )

    return (
        <>
            <DefaultBanner pageTitle={ 'Trending Now' } bannerImg="/assets/images/cinema-film-poster.jpg" />

            <section className="trendingnow-section py-4">
                <div className={loading + ' container'}>
                    {
                        (typeof movieData.results !== 'undefined' && movieData.results !== null)
                        ?
                        <>
                            <div className="row mb-4 align-items-center">
                                <div className="col-md-4 col-lg-4 text-center text-md-left">
                                    <h3>Total Results: {movieData.total_results}</h3>
                                </div>
                                <div className="col-md-3 col-lg-4 text-center my-3">
                                    <button name="daily" onClick={handleClick} className={activeClass.daily + " btn btn-outline-dark btn-sm"}>Daily</button> &nbsp; 
                                    <button name="weekly" onClick={handleClick} className={activeClass.weekly + " btn btn-outline-dark btn-sm"}>Weekly</button>
                                </div>
                                <div className="col-md-5 col-lg-4 text-center text-md-right">
                                    <div className="d-flex justify-content-center justify-content-md-end">
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
                                        const mediaType = (typeof movie.media_type !== 'undefined' && movie.media_type == 'tv') ? NAVURL.tv : NAVURL.movie;
                                        const movieSlug = mediaType + '/' + movie.id + '-' + stringToSlug(movieName);
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
            </section>
        </>
    )
}
