import React from "react";

export default function CommentCard({imgPath, fullname, date, comment}) {

    return (
        <div className={"comment-card"}>
            <div className={"-header"}>
                <img className={"-avatar"} src={imgPath} alt={""} />
            </div>
            <div className={"-content"}>
                <label>{fullname}</label>
                <span>{date}</span>
                <p>{comment}</p>
            </div>
        </div>
    )
}