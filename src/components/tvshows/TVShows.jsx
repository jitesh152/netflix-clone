import DefaultBanner from "../common/DefaultBanner";
import TVShowsList from "./TVShowsList";

const TVShows = () => {
    return (
        <>
            <DefaultBanner pageTitle="TV Shows" bannerImg="/assets/images/cinema-film-poster.jpg" />
            <TVShowsList />
        </>
    )
}
export default TVShows;