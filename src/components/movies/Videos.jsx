import { useEffect, useState } from "react";
import { fetchMovieVideosURL } from "../../requests";
import AxiosInstance from "../../axios";
import YouTubeVideoModal from "../common/YouTubeVideoModal";
import { getYouTubeThumbnail } from "../../functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

const Videos = ( {movieID} ) => {

    const [movieVideos, setMovieVideos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [videoId, setVideoId] = useState('');

    const openModal = async ( videoID ) => {
        setVideoId(videoID);
        setIsOpen(true);
    };    
    const closeModal = () => {
        setIsOpen(false);
        setVideoId('');
    };

    useEffect( () => {

        const fetchData = async () => {
            const APIURL = fetchMovieVideosURL(movieID);
            try {
                const request = await AxiosInstance.get(APIURL);
                setMovieVideos(request.data.results);
            } catch (error) {
                
            }
        }
        fetchData();
    },[movieID] );

    return (
        <>
            {
                (movieVideos.length > 0) ?
                <>
                    <section className="movie-videos">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h2>Videos</h2>
                                    <div className="videos-row">
                                        {
                                            movieVideos.map( (video, i) => {
                                                return(
                                                    <div key={i} className="video-list">
                                                        <div onClick={()=>openModal(video.key)} className="__img">
                                                            <img src={getYouTubeThumbnail(video.key)} />
                                                            <span className="__icon">
                                                                <FontAwesomeIcon icon={faCirclePlay} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            } )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
                : null
            }
            <YouTubeVideoModal isOpen={isOpen} videoId={videoId} onClose={closeModal} />
        </>
    );
}
export default Videos;