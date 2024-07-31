import React from "react";

export default function TeamCard({
    imgPath,
    fullname,
    job
}) {

    return (
        <div className={"team-card"}>
            <div className={"-header"}>
                <img src={`${window.location.origin}${imgPath}`} alt={""} />
            </div>
            <div className={"-content"}>
                <label className={"-title"}>{fullname}</label>
                <label className={"-job"}>{job}</label>
            </div>
        </div>
    )
}