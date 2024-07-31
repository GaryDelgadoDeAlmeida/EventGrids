import React from "react";
import { Link } from "react-router-dom";

export default function Pricing() {

    return (
        <section className={"page-section py-100"}>
            <div className={"page-background"}>
                <img src={`${window.location.origin}/content/img/background-pricing.jpg`} alt={""} />
                <div className={"page-superposition"}></div>
            </div>
            <div className={"page-wrapper c-white"}>
                <h4 className={"page-suptitle"}>Pricing</h4>
                <h2 className={"page-title"}>Pricing & Plan</h2>
                <p className={"page-description"}>Lorem ipsum dolor sit amet. Et itaque velit non repudiandae ipsum non voluptatum autem ad galisum tempore non repellendus veniam aut rerum praesentium non vitae sint.</p>

                <div className={"page-pricing"}>
                    <div className={"price-card"}>
                        <div className={"-top"}>
                            <span className={"badge badge-blue"}>Regular</span>
                        </div>
                        <div className={"-center"}>
                            <label className={"-description"}>Available ticket for this days</label>
                            <span className={"-price"}>20 €</span>
                            <div className={"d-flex jf-content-center"}>
                                <Link className={"btn btn-primary btn-bold"} to={"/buy-tickets"}>Get Ticket</Link>
                            </div>
                        </div>
                        <div className={"-bottom"}>
                            <li>One Day Conférence Ticket</li>
                            <li>Posters Session</li>
                            <li>Coffee-break & Networking</li>
                            <li>Lunch & & Networking</li>
                            <li>Keynote talk</li>
                        </div>
                    </div>
                    <div className={"price-card"}>
                        <div className={"-top"}>
                            <span className={"badge badge-secondary"}>Regular</span>
                        </div>
                        <div className={"-center"}>
                            <label className={"-description"}>Available ticket for this days</label>
                            <span className={"-price"}>40 €</span>
                            <div className={"d-flex jf-content-center"}>
                                <Link className={"btn btn-secondary-bis btn-bold"} to={"/buy-tickets"}>Get Ticket</Link>
                            </div>
                        </div>
                        <div className={"-bottom"}>
                            <li>One Day Conférence Ticket</li>
                            <li>Posters Session</li>
                            <li>Coffee-break & Networking</li>
                            <li>Lunch & & Networking</li>
                            <li>Keynote talk</li>
                        </div>
                    </div>
                    <div className={"price-card"}>
                        <div className={"-top"}>
                            <span className={"badge badge-blue"}>Regular</span>
                        </div>
                        <div className={"-center"}>
                            <label className={"-description"}>Available ticket for this days</label>
                            <span className={"-price"}>60 €</span>
                            <div className={"d-flex jf-content-center"}>
                                <Link className={"btn btn-primary btn-bold"} to={"/buy-tickets"}>Get Ticket</Link>
                            </div>
                        </div>
                        <div className={"-bottom"}>
                            <li>One Day Conférence Ticket</li>
                            <li>Posters Session</li>
                            <li>Coffee-break & Networking</li>
                            <li>Lunch & & Networking</li>
                            <li>Keynote talk</li>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}