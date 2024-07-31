import React from "react";

export default function TestimonialCard({
    imgPath,
    fullname,
    job,
    note,
    comment
}) {

    return (
        <div className={"testimonial-card"}>
            <div className={"-header"}>
                <img src={`${window.location.origin}${imgPath}`} alt={""} />
                <div className={"d-col -g-5 mx-auto"}>
                    <label className={"-fullname"}>{fullname}</label>
                    <span className={"-job"}>{job}</span>
                    <div className={"-stars"}>
                        <i className={"-star"}></i>
                        <i className={"-star"}></i>
                        <i className={"-star"}></i>
                        <i className={"-star"}></i>
                        <i className={"-star"}></i>
                    </div>
                </div>
            </div>
            <div className={"-content"}>
                <p>{comment}</p>
            </div>
        </div>
    )
}