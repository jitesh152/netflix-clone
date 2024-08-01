import { useParams } from "react-router-dom";
import AxiosInstance from "../../../axios";
import { fetchTVShowsSeasonEpisodeURL, fetchTVShowsSeasonURL, fetchTVShowsDetailsURL, tbdbImgBaseURL } from "../../../requests";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFilm, faArrowRight  } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { changePageTitle, stringToSlug } from "../../../functions";
import { NAVURL } from "../../../pageurl";

import NotFoundPage from "../../../NotFoundPage";

import EpisodeBanner from "./EpisodeBanner";
import EpisodeImages from "./EpisodeImages";
import EpisodeVideos from "./EpisodeVideos";

const Episode = () => {

    const { tvShowSlug, seasonID, episodeID } = useParams();
    const [ tvShowID ] = tvShowSlug.split("-");
    const [ loading, setLoading ] = useState(true);
    const [ tvShowData, setTVShowData ] = useState({});
    const [ tvShowEpisode, setTVShowEpisodeData ] = useState({});
    const [ tvShowSeason, setTVShowSeasonData ] = useState({});
    const [ tvEpisodeNextPrev, setEpisodeNextPrev ] = useState({next: '', prev: ''});
    const [ error, setError ] = useState(false);

    useEffect( () => {

        const fetchData = async() => {
            try {
                const APIURL = fetchTVShowsSeasonEpisodeURL( tvShowID, seasonID, episodeID );
                const request = await AxiosInstance.get(APIURL);
                setTVShowEpisodeData( request.data );
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
        }

        const fetchSeasonData = async( data ) => {
            try {
                const APIURL = fetchTVShowsSeasonURL( tvShowID, seasonID );
                const request = await AxiosInstance.get(APIURL);
                setTVShowSeasonData( request.data );
                setError(false);
                const tvShowName = (typeof data.name !== 'undefined' && data.name !== null) ? data.name : tvShowData.original_name;
                changePageTitle(tvShowName + ' Season ' + seasonID + ' Episode ' + episodeID);
                fetchData();

                const index = request.data.episodes.findIndex(item => item.episode_number == episodeID);
                if( index > -1 ) {
                    const NextPrev = {prev : (index-1), next : index+1};
                    if( index === 0 ) { NextPrev.prev = '' }
                    if( index ===  (request.data.episodes.length - 1) ) { NextPrev.next = ''; }
                    setEpisodeNextPrev(NextPrev)
                }
                return request;
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    console.error('Resource not found');
                  } else {
                    console.error('An error occurred');
                  }
                setError(true);
            }
        }

        const fetchTVShowData = async () => {
            const APIURL = fetchTVShowsDetailsURL(tvShowID);
            try {
                const request = await AxiosInstance.get(APIURL);
                setTVShowData( request.data );      
                fetchSeasonData( request.data );         
                return request;
            } catch (error) {
                
            }
        }
        
        fetchTVShowData();
    }, [tvShowSlug, seasonID, episodeID] )

    if( error === true ) {
        return <NotFoundPage />
    }

    return (
        <>
        {
            loading ? <div className='loading'><p>Loading...</p></div> : 
            <>            
                <EpisodeBanner tvShowsID={tvShowID} seasonID={seasonID} episodeID={episodeID} seasonObj={tvShowSeason} tvShowObj={tvShowData} tvShowSlug={tvShowSlug} />
                <section className="border-bottom py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                {
                                    (tvEpisodeNextPrev.prev !== '') ?
                                    <div className="navigation-prev">
                                        <Link to={NAVURL.tv + '/' + tvShowSlug + '/season/' + seasonID + '/episode/' + tvShowSeason.episodes[tvEpisodeNextPrev.prev].episode_number}>
                                            <span className="__icon"><FontAwesomeIcon icon={faArrowLeft} /></span>
                                            <span className="__text"> { tvShowSeason.episodes[tvEpisodeNextPrev.prev].name } ({seasonID}x{tvShowSeason.episodes[tvEpisodeNextPrev.prev].episode_number})</span>
                                        </Link>
                                    </div>
                                    : null
                                }
                            </div>
                            <div className="col-6 text-end">
                                {
                                    (tvEpisodeNextPrev.next !== '') ?
                                    <div className="navigation-next">
                                        <Link to={NAVURL.tv + '/' + tvShowSlug + '/season/' + seasonID + '/episode/' + tvShowSeason.episodes[tvEpisodeNextPrev.next].episode_number}>
                                            <span className="__text"> { tvShowSeason.episodes[tvEpisodeNextPrev.next].name } ({seasonID}x{tvShowSeason.episodes[tvEpisodeNextPrev.next].episode_number}) </span>
                                            <span className="__icon"><FontAwesomeIcon icon={faArrowRight} /></span>
                                        </Link>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="ps-2">Crew</h2>
                                <div className="cast-row">
                                    {
                                        tvShowEpisode.crew.map( ( cast, i ) => {
                                            const castURL = NAVURL.people + '/' + cast.id + '-' + stringToSlug(cast.original_name);
                                            return (
                                                <div key={i} className="cast-list">
                                                    <Link to={castURL}>
                                                        <div className="__img">
                                                            {
                                                                ( cast.profile_path === '' || cast.profile_path === null ) ? <FontAwesomeIcon icon={faUser} /> :
                                                                <img src={tbdbImgBaseURL + cast.profile_path} alt={cast.original_name} />
                                                            }
                                                        </div>
                                                        <div className="__text">
                                                            <div className="__name"><strong>{cast.original_name}</strong></div>
                                                            <div className="character">{cast.job}</div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        } )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="ps-2">Guest Stars</h2>
                                <div className="cast-row">
                                    {
                                        tvShowEpisode.guest_stars.map( ( cast, i ) => {
                                            const castURL = NAVURL.people + '/' + cast.id + '-' + stringToSlug(cast.original_name);
                                            return (
                                                <div key={i} className="cast-list">
                                                    <Link to={castURL}>
                                                        <div className="__img">
                                                            {
                                                                ( cast.profile_path === '' || cast.profile_path === null ) ? <FontAwesomeIcon icon={faUser} /> :
                                                                <img src={tbdbImgBaseURL + cast.profile_path} alt={cast.original_name} />
                                                            }
                                                        </div>
                                                        <div className="__text">
                                                            <div className="__name"><strong>{cast.original_name}</strong></div>
                                                            <div className="character">{cast.character}</div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        } )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <EpisodeImages tvShowsID={tvShowID} seasonID={seasonID} episodeID={episodeID} />
                <EpisodeVideos tvShowsID={tvShowID} seasonID={seasonID} episodeID={episodeID} />
            </>
        }
        </>
    )
}
export default Episode;