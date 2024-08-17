import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification"
import PrivateResource from "../../hooks/PrivateResource"
import { findParent } from "../../hooks/DomControl"
import axios from "axios";

export default function Services() {

    const [formResponse, setFormResponse] = useState({})
    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/services?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    const handleRemoveService = (e) => {
        let serviceID = e.currentTarget.getAttribute("data-service")
        console.log(serviceID)

        let parent = findParent(e.currentTarget, "table-card")
        if(parent.length == 0) {
            return
        }

        axios
            .delete(`${window.location.origin}/api/backoffice/service/${serviceID}/remove`)
            .then((response) => {
                if(response.status == 204) {
                    parent.remove()
                }
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered. Please retry later"
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                } else if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                }

                setFormResponse({classname: "danger", message: errorMessage})
            })
        ;
    }

    return (
        <HeaderAdmin>
            <Link className={"btn btn-m btn-green"} to={"/admin/services/add"}>Add a service</Link>

            <section className={"page-section mt-25"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && Object.keys(items.results ?? []).length == 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items.results ?? {}).length > 0 ? (
                            <div className={"d-col -g-15"}>
                                {Object.values(items.results).map((item, index) => (
                                    <div key={index} className={"table-card"}>
                                        <div className={"-top"}>
                                            <span>#{index + 1}</span>
                                        </div>
                                        <div className={"-center"}>
                                            <label>{item.title}</label>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className={"-bottom d-flex -g-5"}>
                                            <Link className={"btn btn-m btn-primary"} to={"/admin/service/" + item.id}>
                                                <span>See</span>
                                            </Link>
                                            <button data-service={item.id} onClick={(e) => handleRemoveService(e)} className={"btn btn-m btn-red"}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Notification classname={"information"} message={"There is no services"} />
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}