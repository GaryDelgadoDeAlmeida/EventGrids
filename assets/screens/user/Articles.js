import React from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import ArticleCard from "../../components/ArticleCard";

export default function Articles() {

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-hero.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Articles</h1>
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
                </div>
            </section>
        </Header>
    )
}