import { useEffect, useState } from "react";
import { fetchTVShowsRecommendationsURL, tbdbImgBaseURL } from "../../requests";
import AxiosInstance from "../../axios";
import { NAVURL } from "../../pageurl";
import { stringToSlug, scrollToTop } from "../../functions";

import { Link } from "react-router-dom";

const TVShowsRecommendations = ( {tvShowID} ) => {

    const [ tvshowRecommendations, setTVShowRecommendations ] = useState({});
    const [ loading, setLoading ] = useState(true);


    useEffect( () => {
        const APIURL = fetchTVShowsRecommendationsURL( tvShowID );
        const fetchData = async () => {
            const request = await AxiosInstance.get( APIURL );
            setTVShowRecommendations( request.data );
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
                    (tvshowRecommendations.results.length > 0) ? 
                    <>
                    <div className="container py-4 recommendations">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="ps-2">Recommendations</h2>
                                <div className="cast-row">
                                    {
                                        tvshowRecommendations.results.map( ( tvShow, i ) => {
                                            const tvShowName = ( typeof tvShow.name !== 'undefined' && tvShow.name !== '' ) ? tvShow.name : tvShow.original_name;
                                            const tvShowURL = NAVURL.tv + '/' + tvShow.id + '-' + stringToSlug(tvShowName);
                                            return (
                                                <div key={i} className="cast-list">
                                                    <Link to={tvShowURL} onClick={scrollToTop}>
                                                        <div className="__img">
                                                            <img src={tbdbImgBaseURL + tvShow.poster_path} alt={tvShowName} />
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
export default TVShowsRecommendations;
