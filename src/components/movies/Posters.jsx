
import { useParams } from "react-router-dom";

import PosterBanner from "./PosterBanner";
import ImagesList from "./ImagesList";

import NotFoundPage from "../../NotFoundPage";

const Posters = () => {

    const { movieID, imgType} = useParams();

    if( imgType !== 'posters' && imgType !== 'backdrops' ) {
        return (
            <NotFoundPage />
        )
    }

    return (
        <>
            <PosterBanner movieID={movieID} />
            <ImagesList movieID={movieID} imgType={imgType} allImages='true' />
        </>
    )
}
export default Posters;