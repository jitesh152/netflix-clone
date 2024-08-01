import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import YouTubeVideoModal from "../common/YouTubeVideoModal";

import { fetchMovieDetailsURL } from "../../requests";

import { tbdbImgBaseURL, fetchMovieVideosURL } from "../../requests";
import { formatDate, stringToSlug, formatTimeFromMinutes } from "../../functions";
import { NAVURL } from "../../pageurl";
import AxiosInstance from "../../axios";
import { useEffect, useState } from "react";

const MovieBanner = ( {movieID} ) => {

    const [isOpen, setIsOpen] = useState(false);
    const [videoId, setVideoId] = useState([]);
    const [movieData, setMovieData] = useState({});
    const [ loading, setLoading ] = useState(true);

    const openModal = async ( movieID ) => {
        const APIURL = fetchMovieVideosURL( movieID );
        try {
            const request = await AxiosInstance.get(APIURL);
            let index = request.data.results.findIndex(obj => obj.type === 'Trailer');
            setVideoId(request.data.results[index].key);
            setIsOpen(true);
        } catch (error) {
            
        }
    };
    
    const closeModal = () => {
        setIsOpen(false);
        setVideoId('');
    };

    useEffect( () => {
        const APIURL = fetchMovieDetailsURL( movieID );
        const fetchData = async () => {
            try {
                const request = await AxiosInstance.get( APIURL );
                setMovieData( request.data );
                setLoading(false);
                return request;
            } catch (error) {
            }
        };

       fetchData();
    },[movieID] )

    const movieName = (typeof movieData.title !== 'undefined' && movieData.title !== null) ? movieData.title : movieData.original_title

    return (
        <>
        {
            loading ? <div>Loading...</div> : 
            <>
            <section className='movie-tv-banner' style={ { backgroundImage: `url(${tbdbImgBaseURL + movieData.backdrop_path})` } }>
                <div className="section-overlay-color">
                    <div className="container pt-110 pb-4">
                        <div className="row">
                            <div className="col-lg-3 col-md-4">
                                <div className="poster-img">
                                    <img src={tbdbImgBaseURL + movieData.poster_path} alt={movieName} />
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="poster-content px-lg-4">
                                    <h1>{ movieName }</h1>
                                    <div className="movie-facts"> 
                                        <span className="release">
                                            { formatDate(movieData.release_date) } ({movieData.origin_country[0]})
                                        </span>
                                        {
                                            movieData.genres.length > 0 ?
                                            <>
                                            <span className="genres">
                                                {
                                                    movieData.genres.map( ( genre, i ) => {
                                                        const genreSlug = NAVURL.movie + '/' + stringToSlug(genre.name);
                                                        return (
                                                            <Link key={i} to={genreSlug}>{genre.name}</Link>
                                                        )
                                                    } )
                                                }
                                            </span>
                                            </>
                                            : null
                                        }
                                        <span className="runtime">{ formatTimeFromMinutes(movieData.runtime) }</span>
                                    </div>
                                    <div className="movie-action">
                                        <ul>
                                            <li><span className="__icon"><FontAwesomeIcon icon={faList} /></span></li>
                                            <li><span className="__icon"><FontAwesomeIcon icon={faHeart} /></span></li>
                                            <li onClick={()=>openModal(movieData.id)}><span className="__btn"><FontAwesomeIcon icon={faPlay} /> Play Trailer</span></li>
                                        </ul>
                                    </div>
                                    <div className="movie-overview">
                                        <h2>Overview</h2>
                                        <p>{movieData.overview}</p>
                                    </div>
                                    {
                                        (movieData.production_companies.length > 0) ?
                                        <div className="movie-production">
                                            <h2>Production Companies</h2>
                                            <ul>
                                                {
                                                    movieData.production_companies.map((company, i) => {
                                                        return (
                                                            <li key={i}>
                                                                <span>{company.name}</span>
                                                                <span>Origin Country: {company.origin_country}</span>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <YouTubeVideoModal isOpen={isOpen} videoId={videoId} onClose={closeModal} />
            </>
        }
        </>
    )
}
export default MovieBanner;
