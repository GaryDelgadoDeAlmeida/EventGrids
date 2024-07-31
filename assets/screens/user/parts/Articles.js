import React from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../../../components/ArticleCard";

export default function Articles() {

    return (
        <section className={"page-section py-100 bg-white"}>
            <div className={"page-wrapper"}>
                <h4 className={"page-suptitle"}>Blogs</h4>
                <h2 className={"page-title"}>Our latest news</h2>
                <p className={"page-description"}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                
                <div className={"d-grid -g-25 -col-3 -t-col-2 -t-col-1"}>
                    <ArticleCard imgPath={"/content/img/blog/blog1.jpg"} />
                    <ArticleCard imgPath={"/content/img/blog/blog2.jpg"} />
                    <ArticleCard imgPath={"/content/img/blog/blog3.jpg"} />
                </div>
            </div>
        </section>
    )
}