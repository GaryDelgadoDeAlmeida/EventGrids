import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import PrivateResource from "../../hooks/PrivateResource";

export default function Articles() {
    
    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/backoffice/articles?offset=${offset}`)
    
    useEffect(() => {
        load()
    }, [offset])

    const handleRemoveArticle = (e) => {
        e.preventDefault()
    }

    return (
        <HeaderAdmin>
            <section className={"page-section"}>
                <h2 className={"page-title"}>Articles</h2>
            </section>
        </HeaderAdmin>
    )
}