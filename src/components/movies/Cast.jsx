import { useEffect, useState } from "react";
import { fetchMovieCastURL, tbdbImgBaseURL } from "../../requests";
import AxiosInstance from "../../axios";
import { NAVURL } from "../../pageurl";
import { stringToSlug } from "../../functions";

import { Link } from "react-router-dom";

const Cast = ( {movieID} ) => {

    const [ movieCast, setMovieCast ] = useState({});
    const [ loading, setLoading ] = useState(true);


    useEffect( () => {
        const APIURL = fetchMovieCastURL( movieID );
        const fetchData = async () => {
            const request = await AxiosInstance.get( APIURL );
            setMovieCast( request.data );
            setLoading(false);

            return request;
        };

        fetchData();
    }, [movieID] );

    return (
        <>
            {
                loading ? <div className='loading'><p>Loading...</p></div> : 
                <>
                <div className="row row-shadow">
                    <div className="col-12">
                        <h2 className="ps-2">Cast</h2>
                        <div className="cast-row">
                            {
                                movieCast.cast.map( ( cast, i ) => {
                                    const castURL = NAVURL.people + '/' + cast.id + '-' + stringToSlug(cast.original_name);
                                    return (
                                        <div key={i} className="cast-list">
                                            <Link to={castURL}>
                                                <div className="__img">
                                                    <img src={tbdbImgBaseURL + cast.profile_path} alt={cast.original_name} />
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
                </>
            }
        </>
    )
}
export default Cast;
