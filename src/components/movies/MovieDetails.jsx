import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AxiosInstance from "../../axios";

import { fetchMovieDetailsURL } from "../../requests";
import { changePageTitle } from "../../functions";
import MovieBanner from "./MovieBanner";
import Cast from "./Cast";
import Recommendations from "./Recommendations";
import Similar from "./Similar";
import Videos from "./Videos";
import ImagesList from "./ImagesList";

import MovieType from "./MovieType";

import NotFoundPage from "../../NotFoundPage";

const MovieDetails = () => {

    const { movieSlug } = useParams();
    let [ movieID ] = movieSlug.split("-");

    const [ movies, setMovies ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect ( () => {
        const APIURL = fetchMovieDetailsURL( movieID );
        const fetchData = async () => {
            if( !(/^[0-9]/.test(movieID)) ) {
                return;
            }
            try {
                const request = await AxiosInstance.get( APIURL );
                setMovies( request.data );
                setLoading(false);

                changePageTitle(request.data.original_title);
                return request;
            } catch (error) {
                setLoading(false);
            }
        };

       fetchData();
    },[movieSlug] );

    if( !(/^[0-9]/.test(movieID)) ) {
        return <MovieType slug={movieSlug} />
    }

    return (
        <>
        {
            loading ? <div className='loading'><p>Loading...</p></div> : 
            <>
            {
                (typeof movies.original_title !== 'undefined' && movies.original_title !== null) ? 
                <>
                <MovieBanner movieID={movieID} />
                <div className="container py-4">
                    <div className="row">
                        <div className="col-lg-9 col-md-8">
                        <Cast movieID={movieID} />
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <div className="movie-info">
                                <p><strong>Staus</strong> <span>{movies.status}</span></p>
                                <p><strong>Original Language</strong> <span>{movies.original_language.toUpperCase()}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <Videos movieID={movieID} />
                <ImagesList movieID={movieID} heading="Backdrops" imgType="backdrops" />
                <ImagesList movieID={movieID} heading="Posters" imgType="posters" />
                <Similar movieID={movieID} />
                <Recommendations movieID={movieID} />
                </> : <NotFoundPage />
            }
            </>
        }
        </>
    )
}
export default MovieDetails;