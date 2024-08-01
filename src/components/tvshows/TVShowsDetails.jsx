import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AxiosInstance from "../../axios";
import { fetchTVShowsDetailsURL, tbdbImgBaseURL } from "../../requests";
import { changePageTitle, formatDate } from "../../functions";

import { NAVURL } from "../../pageurl";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

import NotFoundPage from "../../NotFoundPage";
import TVShowsType from "./TVShowsType";
import TVShowsBanner from "./TVShowsBanner";
import TVShowCastList from "./TVShowCastList";
import TVShowsSimilar from "./TVShowsSimilar";
import TVShowsRecommendations from "./TVShowsRecommendations";

const TVShowsDetails = () => {

    const { tvShowSlug } = useParams();
    const [ tvShowID ] = tvShowSlug.split("-");

    const [ loading, setLoading ] = useState(true);
    const [ tvShows, setTVShows ] = useState(true);

    useEffect ( () => {
        const APIURL = fetchTVShowsDetailsURL( tvShowID );
        const fetchData = async () => {
            if( !(/^[0-9]/.test(tvShowID)) ) {
                return;
            }
            try {
                const request = await AxiosInstance.get( APIURL );
                const tvShowsData = request.data;
                setTVShows( tvShowsData );
                setLoading(false);
                const tvShowName = (typeof tvShowsData.name !== 'undefined' && tvShowsData.name !== null) ? tvShowsData.name : tvShowsData.original_name;
                changePageTitle(tvShowName);
                return request;
            } catch (error) {
                setLoading(false);
            }
        };

       fetchData();
    },[tvShowSlug] );

    if( !(/^[0-9]/.test(tvShowID)) ) {
        return <TVShowsType slug={tvShowSlug} />
    }

    return (
        <>
        {
            loading ? <div className='loading'><p>Loading...</p></div> : 
            <>
            {
                (typeof tvShows.original_name !== 'undefined' && tvShows.original_name !== null) ? 
                <>
                 <TVShowsBanner tvShowID={tvShowID} />
                 <div className="container py-4">
                    <div className="row">
                        <div className="col-lg-9 col-md-8">
                        <TVShowCastList tvShowID={tvShowID} tvShowSlug={tvShowSlug} />
                        <div className="py-4">
                            <h2 className="ps-2 mb-4">
                                {
                                    (tvShows.next_episode_to_air === null || tvShows.next_episode_to_air === '') ? 'Last Season' : 'Current Season'
                                }
                            </h2>
                            <div className="season-info">
                                <div className="__img">
                                {
                                    ( tvShows.last_episode_to_air.still_path === '' || tvShows.last_episode_to_air.still_path === null ) ? <FontAwesomeIcon icon={faFilm} /> :
                                    <img src={tbdbImgBaseURL + tvShows.last_episode_to_air.still_path} alt={tvShows.original_name} />
                                }
                                </div>
                                <div className="__text">
                                    <h3>Season {tvShows.last_episode_to_air.season_number}</h3>
                                    <div className="episode-info">
                                        <span>{formatDate(tvShows.last_episode_to_air.air_date)}</span>
                                        <span>{tvShows.last_episode_to_air.episode_number} Episodes</span>
                                    </div>
                                    <p>{tvShows.last_episode_to_air.overview}</p>
                                    <div className="episode-name">
                                        <span>{tvShows.last_episode_to_air.name}</span>
                                        {
                                            ( typeof tvShows.last_episode_to_air.episode_type !== 'undefined' ) ?
                                            <>
                                            <span className="btnview text-uppercase">
                                                {
                                                    tvShows.last_episode_to_air.episode_type.replace('_', '-')
                                                }
                                            </span>
                                            </>
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="__link border-bottom">
                                        <Link to={NAVURL.tv + '/' + tvShowSlug + '/seasons'}>View All Seasons</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <div className="movie-info">
                                <p><strong>Staus</strong> <span>{tvShows.status}</span></p>
                                <p><strong>Original Language</strong> <span>{tvShows.original_language.toUpperCase()}</span></p>
                                <p><strong>Network</strong> 
                                    <span>
                                        {
                                            tvShows.networks.map( (v, i) => {
                                                return (
                                                    <span key={i}>
                                                        {
                                                            (v.logo_path === '') ? v.name : 
                                                            <>
                                                            <img width="60" src={tbdbImgBaseURL + v.logo_path} alt={v.name} />
                                                            </>
                                                        }
                                                    </span>
                                                )
                                            } )
                                        }
                                    </span>
                                </p>
                                <p><strong>Type</strong> <span>{tvShows.type}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <TVShowsSimilar tvShowID={tvShowID} />
                <TVShowsRecommendations tvShowID={tvShowID} />
                </> : <NotFoundPage />
            }
            </>
        }
        </>
    )
}
export default TVShowsDetails;
