import { useEffect, useState } from "react";
import AxiosInstance from "../../../axios";
import { fetchTVShowEpisodeImageURL, tbdbImgBaseURL } from "../../../requests";

const EpisodeImages = ( {tvShowsID, seasonID, episodeID} ) => {

    const [loading, setLoading] = useState(true);
    const [ images, setImages ] = useState({});

    useEffect( () => {

        const fetchData = async() => {
            const APIURL = fetchTVShowEpisodeImageURL(tvShowsID, seasonID, episodeID);
            try {
                const request = await AxiosInstance.get(APIURL);
                setImages(request.data);
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
                    images.stills.length > 0 ? 
                    <section className="py-4">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="ps-2">Images</h2>
                                    <div className="images-row">
                                        {
                                            images.stills.map( (img, i) => {
                                                return (
                                                    <div key={i} className="image-list">
                                                        <img src={tbdbImgBaseURL + img.file_path} alt="Image" />
                                                    </div>
                                                )
                                            } )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    : null
                }
                </>
            }
        </>
    )
}
export default EpisodeImages