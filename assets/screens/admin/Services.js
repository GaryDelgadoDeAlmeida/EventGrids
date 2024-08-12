import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification"
import PrivateResource from "../../hooks/PrivateResource"

export default function Services() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/services?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            {loading && (
                <Notification classname={"information"} message={"Loading ..."} />
            )}

            {!loading && (
                <>
                    {Object.keys(error).length > 0 && Object.keys(items.results ?? []).length == 0 && (
                        <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                    )}

                    {Object.keys(items.results ?? []).length > 0 ? (
                        <div className={"page-section"}>
                            <h2 className={"page-title"}>Services</h2>
        
                            <div className={"d-col -g-15"}>
                                {Object.values(items.results).map((item, index) => (
                                    <div key={index} className={"table-card"}>
                                        <div className={"-top"}>
                                            <span>{index + 1}</span>
                                        </div>
                                        <div className={"-center"}>
                                            <span>{item.title}</span>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className={"-bottom"}>
                                            <Link className={"btn btn-primary"} to={"/admin/service/" + item.id}>
                                                <span>See</span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Notification classname={"information"} message={"There is no services"} />
                    )}
                </>
            )}
        </HeaderAdmin>
    )
}