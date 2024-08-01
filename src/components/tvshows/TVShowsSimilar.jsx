import { useEffect, useState } from "react";
import { fetchTVShowsSimilarURL, tbdbImgBaseURL } from "../../requests";
import AxiosInstance from "../../axios";
import { NAVURL } from "../../pageurl";
import { stringToSlug, scrollToTop } from "../../functions";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

const TVShowsSimilar = ( {tvShowID} ) => {

    const [ tvShowSimilar, setTVShowSimilar ] = useState({});
    const [ loading, setLoading ] = useState(true);


    useEffect( () => {
        const APIURL = fetchTVShowsSimilarURL( tvShowID );
        const fetchData = async () => {
            const request = await AxiosInstance.get( APIURL );
            setTVShowSimilar( request.data );
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
                {
                    (tvShowSimilar.results.length > 0) ? 
                    <>
                    <div className="container py-4 recommendations">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="ps-2">Similar TV Shows</h2>
                                <div className="cast-row">
                                    {
                                        tvShowSimilar.results.map( ( tvShow, i ) => {
                                            const tvShowName = ( typeof tvShow.name !== 'undefined' && tvShow.name !== '' ) ? tvShow.name : tvShow.original_name;
                                            const tvShowURL = NAVURL.tv + '/' + tvShow.id + '-' + stringToSlug(tvShowName);
                                            return (
                                                <div key={i} className="cast-list">
                                                    <Link to={tvShowURL} onClick={scrollToTop}>
                                                        <div className="__img">
                                                            {
                                                                ( tvShow.poster_path === '' || tvShow.poster_path === null ) ? 
                                                                <FontAwesomeIcon icon={faFilm} /> :
                                                                <img src={tbdbImgBaseURL + tvShow.poster_path} alt={tvShowName} />
                                                            }
                                                        </div>
                                                        <div className="__text">
                                                            <div className="__name"><strong>{tvShowName}</strong></div>
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
                    </>
                    : null 
                }
                </>
            }
        </>
    )
}
export default TVShowsSimilar;
