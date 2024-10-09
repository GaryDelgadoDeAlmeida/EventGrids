import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
import PrivateResource from "../../hooks/PrivateResource";
import { Link } from "react-router-dom";
import { findParent } from "../../hooks/DomControl";

export default function Inboxs() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/backoffice/inboxs?offset=${offset}`)
    
    useEffect(() => {
        load()
    }, [offset])

    const handleRemoveInbox = (e) => {
        let parent = findParent(e.currentTarget, "table-card")
        if(!parent) {
            return
        }
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
                                            <label>{item.fullname} ({item.emailAddress})</label>
                                            <p>{item.message}</p>
                                        </div>
                                        <div className={"-bottom"}>
                                            <Link to={"/admin/inbox/" + item.id}>See</Link>
                                            <button type={"button"} className={"btn btn-red"} onClick={(e) => handleRemoveInbox(e)}>Remove</button>
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
                            <Notification classname={"information"} message={"There is no inboxs"} />
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}