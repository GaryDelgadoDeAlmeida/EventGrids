import React from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import Team from "./parts/Team";

export default function Speakers() {

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-hero.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Speakers</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>Speakers</span>
                    </div>
                </div>
            </section>

            <Team />
        </Header>
    )
}