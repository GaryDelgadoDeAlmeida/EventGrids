import React from "react";

export default function ServiceCard({
    imgPath,
    index,
    title,
    description
}) {
    return (
        <div className={"feature-card"}>
            <div className={"-header"}>
                <img src={`${window.location.origin}${imgPath}`} alt="" />
                <span>{index}</span>
            </div>
            <div className={"-content"}>
                <label className={"-title"}>{title}</label>
                <p>{description}</p>
            </div>
        </div>
    )
}