import React from 'react'

export default function DefaultBanner( { pageTitle, cssClass = '', pageContent, bannerImg } ) {

    return (
        <section className={'default-banner ' + cssClass} style={{backgroundImage: `url(${bannerImg})`}}>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        {
                            pageTitle ? <h1>{ pageTitle }</h1> : null
                        }
                        {
                            pageContent ? <>{ pageContent }</> : null
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
