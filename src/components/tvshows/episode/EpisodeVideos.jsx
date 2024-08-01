import { useEffect, useState } from "react";
import AxiosInstance from "../../../axios";
import { fetchTVShowEpisodeVideosURL, tbdbImgBaseURL } from "../../../requests";
import { getYouTubeThumbnail } from "../../../functions";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import YouTubeVideoModal from "../../common/YouTubeVideoModal";

const EpisodeVideos = ( {tvShowsID, seasonID, episodeID} ) => {

    const [loading, setLoading] = useState(true);
    const [videos, setVideos ] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [videoId, setVideoId] = useState([]);

    const openModal = ( videoID ) => {
        setIsOpen(true);
        setVideoId(videoID);
    };

    const closeModal = () => {
        setIsOpen(false);
        setVideoId('');
    };

    useEffect( () => {

        const fetchData = async() => {
            const APIURL = fetchTVShowEpisodeVideosURL(tvShowsID, seasonID, episodeID);
            try {
                const request = await AxiosInstance.get(APIURL);
                setVideos(request.data);
                setLoading(false);
            } catch (error) {
                
            }
        }
        fetchData();
    }, [tvShowsID, seasonID, episodeID] )

    return(
        <>
            { 
                loading ? <div>Loading....</div> :
                <>
                {
                    videos.results.length > 0 ? 
                    <section className="py-4 movie-videos">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="ps-2">Videos</h2>
                                    <div className="videos-row">
                                        {
                                            videos.results.map( (v, i) => {
                                                const img = getYouTubeThumbnail(v.key);
                                                return (
                                                    <div onClick={()=>openModal(v.key)} key={i} className="video-list">
                                                        <div className="__img">
                                                            <img src={img} alt={v.name} />
                                                        </div>
                                                        <div className="__icon">
                                                            <FontAwesomeIcon icon={faCirclePlay} />
                                                        </div>
                                                    </div>
                                                )
                                            } )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <YouTubeVideoModal isOpen={isOpen} videoId={videoId} onClose={closeModal} />
                    </section>
                    : null
                }
                </>
            }
        </>
    )
}
export default EpisodeVideos