import React from "react";
import { Link } from "react-router-dom";

export default function ArticleCard({imgPath}) {

    return (
        <div className={"blog-card"}>
            <div className={"-header"}>
                <img src={`${window.location.origin}${imgPath}`} alt={""} />
                <div className={"-date"}>
                    <span>29</span>
                    <span>Nov</span>
                </div>
            </div>
            <div className={"-content"}>
                <Link to={"/category/events"} className={"-category"}>Events</Link>
                <Link to={"/blog/1"} className={"-title"}>3 Best Practices for Keeping Your Event Clients Happy</Link>
                <p className={"-description"}>Lorem ipsum dolor sit amet, adipscing elitr, sed diam nonumy eirmod tempor ividunt dolore magna.</p>
                <Link className={"btn btn-article -inline-flex"} to={"/blog/1"}>
                    <span>Read blog &rarr;</span>
                </Link>
            </div>
        </div>
    )
}