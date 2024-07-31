import React from "react";
import ServiceCard from "../../../components/ServiceCard";

export default function Services() {

    const services = [
        {
            imgPath: "/content/svg/microphone-white.svg",
            title: "Great speakers",
            description: "How you transform you business as tech, customer, habits industry dynamic change, find out from."
        },
        {
            imgPath: "/content/svg/users-white.svg",
            title: "New people",
            description: "How you transform you business as tech, customer, habits industry dynamic change, find out from."
        },
        {
            imgPath: "/content/svg/megaphone-speaker-white.svg",
            title: "Global Event",
            description: "How you transform you business as tech, customer, habits industry dynamic change, find out from."
        },
        {
            imgPath: "/content/svg/heart-white.svg",
            title: "Get inspired",
            description: "How you transform you business as tech, customer, habits industry dynamic change, find out from."
        },
        {
            imgPath: "/content/svg/trophy-white.svg",
            title: "Networking Session",
            description: "How you transform you business as tech, customer, habits industry dynamic change, find out from."
        },
        {
            imgPath: "/content/svg/smile-white.svg",
            title: "Meet New Faces",
            description: "How you transform you business as tech, customer, habits industry dynamic change, find out from."
        }
    ]

    return (
        <section className={"page-section py-100"}>
            <div className={"page-wrapper"}>
                <h4 className={"page-suptitle"}>Why join EventGrids?</h4>
                <h2 className={"page-title"}>Why You Should Join Event</h2>
                <p className={"page-description"}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>

                <div className={"d-grid -g-15 -col-3 -t-col-2 -m-col-1"}>
                    {services.map((item, index) => (
                        <ServiceCard 
                            key={index}
                            index={index < 10 ? "0" + (index + 1) : (index + 1)}
                            {...item}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}