import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PrivateResource from "../../hooks/PrivateResource";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";

export default function Comment() {

    const { commentID } = useParams()
    if(isNaN(commentID)) {
        return <Navigate to={"/admin/comments"} />
    }

    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/backoffice/comment/${commentID}`)
    useEffect(() => {
        load()
    }, [commentID])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-primary btn-m"} to={"/admin/comments"}>Return</Link>

            <section className={"page-section mt-25"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items ?? {}).length > 0 && (
                            <p>Hello single</p>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}