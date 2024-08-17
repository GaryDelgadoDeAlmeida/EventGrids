import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification"
import PrivateResource from "../../hooks/PrivateResource"
import { findParent } from "../../hooks/DomControl";
import axios from "axios";

export default function Teams() {

    const [removeResponse, setRemoveResponse] = useState({})
    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/teams?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    const handleRemoveMember = (e) => {
        let parent = findParent(e.currentTarget, "table-card")
        if(parent) {
            return
        }

        let teamID = e.currentTarget.getAttribute("data-team")
        if(isNaN(teamID)) {
            return
        }

        axios
            .delete(`${window.location.origin}/api/backoffice/team/${teamID}/remove`)
            .then((response) => {
                if(response.status == 203) {
                    parent.remove()
                }
            })
            .catch((error) => {
                let errorMessage = "The team member couldn't be deleted. Please retry later"
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
            <Link className={"btn btn-m btn-green"} to={"/admin/teams/add"}>Add a team member</Link>

            <div className={"page-section mt-25"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && Object.keys(items.results ?? []).length == 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items.results ?? {}).length > 0 ? (      
                            <>
                                {Object.keys(removeResponse).length > 0 && (
                                    <Notification {...removeResponse} />
                                )}

                                <div className={"d-col -g-15"}>
                                    {Object.values(items.results ?? {}).map((item, index) => (
                                        <div key={index} className={"table-card"}>
                                            <div className={"-top"}>
                                                <span>#{index + 1}</span>
                                            </div>
                                            <div className={"-center"}>
                                                <div className={"d-flex -g-25"}>
                                                    {item.photo.length > 0 && (
                                                        <img src={`${window.location.origin}${item.photo}`} alt={""} />
                                                    )}

                                                    <div className={"mx-auto d-col -g-5"}>
                                                        <label>{item.firstname} {item.lastname}</label>
                                                        <span>{item.job}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"-bottom d-flex -g-5"}>
                                                <Link className={"btn btn-m btn-primary"} to={"/admin/team/" + item.id}>
                                                    <span>See</span>
                                                </Link>

                                                <button className={"btn btn-m btn-red"} type={"button"}>Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <Notification classname={"information"} message={"There is no team member"} />
                        )}
                    </>
                )}
            </div>
        </HeaderAdmin>
    )
}