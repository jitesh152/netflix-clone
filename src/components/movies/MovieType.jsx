import { useEffect, useState } from "react";
import NotFoundPage from "../../NotFoundPage";
import MovieList from "./MovieList";
import DefaultBanner from "../common/DefaultBanner";

import AxiosInstance from "../../axios";
import requests from "../../requests";
import { stringToSlug } from "../../functions";

import { MOVIESURL } from "../../pageurl";

export default function MovieType( {slug} ) {

    const [genres, setGenres] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const APIURL = requests.fetchMovieGenres;
        const fetchData = async() => {
            try {
                const request = await AxiosInstance.get(APIURL);
                let index = request.data.genres.findIndex(obj => stringToSlug(obj.name) === slug);
                if( index > -1 ) {
                    setGenres(request.data.genres[index]);
                }
                setLoading(false);
                return request;
            } catch (error) {
                
            }
        }
        if( slug in MOVIESURL ) {
            setGenres({name: MOVIESURL[slug].title, id: slug});
            setLoading(false);
        } else {
            fetchData();
        }
    }, [slug])

    return (
        <>
            {
                loading ? <div>Loading...</div> :
                <>
                    {
                        genres.id ? 
                        <>
                            <DefaultBanner pageTitle={ genres.name + ' Movies' } bannerImg="/assets/images/cinema-film-poster.jpg" />
                            <MovieList genreID={genres.id} pageTitle={genres.name + ' Movies'} />
                        </> 
                        : <NotFoundPage />
                    }
                </>
            }
        </>
    )
}
