import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin"
import Notification from "../../components/Notification"
import PrivateResource from "../../hooks/PrivateResource"

export default function Events() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/events?limit=20&offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    const handleRemoveEvent = (e) => {}

    return (
        <HeaderAdmin>
            <Link className={"btn btn-m btn-green"} to={"/admin/events/add"}>Add an event</Link>

            <div className={"page-section mt-25"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && Object.keys(items.results ?? []).length == 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}
                        
                        {Object.keys(items.results ?? []).length > 0 ? (
                            <div className={"d-col -g-15"}>
                                {Object.values(items.results).map((item, index) => (
                                    <div key={index} className={"table-card"}>
                                        <div className={"-top"}>
                                            <span>{item.id}</span>
                                        </div>
                                        <div className={"-center"}></div>
                                        <div className={"-bottom"}>
                                            <Link className={"btn btn-primary"} to={"/admin/event" + item.id}>
                                                <span>See</span>
                                            </Link>

                                            <button type={"button"} className={"btn btn-red"}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Notification classname={"information"} message={"There is no events"} />
                        )}
                    </>
                )}
            </div>
        </HeaderAdmin>
    )
}