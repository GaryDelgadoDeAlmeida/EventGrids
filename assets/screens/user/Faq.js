import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header"
import { ucwords } from "../../hooks/DomControl";

export default function Faq() {

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-hero.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>{ucwords("FAQ")}</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>FAQ</span>
                    </div>
                </div>
            </section>

            <section className={"page-section py-100"}>
                <div className={"page-wrapper"}>
                    <h4 className={"page-suptitle"}>FAQ</h4>
                    <h2 className={"page-title"}>Frequently asked questions</h2>
                    <p className={"page-description"}></p>
                </div>
            </section>
        </Header>
    )
}