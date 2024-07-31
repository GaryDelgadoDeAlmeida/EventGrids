import React from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import Banner from "./parts/Banner";
import Experience from "./parts/Experience";
import Team from "./parts/Team";
import Events from "./parts/Events";
import Pricing from "./parts/Pricing";
import Sponsors from "./parts/Sponsors";
import Testimonials from "./parts/Testimonials";
import { ucwords } from "../../hooks/DomControl";
import Services from "./parts/Services";
import Articles from "./parts/Articles";

export default function Home() {

    return (
        <Header>
            <section className={"page-hero"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-hero.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <label className={"-hero-location"}>
                        <div className={"badge-location"}>
                            <img src={`${window.location.origin}/content/svg/pinpoint-white.svg`} alt={""} />
                            <span>Waterfront Hotel, London</span>
                        </div>
                    </label>
                    <h1 className={"-hero-title"}>{ucwords("The largest conference in Europe 2023")}</h1>
                    <p className={"-hero-description"}>Lorem ipsum dolor sit amet. Et itaque velit non repudiandae ipsum non voluptatum autem ad galisum tempore non repellendus veniam aut rerum praesentium non vitae sint.</p>
                    <div className={"d-flex my-auto"}>
                        <Link className={"btn btn-secondary btn-bold"} to={"/buy-ticket"}>Buy Ticket Now</Link>
                    </div>
                </div>
            </section>

            <Banner />

            <Services />

            <Experience />

            <Team />

            <Events />

            <Pricing />

            <Sponsors />

            <Testimonials />

            <Articles />

            {/* Footer Banner */}
            <section className={"page-section py-100"}>
                <div className={"page-background"}>
                    <img src={`${window.location.origin}/content/img/background-banner.jpg`} alt={""} />
                    <div className={"page-superposition"}></div>
                </div>
                <div className={"page-wrapper c-white"}>
                    <div className={"w-50 my-auto"}>
                        <h2 className={"page-title"}>Europe’s Leading Conference Book your Seat Now</h2>
                        <p className={"page-description"}>Entertainment & technology show inspirational speakers including game changing not just a large-scale conference but a hub.</p>
                        <div className={"d-flex"}>
                            <Link className={"btn btn-white -inline-flex -invert my-auto"} to={"/buy-tickets"}>
                                <span>Get Tickets</span>
                                <img src={`${window.location.origin}/content/svg/ticket.svg`} alt={""} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Header>
    )
}