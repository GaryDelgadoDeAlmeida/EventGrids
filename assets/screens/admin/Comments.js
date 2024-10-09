import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin"
import Notification from "../../components/Notification";
import PrivateResource from "../../hooks/PrivateResource";
import { findParent } from "../../hooks/DomControl";
import axios from "axios";
import Pagination from "../../components/Pagination";

export default function Comments() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/comments?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    const handleRemoveComment = (e) => {
        let commentID = e.currentTarget.getAttribute("data-commentid")
        if(isNaN(commentID)) {
            return
        }

        let parent = findParent(e.currentTarget, "table-card")
        if(!parent) {
            return
        }

        axios
            .delete(`${window.location.origin}/api/backoffice/comment/${commentID}/remove`)
            .then((response) => {})
            .catch((error) => {})
        ;
    }

    return (
        <HeaderAdmin>
            <section className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items ?? {}).length > 0 ? (
                            <>
                                {Object.values(items.results).map((item, index) => (
                                    <div key={index} className={"table-card"}>
                                        <div className={"-top"}>
                                            <span>{item.id}</span>
                                        </div>
                                        <div className={"-center"}>
                                            <label>{item.user.fullname}</label>
                                            <p>{item.comment}</p>
                                        </div>
                                        <div className={"-bottom"}>
                                            <Link to={"/admin/comment/" + item.id}>See</Link>
                                            <button type={"button"} data-commentid={item.id} onClick={(e) => handleRemoveComment(e)}>Remove</button>
                                        </div>
                                    </div>
                                ))}

                                <Pagination
                                    offset={offset}
                                    setOffset={setOffset}
                                    maxOffset={items.maxOffset}
                                />
                            </>
                        ) : (
                            <Notification classname={"information"} message={"There is no comments"} />
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}