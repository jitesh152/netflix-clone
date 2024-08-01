import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTVShowsCastURL, tbdbImgBaseURL } from "../../requests";
import AxiosInstance from "../../axios";
import { NAVURL } from "../../pageurl";
import { stringToSlug } from "../../functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import TVShowPosterBanner from "./TVShowPosterBanner";

import { Link } from "react-router-dom";

const TVShowFullCast = () => {

    const { tvShowSlug } = useParams();
    const [ tvShowID ] = tvShowSlug.split("-");

    const [ tvShowCast, setTVShowCast ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect( () => {
        const APIURL = fetchTVShowsCastURL( tvShowID );
        const fetchData = async () => {
            const request = await AxiosInstance.get( APIURL );
            setTVShowCast( request.data );
            setLoading(false);

            return request;
        };

        fetchData();
    }, [tvShowID] );

    return (
        <>
            {
                loading ? <div className='loading'><p>Loading...</p></div> : 
                <>
                <TVShowPosterBanner tvShowID={tvShowID} />
                <section className="full-cast py-4">
                    <div className="container">
                        <div className="row row-shadow">
                            <div className="col-lg-6">
                                <h2 className="ps-2 mb-4">Series Cast</h2>
                                <div className="cast-list-view">
                                    {
                                        tvShowCast.cast.map( ( cast, i ) => {
                                            const castURL = NAVURL.people + '/' + cast.id + '-' + stringToSlug(cast.original_name);
                                            return (
                                                <div key={i} className="cast-list">                                                    
                                                        <div className="__img">
                                                            <Link to={castURL}>
                                                            {
                                                                (cast.profile_path === '' || cast.profile_path === null) ? <FontAwesomeIcon icon={faUser} /> :
                                                                <img src={tbdbImgBaseURL + cast.profile_path} alt={cast.original_name} />
                                                            }
                                                            </Link>
                                                        </div>
                                                        <div className="__text">
                                                            <Link to={castURL}>
                                                                <div className="__name"><strong>{cast.original_name}</strong></div>
                                                            </Link>
                                                            <div className="character">{cast.character} <br/>{cast.known_for_department}</div>
                                                        </div>
                                                   
                                                </div>
                                            )
                                        } )
                                    }
                                </div>
                            </div>
                            <div className="col-lg-6 mt-4 mt-lg-0">
                                <h2 className="ps-2 mb-4">Series Crew</h2>
                                <div className="cast-list-view">
                                    {
                                        tvShowCast.crew.map( ( cast, i ) => {
                                            const castURL = NAVURL.people + '/' + cast.id + '-' + stringToSlug(cast.original_name);
                                            return (
                                                <div key={i} className="cast-list">                                                    
                                                        <div className="__img">
                                                            <Link to={castURL}>
                                                                {
                                                                    (cast.profile_path === '' || cast.profile_path === null) ? <FontAwesomeIcon icon={faUser} /> :
                                                                    <img src={tbdbImgBaseURL + cast.profile_path} alt={cast.original_name} />
                                                                }
                                                            </Link>
                                                        </div>
                                                        <div className="__text">
                                                            <Link to={castURL}>
                                                                <div className="__name"><strong>{cast.original_name}</strong></div>
                                                            </Link>
                                                            <div className="character">{cast.department}</div>
                                                        </div>
                                                   
                                                </div>
                                            )
                                        } )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </>
            }
        </>
    )
}
export default TVShowFullCast;