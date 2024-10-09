import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import PrivateResource from "../../hooks/PrivateResource";
import Notification from "../../components/Notification";
import ArticleCard from "../../components/ArticleCard";

export default function Tag() {
    const { tagName } = useParams()

    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/tag/${tagName}`)

    useEffect(() => {
        load()
    }, [tagName])

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-hero.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>{tagName}</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link className={"breadcrumb"} to={"/"}>Home</Link>
                        <span>{tagName}</span>
                    </div>
                </div>
            </section>

            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    {loading && (
                        <Notification classname={"information"} message={"Loading ..."} />
                    )}

                    {!loading && (
                        <>
                            {Object.keys(error).length > 0 && Object.keys(items).length == 0 && (
                                <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                            )}

                            {Object.keys(items).length > 0 && (
                                <div className={"d-grid -g-25 -col-3 -t-col-2 -t-col-1"}>
                                    {Object.values(items.results ?? {}).map((item, index) => (
                                        <ArticleCard 
                                            index={index}
                                            imgPath={item.imgPath} 
                                            title={item.title} 
                                            description={item.description.substring(0, 100) + (item.length > 100 ? "..." : "")}
                                            link={`/admin/article/${item.id}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </Header>
    )
}