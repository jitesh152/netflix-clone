

import AxiosInstance from "../../axios";
import { fetchPersonCreditsURL } from "../../requests";
import { stringToSlug, groupByYear } from "../../functions";

import { NAVURL } from "../../pageurl";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PersonCredits = ({ personID, creditType = 'all'}) => {

    const [crewCredit, setCrewCredits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [castCredit, setCastCredit] = useState([]);

    useEffect( () => {

        const fetchData = async() => {
            const APIURL = fetchPersonCreditsURL( personID, creditType );
            try {
                const request = await AxiosInstance.get(APIURL);
                setCrewCredits(groupByYear(request.data.crew));
                setCastCredit(groupByYear(request.data.cast));
            } catch (error) {
                
            }
        }
        fetchData();

    }, [creditType] )

    const castCreditKey = Object.keys(castCredit).sort((a, b) => b.localeCompare(a));

    return (
        <>
        {
            castCreditKey.map( (val, key) => {
                const castCreditVal = castCredit[val];
                return(
                    <div key={key} className="person-credit-group">
                        { 
                            castCreditVal.map( (movie, i) => {
                            
                                const movieName = (typeof movie.title !== 'undefined' && movie.title !== null) ? movie.title : movie.name;
                                const mediaType = (typeof movie.media_type !== 'undefined' && movie.media_type == 'tv') ? NAVURL.tv : NAVURL.movie;
                                const movieSlug = mediaType + '/' + movie.id + '-' + stringToSlug(movieName);
                                return (
                                    <div key={movie.id + i} className="person-credit-list">
                                        <div className="credit-year">
                                            { val === 'NaN' ? '—' : val }
                                        </div>
                                        <div className="credit-circle"><span className="__icon"></span></div>
                                        <div className="credit-for">
                                            <span className="credit-name"><Link to={movieSlug}>{movieName}</Link></span>
                                            {
                                                (movie.character !== '') ? 
                                                <span className="credit-character">as <span>{movie.character}</span></span>
                                                : null
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            })
        }
        </>
    )
}

export default PersonCredits;