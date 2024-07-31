import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Team from "./parts/Team";
import Services from "./parts/Services";
import Experience from "./parts/Experience";
import { ucwords } from "../../hooks/DomControl";

export default function About() {

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-hero.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>{ucwords("About us")}</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>About Us</span>
                    </div>
                </div>
            </section>

            <Services />

            <Experience />

            <Team />
        </Header>
    )
}