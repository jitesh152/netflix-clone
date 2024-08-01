import React, { useEffect, useState } from 'react';
import requests, { tbdbImgBaseURL } from '../../requests';
import AxiosInstance from '../../axios';
import { formatDate, stringToSlug } from '../../functions';
import { Link } from 'react-router-dom';
import { NAVURL } from '../../pageurl';

const Banner = () => {

    const [ movies, setMovies ] = useState({});

    useEffect ( () => {
        const getRandomElement = (array) => {
            return array[Math.floor(Math.random() * array.length)];
        }
        const fetchData = async () => {
            const request = await AxiosInstance.get( requests.fetchComedyMovies );
            setMovies( getRandomElement(request.data.results) );
            return request;
        };

        fetchData();
    }, [] );

    const movieName = (typeof movies.title !== 'undefined' && movies.title !== null) ? movies.title : movies.name;
    const movieSlug = NAVURL.movie + '/' + movies.id + '-' + stringToSlug(movieName);

    return (
        <div className='banner'>
            {
                movies ? 
                <>
                <div className='banner__slide'>
                    <div className="banner__image">
                        <img src={tbdbImgBaseURL + movies.backdrop_path} alt={movies.title} />
                        <div className="overlay"></div>
                    </div>
                    <div className="banner__content">
                        <h1>{ movies.title }</h1>
                        <p>{ movies.overview }</p>
                        <div className="banner__buttons">
                            <Link to={movieSlug} className='banner__button'>View Details</Link>
                        </div>
                        <div>Release Date: { formatDate(movies.release_date) }</div>
                        <div>Ratings: { movies.vote_average }</div>
                    </div>
                </div>
                </> : <p>Loading...</p>
            }
        </div>
    )
}

export default Banner;
