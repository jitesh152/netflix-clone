import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../axios';
import { fetchMovieImagesURL, tbdbImgBaseURL } from '../../requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons/faCircleArrowRight';
import { Link } from 'react-router-dom';
import { NAVURL } from '../../pageurl';

const ImagesList = ( {movieID, heading, imgType = 'backdrops', mediaType = 'movie', allImages = 'false'} ) => {

    const [movieImages, setMovieImages] = useState([]);

    useEffect( () => {
        const APIURL = fetchMovieImagesURL(movieID);
        const fetchData = async() => {
            try {
                const request = await AxiosInstance.get(APIURL);
                if( imgType == 'backdrops' )
                    setMovieImages(request.data.backdrops);
                else 
                    setMovieImages(request.data.posters);
            } catch (error) {
                
            }
        }
        fetchData();
    },[movieID] )

    return (
        <>
        {
            ( movieImages.length > 0 ) ? 
            <section className='movie-images'>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            { heading ? <h2>{heading}</h2> : null }

                            {
                                (allImages === 'true') ? 
                                <div class="row all-images-row">
                                    {
                                        movieImages.map( (image, i) => {                                           
                                            return (
                                                <div key={i} className='col-sm-3 mb-4'>
                                                    <img src={tbdbImgBaseURL + image.file_path} alt="Image" />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div className="images-row">
                                    {
                                        movieImages.map( (image, i) => {
                                            if( i > 12 ) return false;
                                            const mediaTypeSlug = (mediaType == 'tv') ? NAVURL.tv : NAVURL.movie;
                                            const viewAll = mediaTypeSlug + '/' + movieID + '/images/' + imgType;
                                            return (
                                                <div key={i} className='image-list'>
                                                    {
                                                        ( i < 12 ) ? 
                                                        <img src={tbdbImgBaseURL + image.file_path} alt="Image" />
                                                        : <div className='view-more'>
                                                            <Link to={viewAll}>View More <span><FontAwesomeIcon icon={faCircleArrowRight} /></span></Link>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
            : null
        }
        </>
    )
}
export default ImagesList;