
import DefaultBanner from "../common/DefaultBanner";
import MovieList from "./MovieList";

export default function Movies( ) {

    return (
        <>
            <DefaultBanner pageTitle="Movies" bannerImg="/assets/images/cinema-film-poster.jpg" />
            <MovieList />
        </>
    )
}
