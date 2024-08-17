import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification"
import PrivateResource from "../../hooks/PrivateResource";

export default function Sponsors() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/sponsors?offset=${offset}`)
    
    useEffect(() => {
        load()
    }, [offset])

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
                            <div className={"d-col -g-15"}>
                                {Object.values(items.results).map((item, index) => (
                                    <div key={index} className={"table-card"}>
                                        <div className={"-top"}>
                                            <span>{index + 1}</span>
                                        </div>
                                        <div className={"-center"}>
                                            <img src={`${window.location.origin}${item.photo}`} alt="" />
                                        </div>
                                        <div className={"-bottom"}>
                                            <Link to={"/admin/sponsor/" + item.id}>
                                                <span>See</span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Notification classname={"information"} message={"There is no sponsors"} />
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}