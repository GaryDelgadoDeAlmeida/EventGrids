import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({imgPath}) {

    return (
        <div className={"event-card"}>
            <div className={"-header"}>
                <span>30</span>
                <div className={"d-col mx-auto"}>
                    <strong>March</strong>
                    <span className={"c-gray"}>8:00AM &minus; 8:45AM</span>
                </div>
            </div>
            <div className={"-content"}>
                <img src={`${window.location.origin}${imgPath}`} alt={""} />
                <div className={"d-col mx-auto"}>
                    <label className={"-title"}>Lorem ipsum dolor sit</label>
                    <div className={"-infos"}>
                        <div className={"-info"}>
                            <img src={`${window.location.origin}/content/svg/avatar.svg`} alt={""} />
                            <span>By: Garry ALMEIDA</span>
                        </div>
                        <div className={"-info"}>
                            <img src={`${window.location.origin}/content/svg/location.svg`} alt={""} />
                            <span>At: Paris</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"-footer"}>
                <Link className={"btn btn-primary btn-bold"} to={"/event/1"}>Read more</Link>
            </div>
        </div>
    )
}