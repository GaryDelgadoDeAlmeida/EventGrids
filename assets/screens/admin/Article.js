import React, { useEffect } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import { Link, Navigate, useParams } from "react-router-dom";
import PrivateResource from "../../hooks/PrivateResource";
import Notification from "../../components/Notification";

export default function Article() {

    const { articleID } = useParams()
    if(isNaN(articleID)) {
        return <Navigate to={"/admin/articles"} />
    }

    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/backoffice/article/${articleID}`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/articles"}>Return</Link>

            {loading && (
                <Notification classname={"information"} message={"Loading ..."} />
            )}

            {!loading && Object.keys(error).length > 0 && (
                <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
            )}
            
            {!loading && Object.keys(items.results).length > 0 && (
                <section className={"page-section"}>
                    <h2 className={"page-title"}>Article detail</h2>
                </section>
            )}
        </HeaderAdmin>
    )
}