import React, { useEffect } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import PrivateResource from "../../hooks/PrivateResource";

export default function Sponsors() {

    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/sponsors`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <section className={"page-section"}>
                <h2 className={"page-title"}>Sponsors</h2>
            </section>
        </HeaderAdmin>
    )
}