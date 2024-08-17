import React from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import TestimonialForm from "../../forms/TestimonialForm"

export default function TestimonialNew() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-m btn-primary"} to={"/admin/testimonials"}>Return</Link>

            <section className={"page-section mt-25"}>
                <TestimonialForm />
            </section>
        </HeaderAdmin>
    )
}