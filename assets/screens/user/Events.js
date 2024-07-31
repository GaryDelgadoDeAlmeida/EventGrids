import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import EventsParts from "./parts/Events";

export default function Events() {

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-hero.png`} alt={""} />
                    <div className={"hero-superposition"}></div>
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Events</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>Events</span>
                    </div>
                </div>
            </section>

            <EventsParts />

            <section className={"page-section"}>
                <div className={"page-background"}>
                    <img src={`${window.location.origin}/content/img/background-banner.jpg`} alt={""} />
                    <div className={"page-superposition"}></div>
                </div>
                <div className={"page-wrapper c-white"}>
                    <div className={"d-flex -m-column"}>
                        <div className={"text-left"}>
                            <h4 className={"page-suptitle"}>Hurry Up!</h4>
                            <h2 className={"page-title"}>Europe’s Leading Conference Book your Seat Now</h2>
                            <p className={"page-description"}>Entertainment & technology show inspirational speakers including game changing not just a large-scale conference but a hub.</p>
                        </div>
                        <div className={"text-right mx-auto"}>
                            <Link className={"btn btn-white -inline-flex"} to={"/buy-tickets"}>
                                <span>Get Tickets</span>
                                <img src={`${window.location.origin}/content/svg/ticket-white.svg`} alt={""} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Header>
    )
}