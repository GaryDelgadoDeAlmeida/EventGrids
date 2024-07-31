import React from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import ContactForm from "../../forms/ContactForm";

export default function Contact() {

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/conten/img/background-hero.png`} alt={""} />
                    <div className={"hero-superposition"}></div>
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Contact us</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>Contact us</span>
                    </div>
                </div>
            </section>
            
            <section className={"page-section py-100"}>
                <div className={"page-wrapper"}>
                    <div className={"contact-card"}>
                        <div className={""}></div>
                        <div className={""}>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </Header>
    )
}