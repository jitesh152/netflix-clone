import { useEffect, useState } from "react";
import AxiosInstance from "../../axios";
import { Link } from "react-router-dom";
import { NAVURL } from "../../pageurl";
import { stringToSlug } from "../../functions";

const GenreList = ( {fetchURL, genreID} ) => {

    const [genre, setGenre] = useState({});

    useEffect( () => {
        const fetchData = async() => {
            if(fetchURL === '') return;
            try {
                const request = await AxiosInstance.get(fetchURL);
                setGenre(request.data);
            } catch (error) {
                
            }
        }
        fetchData();
    },[fetchURL] );

    return (
        <>
        <div className="genre-list">
            <ul>
                {
                    (typeof genre.genres !== 'undefined' && genre.genres !== null) ?
                    <>
                    {
                        genre.genres.map( (val, i) => {
                            const genreURL = NAVURL.movie + '/' + stringToSlug(val.name);
                            const active = (genreID === val.id) ? 'active' : '';
                            return (
                                <li data-id={val.id} className={active} key={i}>
                                    <Link to={genreURL}>{val.name}</Link>
                                </li>
                            );
                        } )
                    }
                    </>
                    : null
                }
            </ul>
        </div>
        </>
    );
}
export default GenreList;