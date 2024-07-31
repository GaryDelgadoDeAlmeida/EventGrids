import React from "react";
import TestimonialCard from "../../../components/TestimonialCard"

export default function Testimonials() {

    const testimonials = [
        {
            imgPath: "/content/img/testimonials/testi-1.png",
            fullname: "Garry ALMEIDA",
            job: "Fullstack Developer",
            note: 5,
            comment: "Lorem ipsum dolor sit amet. Et itaque velit non repudiandae ipsum non voluptatum autem ad galisum tempore non repellendus veniam aut rerum praesentium non vitae sint."
        },
        {
            imgPath: "/content/img/testimonials/testi-2.png",
            fullname: "Garry ALMEIDA",
            job: "Fullstack Developer",
            note: 5,
            comment: "Lorem ipsum dolor sit amet. Et itaque velit non repudiandae ipsum non voluptatum autem ad galisum tempore non repellendus veniam aut rerum praesentium non vitae sint."
        },
        {
            imgPath: "/content/img/testimonials/testi-3.png",
            fullname: "Garry ALMEIDA",
            job: "Fullstack Developer",
            note: 5,
            comment: "Lorem ipsum dolor sit amet. Et itaque velit non repudiandae ipsum non voluptatum autem ad galisum tempore non repellendus veniam aut rerum praesentium non vitae sint."
        },
        {
            imgPath: "/content/img/testimonials/testi-1.png",
            fullname: "Garry ALMEIDA",
            job: "Fullstack Developer",
            note: 5,
            comment: "Lorem ipsum dolor sit amet. Et itaque velit non repudiandae ipsum non voluptatum autem ad galisum tempore non repellendus veniam aut rerum praesentium non vitae sint."
        }
    ]

    return (
        <section className={"page-section py-100"}>
            <div className={"page-wrapper"}>
                <h4 className={"page-suptitle"}>Testimonials</h4>
                <h2 className={"page-title"}>What People Says About Us</h2>
                <p className={"page-description"}>Lorem ipsum dolor sit amet. Et itaque velit non repudiandae ipsum non voluptatum autem ad galisum tempore non repellendus veniam aut rerum praesentium non vitae sint.</p>

                <div className={"caroussel"}>
                    {testimonials.map((item, index) => (
                        <TestimonialCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}