import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
import PrivateResource from "../../hooks/PrivateResource";

export default function Testimonials() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/testimonials?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            {loading && (
                <Notification classname={"information"} message={"Loading ..."} />
            )}

            {!loading && Object.keys(error).length > 0 && (
                <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
            )}

            {!loading && Object.keys(items.results ?? []).length > 0 && (
                <section className={"page-section"}>
                    <h2 className={"page-title"}>Testimonials</h2>

                    <div className={"d-col -g-15"}>
                        {Object.values(items.results).map((item, index) => (
                            <div key={index} className={"table-card"}>
                                <div className={"-top"}>
                                    <span>{item + 1}</span>
                                </div>
                                <div className={"-center"}>
                                    <span>{item.firstname} {item.lastname}</span>
                                    <span>{item.job}</span>
                                </div>
                                <div className={"-bottom"}>
                                    <Link className={"btn btn-primary"} to={"/admin/testimonials/" + item.id}>
                                        <span>See</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </HeaderAdmin>
    )
}