import React, { useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../../components/EventCard";

export default function Events() {

    const [currentOnglet, setCurrentOnglet] = useState("day-1")
    
    const handleOnglet = (e, ongletName) => {
        e.preventDefault()
        setCurrentOnglet(ongletName)
    }

    return (
        <section className={"page-section py-100"}>
            <div className={"page-wrapper"}>
                <h4 className={"page-suptitle"}>Events</h4>
                <h2 className={"page-title"}>Events Schedule</h2>
                <p className={"page-description"}>Lorem ipsum dolor sit amet. Et itaque velit non repudiandae ipsum non voluptatum autem ad galisum tempore non repellendus veniam aut rerum praesentium non vitae sint.</p>

                <div className={"page-events"}>
                    <div className={"event-menu"}>
                        <li className={`-item ${currentOnglet == "day-1" ? "-active" : ""}`} onClick={(e) => handleOnglet(e, "day-1")}>
                            <span>Day 1</span>
                            <span>March 23, 2024</span>
                        </li>
                        <li className={`-item ${currentOnglet == "day-2" ? "-active" : ""}`} onClick={(e) => handleOnglet(e, "day-2")}>
                            <span>Day 2</span>
                            <span>March 24, 2024</span>
                        </li>
                        <li className={`-item ${currentOnglet == "day-3" ? "-active" : ""}`} onClick={(e) => handleOnglet(e, "day-3")}>
                            <span>Day 3</span>
                            <span>March 25, 2024</span>
                        </li>
                        <li className={`-item ${currentOnglet == "day-4" ? "-active" : ""}`} onClick={(e) => handleOnglet(e, "day-4")}>
                            <span>Day 4</span>
                            <span>March 26, 2024</span>
                        </li>
                    </div>
                    <div className={"event-content"}>
                        {currentOnglet === "day-1" && (
                            <>
                                <EventCard imgPath={"/content/img/events/event1.jpg"} />
                                <EventCard imgPath={"/content/img/events/event2.jpg"} />
                                <EventCard imgPath={"/content/img/events/event3.jpg"} />
                            </>
                        )}

                        {currentOnglet === "day-2" && (
                            <>
                                <EventCard imgPath={"/content/img/events/event1.jpg"} />
                                <EventCard imgPath={"/content/img/events/event2.jpg"} />
                                <EventCard imgPath={"/content/img/events/event3.jpg"} />
                            </>
                        )}

                        {currentOnglet === "day-3" && (
                            <>
                                <EventCard imgPath={"/content/img/events/event1.jpg"} />
                                <EventCard imgPath={"/content/img/events/event2.jpg"} />
                                <EventCard imgPath={"/content/img/events/event3.jpg"} />
                            </>
                        )}

                        {currentOnglet === "day-4" && (
                            <>
                                <EventCard imgPath={"/content/img/events/event1.jpg"} />
                                <EventCard imgPath={"/content/img/events/event2.jpg"} />
                                <EventCard imgPath={"/content/img/events/event3.jpg"} />
                            </>
                        )}
                    </div>
                    <div className={"event-footer mt-25"}>
                        <Link className={"btn btn-secondary-bis btn-bold"} to={"/events"}>Load More</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}