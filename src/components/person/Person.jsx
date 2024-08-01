import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import AxiosInstance from "../../axios";

import { fetchPersonDetailsURL, tbdbImgBaseURL } from "../../requests";
import { changePageTitle, formatDate, scrollToTop } from "../../functions";

import PersonCredits from "./PersonCredits";
import NotFoundPage from "../../NotFoundPage";
import ReadMoreParagraph from "../common/ReadMoreParagraph";

export default function Person() {

    const { personSlug } = useParams();
    const [ personID ] = personSlug.split("-");

    const [ person, setPerson ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [ creditType, setCreditType ] = useState({all : 'active', movie : '', tv : '', value : 'all' });

    const handleCreditType = (e) => {
        let name = e.target.name;
        scrollToTop(0, 400);
        switch(name) {
            case 'movie' :
                return setCreditType({all : '', movie : 'active', tv : '', value : 'movie' });
            case 'tv' :
                return setCreditType({all : '', movie : '', tv : 'active', value : 'tv' });

            default : return setCreditType({all : 'active', movie : '', tv : '', value : 'all' });
        }
    }

    useEffect ( () => {
        const APIURL = fetchPersonDetailsURL( personID );
        const fetchData = async () => {
            if( !(/^[0-9]/.test(personID)) ) {
                return;
            }
            try {
                const request = await AxiosInstance.get( APIURL );
                setPerson( request.data );
                setLoading(false);

                changePageTitle(request.data.name);
                return request;
            } catch (error) {
                setLoading(false);
            }
        };

       fetchData();
    },[personSlug] );

    if( !(/^[0-9]/.test(personID)) ) {
        return <NotFoundPage />
    }

    return (
        <>
        {
            loading ? <div>Loading...</div> : 
            <>
            <section className='person-banner'>
                <div className="section-overlay-color">
                    <div className="container pt-110 pb-4">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 mb-3 mb-md-0">
                                <div className="poster-img">
                                    <img src={tbdbImgBaseURL + person.profile_path} alt={person.name} />
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="poster-content px-lg-4">
                                    <h1 className="mb-4">{person.name}</h1>
                                    <h2>Biography</h2> 
                                    {
                                        person.biography === '' ? "We don't have a biography for "+person.name+"." : <ReadMoreParagraph text={person.biography} />
                                    }                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-4 person-infomation">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <h3>Personal Info</h3>
                            <div className="person-info">
                                <p><bdi>Known For</bdi>{person.known_for_department}</p>
                            </div>
                            <div className="person-info">
                                <p><bdi>Gender</bdi>
                                { person.gender === 2 ? 'Male' : '' }
                                { person.gender === 1 ? 'Female' : '' }
                                { person.gender === 3 ? 'Non Binary' : '' }
                                </p>
                            </div>
                            <div className="person-info">
                                <p><bdi>Birthday</bdi>{formatDate(person.birthday)}</p>
                            </div>
                            <div className="person-info">
                                <p><bdi>Place of Birth</bdi>{person.place_of_birth}</p>
                            </div>
                            <div className="person-info">
                                <bdi>Also Known As</bdi>
                                <ul>
                                {
                                    person.also_known_as.map( (v, i) => {
                                        return(
                                            <li key={i}>{v}</li>
                                        )
                                    } )
                                }
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="__sticky-btn">
                                <div className="btn-group" role="group" aria-label="Cast Credit">
                                    <button onClick={handleCreditType} name="all" type="button" className={'btn btn-outline-primary ' + creditType.all} >All Credits</button>
                                    <button onClick={handleCreditType} name="movie" type="button" className={'btn btn-outline-primary ' + creditType.movie} >Movie Credits</button>
                                    <button onClick={handleCreditType} name="tv" type="button" className={'btn btn-outline-primary ' + creditType.tv} >TV Credits</button>
                                </div>
                            </div>
                            <div className="card mt-4">
                                <PersonCredits personID={personID} creditType={creditType.value} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
        }
        </>
    )
}
