import { useEffect, useState } from "react";
import NotFoundPage from "../../NotFoundPage";
import TVShowsList from "./TVShowsList";
import DefaultBanner from "../common/DefaultBanner";

import AxiosInstance from "../../axios";
import requests from "../../requests";
import { stringToSlug } from "../../functions";

import { TVSHOWSURL } from "../../pageurl";

const TVShowsType = ( {slug} ) => {

    const [genres, setGenres] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const APIURL = requests.fetchTvGenres;
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
        if( slug in TVSHOWSURL ) {
            setGenres({name: TVSHOWSURL[slug].title, id: slug});
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
                        <DefaultBanner pageTitle={ genres.name + ' TV Show' } bannerImg="/assets/images/cinema-film-poster.jpg" />
                        <TVShowsList genreID={genres.id} pageTitle={genres.name + ' TV Show'} />
                    </> 
                    : <NotFoundPage />
                }
            </>
        }
        </>
    )
}
export default TVShowsType