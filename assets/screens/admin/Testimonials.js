import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import PrivateResource from "../../hooks/PrivateResource";

export default function Testimonials() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/testimonials?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            <section className={"page-section"}>
                <h2 className={"page-title"}>Testimonials</h2>
            </section>
        </HeaderAdmin>
    )
}