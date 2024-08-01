
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import YouTubeVideoModal from "../../common/YouTubeVideoModal";

import { tbdbImgBaseURL, fetchTVShowEpisodeVideosURL, fetchTVShowsSeasonEpisodeURL } from "../../../requests";
import { formatDate, formatTimeFromMinutes } from "../../../functions";
import { NAVURL } from '../../../pageurl';
import AxiosInstance from "../../../axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const EpisodeBanner = ( {tvShowsID, seasonID, episodeID, seasonObj, tvShowObj, tvShowSlug} ) => {

    const [isOpen, setIsOpen] = useState(false);
    const [videoId, setVideoId] = useState([]);
    const [tvShowEpisode, setTVShowEpisodeData] = useState({});
    const [ loading, setLoading ] = useState(true);

    const openModal = async ( ) => {
        const APIURL = fetchTVShowEpisodeVideosURL( tvShowsID, seasonID, episodeID );
        try {
            const request = await AxiosInstance.get(APIURL);
            let index = request.data.results.findIndex(obj => obj.type === 'Trailer');
            if( index > -1 ) {
                setVideoId(request.data.results[index].key);
                setIsOpen(true);
            } else if( typeof request.data.results[0].key !== 'undefined' ) {
                setVideoId(request.data.results[0].key);
                setIsOpen(true);
            }
        } catch (error) {
            
        }
    };
    
    const closeModal = () => {
        setIsOpen(false);
        setVideoId('');
    };

    useEffect( () => {
        const fetchData = async () => {
            const APIURL = fetchTVShowsSeasonEpisodeURL( tvShowsID, seasonID, episodeID );
            try {
                const request = await AxiosInstance.get( APIURL );
                setTVShowEpisodeData( request.data );
                setLoading(false);
                return request;
            } catch (error) {
            }
        };

       fetchData();
    },[tvShowsID, seasonID, episodeID, seasonObj] )

    const tvShowName = (typeof tvShowObj.name !== 'undefined' && tvShowObj.name !== null) ? tvShowObj.name : tvShowObj.original_name;

    return (
        <>
        {
            loading ? <div>Loading...</div> : 
            <>
            <section className='movie-tv-banner' style={ { backgroundImage: `url(${tbdbImgBaseURL + seasonObj.poster_path})` } }>
                <div className="section-overlay-color">
                    <div className="container pt-110 pb-4">
                        <div className="row">
                            <div className="col-lg-3 col-md-4">
                                <div className="poster-img">
                                    <img src={tbdbImgBaseURL + tvShowEpisode.still_path} alt={tvShowEpisode.name} />
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8 mt-3 mt-md-0">
                                <div className="poster-content px-lg-4">
                                    <h1>{ tvShowEpisode.name } <span className="heading-small">(Episode {episodeID})</span> </h1>
                                    <div className="episode-details">
                                        <Link className='text-white' to={NAVURL.tv + '/' + tvShowSlug + '/season/' + seasonID}>{tvShowName} {seasonObj.name}</Link>
                                    </div>
                                    <div className="movie-facts"> 
                                        <span className="release">
                                            { formatDate(tvShowEpisode.air_date) }
                                        </span>
                                        <span className="runtime">{ formatTimeFromMinutes(tvShowEpisode.runtime) }</span>
                                    </div>
                                    <div className="movie-action">
                                        <ul>
                                            <li onClick={()=>openModal()}><span className="__btn"><FontAwesomeIcon icon={faPlay} /> Play Trailer</span></li>
                                        </ul>
                                    </div>
                                    <div className="movie-overview text-white">
                                        <h2>Overview</h2>
                                        <p>{tvShowEpisode.overview}</p>
                                    </div>
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
export default EpisodeBanner;
