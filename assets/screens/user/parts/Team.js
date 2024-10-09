import React from "react";
import TeamCard from "../../../components/TeamCard";

export default function Team() {

    const teams = [
        {
            imgPath: "/content/img/teams/speaker1.jpg",
            fullname: "Garry ALMEIDA",
            job: "Fullstack Developer"
        },
        {
            imgPath: "/content/img/teams/speaker2.jpg",
            fullname: "Garry ALMEIDA",
            job: "Fullstack Developer"
        },
        {
            imgPath: "/content/img/teams/speaker3.jpg",
            fullname: "Garry ALMEIDA",
            job: "Fullstack Developer"
        },
        {
            imgPath: "/content/img/teams/speaker4.jpg",
            fullname: "Garry ALMEIDA",
            job: "Fullstack Developer"
        },
        {
            imgPath: "/content/img/teams/speaker5.jpg",
            fullname: "Garry ALMEIDA",
            job: "Fullstack Developer"
        },
        {
            imgPath: "/content/img/teams/speaker6.jpg",
            fullname: "Garry ALMEIDA",
            job: "Fullstack Developer"
        },
        {
            imgPath: "/content/img/teams/speaker7.jpg",
            fullname: "Garry ALMEIDA",
            job: "Fullstack Developer"
        },
        {
            imgPath: "/content/img/teams/speaker8.jpg",
            fullname: "Garry ALMEIDA",
            job: "Fullstack Developer"
        }
    ]

    return (
        <section className={"page-section py-100 bg-white"}>
            <div className={"page-wrapper"}>
                <h4 className={"page-suptitle"}>Speakers</h4>
                <h2 className={"page-title"}>Todays Performers</h2>
                <p className={"page-description"}>Lorem ipsum dolor sit amet. Et itaque velit non repudiandae ipsum non voluptatum autem ad galisum tempore non repellendus veniam aut rerum praesentium non vitae sint.</p>

                <div className={"d-grid -g-25 -col-4"}>
                    {teams.map((item, index) => (
                        <TeamCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}