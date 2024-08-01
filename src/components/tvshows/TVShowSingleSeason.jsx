import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosInstance from "../../axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFilm, faArrowRight  } from "@fortawesome/free-solid-svg-icons";

import NotFoundPage from '../../NotFoundPage';

import { fetchTVShowsSeasonURL, fetchTVShowsDetailsURL, tbdbImgBaseURL } from "../../requests";
import { formatDate, changePageTitle, formatTimeFromMinutes} from "../../functions";
import { NAVURL } from "../../pageurl";

const TVShowSingleSeason = () => {

    const { tvShowSlug, seasonID } = useParams();
    const [ tvShowID ] = tvShowSlug.split("-");

    const [ tvShowSeason, tvShowSeasonData ] = useState({});
    const [ tvShowData, setTVShowData ] = useState({});
    const [ tvShowNextPrev, setTVShowNextPrev ] = useState({next: '', prev: ''});
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);

    useEffect( () => {
        const fetchData = async () => {
            const APIURL = fetchTVShowsSeasonURL( tvShowID, seasonID );
            try {
                const request = await AxiosInstance.get( APIURL );
                tvShowSeasonData( request.data );
                setLoading(false);
                setError(false);
                return request;
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    console.error('Resource not found');
                  } else {
                    console.error('An error occurred');
                  }
                setError(true);
            }
        };

        const fetchTVShowData = async () => {
            const APIURL = fetchTVShowsDetailsURL( tvShowID );
            try {
                const request = await AxiosInstance.get( APIURL );
                setTVShowData( request.data );
                changePageTitle(request.data.name + ' Season ' + seasonID + ' Episode List');
                const index = request.data.seasons.findIndex(item => item.season_number == seasonID);
                if( index > -1 ) {
                    const NextPrev = {prev : (index-1), next : index+1};
                    if( index === 0 ) { NextPrev.prev = '' }
                    if( index ===  (request.data.seasons.length - 1) ) { NextPrev.next = ''; }
                    setTVShowNextPrev(NextPrev)
                }
                fetchData();
                return request;
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    console.error('Resource not found');
                  } else {
                    console.error('An error occurred');
                  }
                setError(true);
            }
        };

        fetchTVShowData();
    }, [tvShowID, seasonID] );

    if( error === true ) {
        return <NotFoundPage />
    }

    const tvShowName = (typeof tvShowData.name !== 'undefined' && tvShowData.name !== null) ? tvShowData.name : tvShowData.original_name;

    return (
        <>
        {
            loading ? <div className='loading'><p>Loading...</p></div> : 
            <>
            
            <section className="small-banner movie-image-banner">
                <div className="small-banner-overlay">
                    <div className="container pt-110 pb-4">
                        <div className="banner-poster-row">
                            <div className="banner-poster-img">
                                <img src={tbdbImgBaseURL + tvShowSeason.poster_path} alt={tvShowData.original_title} />
                            </div>
                            <div className="poster-text">
                                <h2>{tvShowName} ({tvShowSeason.name})</h2>
                                <div className="__back-link">
                                    <Link to={NAVURL.tv +'/'+ tvShowSlug + '/seasons'}><span className="__icon"><FontAwesomeIcon icon={faArrowLeft} /></span> Go to Season List</Link>
                                </div>
                            </div>
                        </div>
                        {
                            (tvShowSeason.overview !== '') ? 
                            <div className="row mt-4 text-white">
                                <div className="col-12">
                                    <p>{tvShowSeason.overview}</p>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </section> 
            <section className="border-bottom py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            {
                                (tvShowNextPrev.prev !== '') ?
                                <div className="navigation-prev">
                                    <Link to={NAVURL.tv + '/' + tvShowSlug + '/season/' + tvShowNextPrev.prev}>
                                        <span className="__icon"><FontAwesomeIcon icon={faArrowLeft} /></span>
                                        <span className="__text"> { tvShowData.seasons[tvShowNextPrev.prev].name } </span>
                                    </Link>
                                </div>
                                : null
                            }
                        </div>
                        <div className="col-6 text-end">
                            {
                                (tvShowNextPrev.next !== '') ?
                                <div className="navigation-next">
                                    <Link to={NAVURL.tv + '/' + tvShowSlug + '/season/' + tvShowNextPrev.next}>
                                        <span className="__text"> { tvShowData.seasons[tvShowNextPrev.next].name } </span>
                                        <span className="__icon"><FontAwesomeIcon icon={faArrowRight} /></span>
                                    </Link>
                                </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-4 season-list">
                <div className="container">
                    {
                        tvShowSeason.episodes.map( (episode, i) => {
                            const epidodeLink = NAVURL.tv + '/' + tvShowSlug + '/season/' + seasonID + '/episode/' + episode.episode_number;
                            return(
                                <div key={i} className="season-info mb-4">
                                    <div className="__img">
                                        
                                        {
                                            ( episode.still_path === '' || episode.still_path === null ) ? <FontAwesomeIcon icon={faFilm} /> :
                                            <img src={tbdbImgBaseURL + episode.still_path} alt={episode.name} />
                                        }
                                        
                                        </div>
                                        <div className="__text">
                                            <h3><Link to={epidodeLink}>{episode.name}</Link></h3>
                                            <div className="episode-info">
                                                <span>{formatDate(episode.air_date)}</span>
                                                <span>Episode {episode.episode_number}</span>
                                                {
                                                    ( episode.runtime !== null ) ? 
                                                    <span>{formatTimeFromMinutes(episode.runtime)}</span>
                                                    : null
                                                }
                                            </div>
                                            <p>{episode.overview}</p>
                                        </div>
                                </div>
                            )
                        } )
                    }
                </div>
            </section>
            </>
        }
        </>
    )
}
export default TVShowSingleSeason;