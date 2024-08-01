import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchTVShowsDetailsURL, tbdbImgBaseURL } from "../../requests";
import AxiosInstance from "../../axios";
import { changePageTitle, stringToSlug } from "../../functions";
import { NAVURL } from "../../pageurl";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function TVShowPosterBanner( { tvShowID, backURL = '', pageTitle = 'Cast & Crew' } ) {

    const [ tvShowData, setTVShowData ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect( ()  => {
        const APIURL = fetchTVShowsDetailsURL(tvShowID);

        const fetchData = async () => {
            try {
                const request = await AxiosInstance.get(APIURL);
                setTVShowData( request.data );
                setLoading(false);
                changePageTitle(request.data.name + ' ' + pageTitle);
                return request;
            } catch (error) {
                
            }
        }
        fetchData();
    }, [tvShowID]);

    const tvShowName = (typeof tvShowData.name !== 'undefined' && tvShowData.name !== null) ? tvShowData.name : tvShowData.original_name;
    const tvShowSlug = (backURL == '') ? '/tv/' + tvShowID + '-' + stringToSlug(tvShowName) : backURL;

    return (
        <>
        {
            loading ? <div>Loading...</div> 
            : 
            <section className="small-banner movie-image-banner">
                <div className="small-banner-overlay">
                    <div className="container pt-110 pb-4">
                        <div className="banner-poster-row">
                            <div className="banner-poster-img">
                                <img src={tbdbImgBaseURL + tvShowData.poster_path} alt={tvShowData.original_title} />
                            </div>
                            <div className="poster-text">
                                <h2>{tvShowName}</h2>
                                <div className="__back-link">
                                    <Link to={tvShowSlug}><span className="__icon"><FontAwesomeIcon icon={faArrowLeft} /></span> Go to Main</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
        }
        </>
    )
}
