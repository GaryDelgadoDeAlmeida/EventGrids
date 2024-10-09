import React from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import { Link } from "react-router-dom";

export default function Gallery() {

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-hero.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Gallery</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>Gallery</span>
                    </div>
                </div>
            </section>

            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Gallery</h2>
                </div>
            </section>

            <Banner
                supTitle={"Hurry Up!"}
                title={"Europe’s Leading Conference Book your Seat Now"}
                description={"Entertainment & technology show inspirational speakers including game changing not just a large-scale conference but a hub."}
            />
        </Header>
    )
}