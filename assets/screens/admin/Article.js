import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import ArticleForm from "../../forms/ArticleForm"
import Notification from "../../components/Notification";
import PrivateResource from "../../hooks/PrivateResource";

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

            <section className={"page-section mt-25"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items ?? []).length > 0 && (
                            <ArticleForm />
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}