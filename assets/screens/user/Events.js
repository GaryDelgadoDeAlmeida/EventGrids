import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import EventsParts from "./parts/Events";
import Banner from "../../components/Banner";

export default function Events() {

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-hero.jpg`} alt={""} />
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

            <Banner
                supTitle={"Hurry Up!"}
                title={"Europe’s Leading Conference Book your Seat Now"}
                description={"Entertainment & technology show inspirational speakers including game changing not just a large-scale conference but a hub."}
            />
        </Header>
    )
}