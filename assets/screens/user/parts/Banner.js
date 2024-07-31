import React, { useEffect } from "react";

export default function Banner() {

    let currentTime = Date.now()
    useEffect(() => {
        setInterval(() => {
            currentTime = Date.now()
        }, 1000)
    })

    return (
        <section className={"page-section -mt-175 py-50"}>
            <div className={"page-wrapper"}>
                <div className={"banner"}>
                    <div className={"banner-background"}>
                        <img src={`${window.location.origin}/content/img/banner/left-shape.png`} alt={""} />
                        <img src={`${window.location.origin}/content/img/banner/right-shape.png`} alt={""} />
                    </div>
                    <div className={"banner-wrapper"}>
                        <div className={"banner-list"}>
                            <div className={"-item"}>
                                <span className={"-number"}>130</span>
                                <span>Days</span>
                            </div>
                            <div className={"-item"}>
                                <span className={"-number"}>05</span>
                                <span>Hours</span>
                            </div>
                            <div className={"-item"}>
                                <span className={"-number"}>47</span>
                                <span>Minutes</span>
                            </div>
                            <div className={"-item"}>
                                <span className={"-number"}>48</span>
                                <span>Secondes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}