import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import PrivateResource from "../../hooks/PrivateResource";
import { Link } from "react-router-dom";
import Notification from "../../components/Notification";

export default function Articles() {
    
    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/blogs?offset=${offset}&limit=10`)
    
    useEffect(() => {
        load()
    }, [offset])

    const handleRemoveArticle = (e) => {
        e.preventDefault()
    }

    return (
        <HeaderAdmin>
            <Link className={"btn btn-m btn-green"} to={"/admin/blogs/add"}>Add an article</Link>

            <section className={"page-section mt-25"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && Object.keys(items.results ?? {}).length == 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items.results ?? []).length > 0 ? (
                            <div className={"d-col -g-25"}>
                                {Object.values(items.results).map((item, index) => (
                                    <div key={index} className={"table-card"}>
                                        <div className={"-top"}>
                                            <span>#{item.id}</span>
                                        </div>
                                        <div className={"-center"}>
                                            <label>{item.title}</label>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className={"-bottom d-flex -g-5"}>
                                            <Link className={"btn btn-m btn-primary"} to={`/admin/blog/${item.id}`}>See</Link>
                                            <button type={"submit"} className={"btn btn-m btn-red"} data-blog={item.id} onClick={(e) => handleRemoveArticle(e)}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Notification classname={"information"} message={"There no article registered"} />
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}