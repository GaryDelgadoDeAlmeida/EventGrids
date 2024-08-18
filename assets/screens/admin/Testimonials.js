import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
import PrivateResource from "../../hooks/PrivateResource";
import Pagination from "../../components/Pagination"
import { findParent } from "../../hooks/DomControl"
import axios from "axios";

export default function Testimonials() {

    const [removeResponse, setRemoveResponse] = useState({})
    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/testimonials?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    const handleRemove = (e) => {
        setRemoveResponse({})

        let parent = findParent(e.currentTarget, "table-card")
        if(!parent) {
            setRemoveResponse({classname: "danger", message: "An unknown error has been encountered. Please retry later"})
            return
        }

        let testimonialID = e.currentTarget.getAttribute("data-testimonial")
        if(isNaN(testimonialID)) {
            setRemoveResponse({classname: "danger", message: "The testimonial identification isn't valid. The removal process has been cancelled"})
            return
        }

        axios
            .delete(`${window.location.origin}/api/backoffice/testimonial/${testimonialID}/remove`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token") ?? ""
                }
            })
            .then((response) => {
                parent.remove()
                setRemoveResponse({classname: "success", message: "The testimonial has been successfully removed"})
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
            <Link className={"btn btn-m btn-green"} to={"/admin/testimonials/add"}>Add a testimonial</Link>
            
            <section className={"page-section mt-25"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
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
                                                <span>#{item.id}</span>
                                            </div>
                                            <div className={"-center d-col -g-5"}>
                                                <label>{item.firstname} {item.lastname}</label>
                                                <span>{item.job}</span>
                                            </div>
                                            <div className={"-bottom d-flex -g-5"}>
                                                <Link className={"btn btn-m btn-blue"} to={`/admin/testimonial/${item.id}`}>
                                                    <span>See</span>
                                                </Link>
                                                
                                                <button type={"button"} className={"btn btn-m btn-red"} data-testimonial={item.id} onClick={(e) => handleRemove(e)}>
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
                            <Notification classname={"information"} message={"There is no testimonials registered"} />
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}