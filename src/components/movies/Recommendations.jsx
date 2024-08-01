import { useEffect, useState } from "react";
import { fetchMovieRecommendationsURL, tbdbImgBaseURL } from "../../requests";
import AxiosInstance from "../../axios";
import { NAVURL } from "../../pageurl";
import { stringToSlug, scrollToTop } from "../../functions";

import { Link } from "react-router-dom";

const Recommendations = ( {movieID} ) => {

    const [ movieRecommendations, setMovieRecommendations ] = useState({});
    const [ loading, setLoading ] = useState(true);


    useEffect( () => {
        const APIURL = fetchMovieRecommendationsURL( movieID );
        const fetchData = async () => {
            const request = await AxiosInstance.get( APIURL );
            setMovieRecommendations( request.data );
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
                {
                    (movieRecommendations.results.length > 0) ? 
                    <>
                    <div className="container py-4 recommendations">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="ps-2">Recommendations</h2>
                                <div className="cast-row">
                                    {
                                        movieRecommendations.results.map( ( movie, i ) => {
                                            const movieURL = NAVURL.movie + '/' + movie.id + '-' + stringToSlug(movie.original_title);
                                            return (
                                                <div key={i} className="cast-list">
                                                    <Link to={movieURL} onClick={scrollToTop}>
                                                        <div className="__img">
                                                            <img src={tbdbImgBaseURL + movie.poster_path} alt={movie.original_title} />
                                                        </div>
                                                        <div className="__text">
                                                            <div className="__name"><strong>{movie.original_title}</strong></div>
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
export default Recommendations;
