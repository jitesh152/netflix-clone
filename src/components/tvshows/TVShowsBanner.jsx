import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import YouTubeVideoModal from "../common/YouTubeVideoModal";

import { fetchTVShowsDetailsURL } from "../../requests";

import { tbdbImgBaseURL, fetchTVShowsVideosURL } from "../../requests";
import { formatDate, stringToSlug, formatTimeFromMinutes } from "../../functions";
import { NAVURL } from "../../pageurl";
import AxiosInstance from "../../axios";
import { useEffect, useState } from "react";

const TVShowsBanner = ( {tvShowID} ) => {

    const [isOpen, setIsOpen] = useState(false);
    const [videoId, setVideoId] = useState([]);
    const [tvShowsData, setTVShowsData] = useState({});
    const [ loading, setLoading ] = useState(true);

    const openModal = async ( tvShowID ) => {
        const APIURL = fetchTVShowsVideosURL( tvShowID );
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
        const APIURL = fetchTVShowsDetailsURL( tvShowID );
        const fetchData = async () => {
            try {
                const request = await AxiosInstance.get( APIURL );
                setTVShowsData( request.data );
                setLoading(false);
                return request;
            } catch (error) {
            }
        };

       fetchData();
    },[tvShowID] )

    const tvShowName = (typeof tvShowsData.name !== 'undefined' && tvShowsData.name !== null) ? tvShowsData.name : tvShowsData.original_name

    return (
        <>
        {
            loading ? <div>Loading...</div> : 
            <>
            <section className='movie-tv-banner' style={ { backgroundImage: `url(${tbdbImgBaseURL + tvShowsData.backdrop_path})` } }>
                <div className="section-overlay-color">
                    <div className="container pt-110 pb-4">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 mb-3 mb-md-0">
                                <div className="poster-img">
                                    <img src={tbdbImgBaseURL + tvShowsData.poster_path} alt={tvShowName} />
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="poster-content px-lg-4">
                                    <h1>{ tvShowName }</h1>
                                    <div className="movie-facts"> 
                                        <span className="release">
                                            First On Air: { formatDate(tvShowsData.first_air_date) } ({tvShowsData.origin_country[0]})
                                        </span>
                                        {
                                            tvShowsData.genres.length > 0 ?
                                            <>
                                            <span className="genres">
                                                {
                                                    tvShowsData.genres.map( ( genre, i ) => {
                                                        const genreSlug = NAVURL.tv + '/' + stringToSlug(genre.name);
                                                        return (
                                                            <Link key={i} to={genreSlug}>{genre.name}</Link>
                                                        )
                                                    } )
                                                }
                                            </span>
                                            </>
                                            : null
                                        }
                                    </div>
                                    <div className="movie-action">
                                        <ul>
                                            <li><span className="__icon"><FontAwesomeIcon icon={faList} /></span></li>
                                            <li><span className="__icon"><FontAwesomeIcon icon={faHeart} /></span></li>
                                            <li onClick={()=>openModal(tvShowsData.id)}><span className="__btn"><FontAwesomeIcon icon={faPlay} /> Play Trailer</span></li>
                                            <li className="_line-break"></li>
                                            <li>
                                                {
                                                    tvShowsData.number_of_seasons > 10 ? tvShowsData.number_of_seasons + ' Seasons' : <>{ tvShowsData.number_of_seasons > 1 ? '0'+tvShowsData.number_of_seasons+' Seasons' : '0'+tvShowsData.number_of_seasons+' Seasons' }</>
                                                }
                                                <span className="mx-2"></span>
                                                {
                                                    tvShowsData.number_of_episodes > 10 ? tvShowsData.number_of_episodes + ' Episodes' : <>{ tvShowsData.number_of_episodes > 1 ? '0'+tvShowsData.number_of_episodes+' Episodes' : '0'+tvShowsData.number_of_episodes+' Episode' }</>
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tagline">
                                        <i>{tvShowsData.tagline}</i>
                                    </div>
                                    <div className="movie-overview">
                                        <h2>Overview</h2>
                                        <p>{tvShowsData.overview}</p>
                                    </div>
                                    {
                                        (tvShowsData.production_companies.length > 0) ?
                                        <div className="movie-production">
                                            <h2>Production Companies</h2>
                                            <ul>
                                                {
                                                    tvShowsData.production_companies.map((company, i) => {
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
export default TVShowsBanner;
