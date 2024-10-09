import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import ArticleCard from "../../components/ArticleCard";
import PrivateResource from "../../hooks/PrivateResource";

export default function Articles() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/blogs?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-hero.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Blog</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>Blog</span>
                    </div>
                </div>
            </section>
            
            <section className={"page-section py-100"}>
                <div className={"page-wrapper"}>
                    <div className={"d-grid -g-25 -col-3 -t-col-2 -t-col-1"}>
                        <ArticleCard imgPath={"/content/img/blog/blog1.jpg"} />
                        <ArticleCard imgPath={"/content/img/blog/blog2.jpg"} />
                        <ArticleCard imgPath={"/content/img/blog/blog3.jpg"} />
                        <ArticleCard imgPath={"/content/img/blog/blog1.jpg"} />
                        <ArticleCard imgPath={"/content/img/blog/blog2.jpg"} />
                        <ArticleCard imgPath={"/content/img/blog/blog3.jpg"} />
                    </div>

                    {/* <Pagination /> */}
                    <Pagination
                        offset={offset}
                        setOffset={setOffset}
                        maxOffset={7}
                    />
                </div>
            </section>
        </Header>
    )
}