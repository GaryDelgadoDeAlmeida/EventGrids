import React from "react";

export default function PopularArticleCard({imgPath, title, date}) {

    return (
        <div className={"popular-article-card"}>
            <img src={`${window.location.origin}${imgPath}`} alt={title} />
            <div className={"-content"}>
                <h4>{title}</h4>
                <label className={"d-flex -g-5"}>
                    <img src={`${window.location.origin}/content/svg/calendar.svg`} alt={""} />
                    <span>{date}</span>
                </label>
            </div>
        </div>
    )
}