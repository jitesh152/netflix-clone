import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../axios';
import { Link } from 'react-router-dom';
import { tbdbImgBaseURL } from '../../requests';
import { stringToSlug } from '../../functions';
import { NAVURL } from '../../pageurl';

const RowView = ( {title, fetchURL, pageURL} ) => {

    const [ movies, setMovies ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect ( () => {
        const fetchData = async () => {
            const request = await AxiosInstance.get( fetchURL );
            // console.log(request.data.results);
            setMovies( request.data.results );
            setLoading(false);
            return request;
        };

        fetchData();
    }, [fetchURL] );

    return (
        <section className="section-padding">
            <div className="container">
                {
                    title ? <>
                    <div className='row'>
                        <div className="col-12">
                            <h2>{title}</h2>
                            {
                                pageURL ? <div className="view-all-link"><Link to={pageURL}>View All</Link></div> : null
                            }
                        </div>
                    </div>   
                    </> : null
                }
                <div className="row__posters">
                    {
                        loading ? 
                        <div className='loading'><p>Loading...</p></div> : 
                        <>
                            {
                                movies.map( ( movie, i ) => {
                                    const movieName = (typeof movie.title !== 'undefined' && movie.title !== null) ? movie.title : movie.name;
                                    const mediaType = (typeof movie.media_type !== 'undefined' && movie.media_type === 'tv') ? NAVURL.tv : NAVURL.movie;
                                    const movieSlug = mediaType + '/' + movie.id + '-' + stringToSlug(movieName);
                                    return (
                                        <div key={i} className="row__poster">
                                            <div className="image">
                                                <Link to={movieSlug}>
                                                    <img src={tbdbImgBaseURL + movie.poster_path} alt={movieName} />
                                                </Link>
                                            </div>
                                            <div className="name">
                                                <Link to={movieSlug}>{movieName}</Link>
                                            </div>
                                        </div>
                                    );
                                } )
                            }
                        </>
                    }
                </div>
            </div>
        </section>
    )
}

export default RowView