import { useEffect } from "react";
import DefaultBanner from "./components/common/DefaultBanner";

import { changePageTitle } from "./functions";

export default function NotFoundPage() {

    useEffect( () => {
        changePageTitle('Page Not Found');
    } )

    return (
        <>
            <DefaultBanner pageTitle="404" cssClass="page-404-banner" />
            <section className='page-404'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                           <h2>Page Not Found!</h2>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
