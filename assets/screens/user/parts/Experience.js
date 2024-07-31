import React from "react";

export default function Experience() {

    const handleClickVideo = (e) => {
        e.preventDefault()
    }

    return (
        <section className={"page-section py-100"}>
            <div className={"page-background"}>
                <div className={"bg-three"}></div>
            </div>
            <div className={"page-wrapper"}>
                <div className={"page-experience"}>
                    <div className={"-video"}>
                        <img src={`${window.location.origin}/content/img/about-image.jpg`} alt={""} />
                        <span className={"-icon"}>
                            <img src={`${window.location.origin}/content/svg/play.svg`} alt={""} />
                        </span>
                    </div>
                    <div className={"-content"}>
                        <h4 className={"-suptitle"}>Get experience</h4>
                        <h2 className={"-title"}>About the event</h2>
                        <div className={"-description"}>
                            <p>Lorem ipsum dolor sit amet. Et itaque velit non repudiandae ipsum non voluptatum autem ad galisum tempore non repellendus veniam aut rerum praesentium non vitae sint.</p>
                            <p>Lorem ipsum dolor sit amet. Et itaque velit non repudiandae ipsum non voluptatum autem ad galisum tempore non repellendus veniam aut rerum praesentium non vitae sint.</p>
                        </div>
                        <div className={"-date"}>
                            <div className={"-bubble"}>25th</div>
                            <span className={"-text"}>December 2023</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}