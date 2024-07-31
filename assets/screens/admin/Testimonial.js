import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin"
import PrivateResource from "../../hooks/PrivateResource"

export default function Testimonial() {
    const { testimonialID } = useParams()
    if(isNaN(testimonialID)) {
        return <Navigate to={"/admin/testimonials"} />
    }

    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/testimonial/${testimonialID}`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <section className={"page-section"}>
                <h2 className={"page-title"}>Testimonial</h2>
            </section>
        </HeaderAdmin>
    )
}