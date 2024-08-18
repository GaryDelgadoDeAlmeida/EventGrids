import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification"
import { findParent } from "../../hooks/DomControl";
import PrivateResource from "../../hooks/PrivateResource";
import axios from "axios";

export default function Sponsors() {

    const [removeResponse, setRemoveResponse] = useState({})
    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/sponsors?offset=${offset}`)
    
    useEffect(() => {
        load()
    }, [offset])

    const handleRemove = (e) => {
        e.preventDefault()

        let parent = findParent(e.currentTarget, "table-card")
        if(!parent) {
            return
        }

        let sponsorID = e.currentTarget.getAttribute("data-sponsor")
        if(isNaN(sponsorID)) {
            return
        }

        axios
            .delete(`${window.location.origin}/api/backoffice/sponsor/${sponsorID}/remove`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token") ?? ""
                }
            })
            .then((response) => {
                parent.remove()
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered during the removal process. Please retry later"
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                } else if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                }

                setRemoveResponse({classname: "danger", message: errorMessage})
            })
        ;
    }

    return (
        <HeaderAdmin>
            <Link className={"btn btn-m btn-green"} to={"/admin/sponsors/add"}>Add a sponsor</Link>
            
            <section className={"page-section mt-25"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && Object.keys(items.results ?? []).length == 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items.results ?? []).length > 0 ? (
                            <>
                                {Object.keys(removeResponse).length > 0 && (
                                    <Notification {...removeResponse} />
                                )}

                                <div className={"d-col -g-15"}>
                                    {Object.values(items.results).map((item, index) => (
                                        <div key={index} className={"table-card"}>
                                            <div className={"-top"}>
                                                <span>{index + 1}</span>
                                            </div>
                                            <div className={"-center"}>
                                                <img src={`${window.location.origin}${item.photo}`} alt="" />
                                            </div>
                                            <div className={"-bottom d-flex -g-5"}>
                                                <Link to={"/admin/sponsor/" + item.id}>
                                                    <span>See</span>
                                                </Link>

                                                <button type={"button"} className={"btn btn-m btn-red"} data-sponsor={item.id} onClick={(e) => handleRemove(e)}>
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Pagination
                                    offset={offset}
                                    maxOffset={items.maxOffset}
                                    setOffset={setOffset}
                                />
                            </>
                        ) : (
                            <Notification classname={"information"} message={"There is no sponsors"} />
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}