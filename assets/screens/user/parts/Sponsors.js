import React from "react";

export default function Sponsors() {

    return (
        <section className={"page-section py-100 bg-white"}>
            <div className={"page-wrapper"}>
                <h4 className={"page-suptitle"}>Sponsors</h4>
                <h2 className={"page-title"}>Our official sponsors</h2>
                <p className={"page-description"}>Lorem ipsum dolor sit amet. Et itaque velit non repudiandae ipsum non voluptatum autem ad galisum tempore non repellendus veniam aut rerum praesentium non vitae sint.</p>

                {/* <div className={"page-sponsors"}> */}
                <div className={"mw-50 -m-mw-100 w-100 my-auto"}>
                    <div className={"d-flex -g-25 -wrap jf-center"}>
                        <div className={"sponsor-card"}>
                            <img src={`${window.location.origin}/content/img/sponsors/graygrids-logo.svg`} alt={""} />
                        </div>
                        <div className={"sponsor-card"}>
                            <img src={`${window.location.origin}/content/img/sponsors/lineicons.svg`} alt={""} />
                        </div>
                        <div className={"sponsor-card"}>
                            <img src={`${window.location.origin}/content/img/sponsors/ayro-logo.svg`} alt={""} />
                        </div>
                        <div className={"sponsor-card"}>
                            <img src={`${window.location.origin}/content/img/sponsors/plain-admin.svg`} alt={""} />
                        </div>
                        <div className={"sponsor-card"}>
                            <img src={`${window.location.origin}/content/img/sponsors/uideck-logo.svg`} alt={""} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}