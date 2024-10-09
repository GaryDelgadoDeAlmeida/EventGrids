import React from "react";
import { Link } from "react-router-dom";

export default function Banner({
    supTitle,
    title,
    description
}) {

    return (
        <section className={"page-banner"}>
            <div className={"page-background"}>
                <img src={`${window.location.origin}/content/img/background-banner.jpg`} alt={""} />
                <div className={"page-superposition"}></div>
            </div>
            <div className={"page-wrapper c-white"}>
                <div className={"d-flex -g-25 -m-column"}>
                    <div className={"mw-50 -m-mw-100 txt-left"}>
                        <h4 className={"page-suptitle"}>{supTitle}</h4>
                        <h2 className={"page-title"}>{title}</h2>
                        {description && (
                            <p className={"page-description"}>{description}</p>
                        )}
                    </div>
                    <div className={"w-100 mw-50 -m-mw-100 txt-right mx-auto"}>
                        <Link className={"btn btn-white btn-bold -invert -inline-flex"} to={"/buy-tickets"}>
                            <span>Get Tickets</span>
                            <img src={`${window.location.origin}/content/svg/ticket.svg`} alt={""} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}