import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TVGenreList from "./TVGenreList";
import Pagination from "../common/Pagination";

import requests, { fetchTVShowsURL, fetchAllTVShowsURL, tbdbImgBaseURL } from "../../requests";
import AxiosInstance from "../../axios";
import { stringToSlug, changePageTitle, scrollToTop } from "../../functions";
import { NAVURL, TVSHOWSURL} from "../../pageurl";

const TVShowsList = ( {genreID = 'popular', pageTitle = 'TV Shows List' } ) => {

    const [sortBy, setSortBy] = useState('vote_count.desc');
    const [tvShowsData, setTVShowsData] = useState([]);
    const [loading, setLoading] = useState('loading');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect( () => {
        const fetchData = async () => {
            setLoading('loading');

            const APIURL = ( genreID in TVSHOWSURL ) ? fetchTVShowsURL( TVSHOWSURL[genreID].fetchurl, currentPage, sortBy ) : fetchAllTVShowsURL( currentPage, sortBy, genreID );

            try {
                const request = await AxiosInstance.get(APIURL);
                setTVShowsData(request.data);
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
                            <TVGenreList fetchURL={requests.fetchTvGenres} genreID={genreID} />
                        </div>
                    </div>
                    <div className={"col-lg-9 " + loading}>
                        {
                            (typeof tvShowsData.results !== 'undefined' && tvShowsData.results !== null)
                            ?
                            <>
                                <div className="row mb-4">
                                    <div className="col-sm-6">
                                        <h3>Total Results: {tvShowsData.total_results}</h3>
                                    </div>
                                    {
                                        (genreID in TVSHOWSURL) ? null : 

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
                                    }
                                </div>
                                <div className="row">
                                    {
                                        tvShowsData.results.map( (movie, i) => {
                                            const tvShowName = (typeof movie.title !== 'undefined' && movie.title !== null) ? movie.title : movie.name;
                                            const tvShowSlug = NAVURL.tv + '/' + movie.id + '-' + stringToSlug(tvShowName);
                                            return(
                                                <div key={i} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                                    <div className="movie-list-wrap">
                                                        <div className="image">
                                                            <Link to={tvShowSlug}>
                                                                    <img src={tbdbImgBaseURL + movie.poster_path} alt={tvShowName} />
                                                                </Link>
                                                            </div>
                                                        <div className="name">
                                                            <Link to={tvShowSlug}>{tvShowName}</Link>
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
export default TVShowsList;