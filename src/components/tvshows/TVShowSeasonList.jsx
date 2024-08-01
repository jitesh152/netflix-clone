import { useEffect, useState } from "react";
import { fetchTVShowsDetailsURL, tbdbImgBaseURL } from "../../requests";
import AxiosInstance from "../../axios";
import { NAVURL } from "../../pageurl";
import { formatDate } from "../../functions";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons/faFilm";

import TVShowPosterBanner from "./TVShowPosterBanner";

const TVShowSeasonList = () => {

    const { tvShowSlug } = useParams();
    const [ tvShowID ] = tvShowSlug.split("-");

    const [ tvShowSeason, tvShowSeasonList ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect( () => {
        const APIURL = fetchTVShowsDetailsURL( tvShowID );
        const fetchData = async () => {
            const request = await AxiosInstance.get( APIURL );
            tvShowSeasonList( request.data );
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
                <TVShowPosterBanner tvShowID={tvShowID} pageTitle="Season List" />
                <section className="py-5 season-list">
                    <div className="container">
                        {
                            tvShowSeason.seasons.map( (season, i) => {
                                const seasonURL = NAVURL.tv + '/' + tvShowSlug + '/season/' + season.season_number;
                                return (
                                    <div key={i} className="season-info mb-4">
                                        <div className="__img">
                                        <Link to={seasonURL}>
                                        {
                                            ( season.poster_path === '' || season.poster_path === null ) ? <FontAwesomeIcon icon={faFilm} /> :
                                            <img src={tbdbImgBaseURL + season.poster_path} alt={season.name} />
                                        }
                                        </Link>
                                        </div>
                                        <div className="__text">
                                            <h3><Link to={seasonURL}>{season.name}</Link></h3>
                                            <div className="episode-info">
                                                <span>{formatDate(season.air_date)}</span>
                                                <span>{season.episode_count} Episodes</span>
                                            </div>
                                            <p>{season.overview}</p>
                                        </div>
                                    </div>
                                )
                            } )
                        }
                    </div>
                </section>
                </>
            }
        </>
    )
}
export default TVShowSeasonList;
