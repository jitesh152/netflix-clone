import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchMovieDetailsURL, tbdbImgBaseURL } from "../../requests";
import AxiosInstance from "../../axios";
import { changePageTitle, stringToSlug } from "../../functions";
import { NAVURL } from "../../pageurl";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function PosterBanner( { movieID, mediaType = 'movie' } ) {

    const [ movieData, setMovieData ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect( ()  => {
        const APIURL = fetchMovieDetailsURL(movieID);

        const fetchData = async () => {
            try {
                const request = await AxiosInstance.get(APIURL);
                setMovieData( request.data );
                setLoading(false);
                changePageTitle(request.data.original_title + ' Images');
                return request;
            } catch (error) {
                
            }
        }
        fetchData();
    }, [movieID]);

    const movieName = (typeof movieData.title !== 'undefined' && movieData.title !== null) ? movieData.title : movieData.name;
    const mediaTypeSlug = (mediaType == 'tv') ? NAVURL.tv : NAVURL.movie;
    const movieSlug = mediaTypeSlug + '/' + movieID + '-' + stringToSlug(movieName);

    return (
        <>
        {
            loading ? <div>Loading...</div> 
            : 
            <section className="small-banner movie-image-banner">
                <div className="small-banner-overlay">
                    <div className="container pt-110 pb-4">
                        <div className="banner-poster-row">
                            <div className="banner-poster-img">
                                <img src={tbdbImgBaseURL + movieData.poster_path} alt={movieData.original_title} />
                            </div>
                            <div className="poster-text">
                                <h2>{movieData.original_title}</h2>
                                <div className="__back-link">
                                    <Link to={movieSlug}><span className="__icon"><FontAwesomeIcon icon={faArrowLeft} /></span> Go to Main</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
        }
        </>
    )
}
