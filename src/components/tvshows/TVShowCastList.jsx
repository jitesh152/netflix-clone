import { useEffect, useState } from "react";
import { fetchTVShowsCastURL, tbdbImgBaseURL } from "../../requests";
import AxiosInstance from "../../axios";
import { NAVURL } from "../../pageurl";
import { stringToSlug } from "../../functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import { Link } from "react-router-dom";

const TVShowCastList = ( {tvShowID, tvShowSlug = ''} ) => {

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
                <div className="row row-shadow">
                    <div className="col-12">
                        <h2 className="ps-2">Series Cast</h2>
                        <div className="cast-row">
                            {
                                tvShowCast.cast.map( ( cast, i ) => {
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
                {
                    tvShowSlug !== '' ? 
                    <div className="row">
                        <div className="col-12">
                            <div className="__link border-bottom">
                                <Link to={NAVURL.tv + '/' + tvShowSlug + '/cast'}>Full Cast & Crew</Link>
                            </div>
                        </div>
                    </div>
                    : null
                }
                </>
            }
        </>
    )
}
export default TVShowCastList;
