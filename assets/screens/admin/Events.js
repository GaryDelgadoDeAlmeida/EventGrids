import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin"
import PrivateResource from "../../hooks/PrivateResource"

export default function Events() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/events?limit=20&offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            <div className={"page-section"}>
                <h2 className={"page-title"}>Events</h2>
            </div>
        </HeaderAdmin>
    )
}