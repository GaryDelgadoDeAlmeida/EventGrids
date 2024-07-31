import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import SearchForm from "../../forms/SearchForm";
import PrivateResource from "../../hooks/PrivateResource";
import CommentForm from "../../forms/CommentForm";

export default function Article() {
    const { articleID } = useParams()

    if(isNaN(articleID)) {
        return <Navigate to={"/blog"} />
    }

    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/article/${articleID}`, false)
    useEffect(() => {
        load()
    }, [])

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-hero.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Article</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link className={"breadcrumb"} to={"/"}>Home</Link>
                        <Link className={"breadcrumb"} to={"/blog"}>Blog</Link>
                        <span>Article</span>
                    </div>
                </div>
            </section>

            <section className={"page-section py-100"}>
                <div className={"page-wrapper"}>
                    <div className={"page-article"}>
                        <div className={"-left"}>
                            <div className={"block-card"}>
                                <div className={"-content"}>
                                    <article className={"block-card"}>
                                        <img src={`${window.location.origin}/content/img/articles/article1.jpg`} alt={""} />
                                        <h2 className={"-title"}>Article name</h2>
                                        <p>Lorem ipsum</p>
                                    </article>
                                </div>
                            </div>

                            {/* Comments */}
                            <div className={"block-card mt-50"}>
                                <div className={"-header"}>
                                    <label className={"-title"}>02 Comments On This Post</label>
                                </div>
                                <div className={"-content"}>
                                    <div className={"comment-card"}>
                                        <img src={`${window.location.origin}/content/img/avatar/avatar1.jpg`} alt={""} />
                                        <div className={"-content"}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Comment form */}
                            <div className={"block-card mt-50"}>
                                <div className={"-header"}>
                                    <label className={"-title"}>Leave A Comment</label>
                                </div>
                                <div className={"-content"}>
                                    <CommentForm />
                                </div>
                            </div>
                        </div>
                        <div className={"-right"}>
                            {/* Search form */}
                            <div className={"block-card -black"}>
                                <div className={"-content"}>
                                    <SearchForm />
                                </div>
                            </div>

                            {/* Popular Feeds */}
                            <div className={"block-card -black mt-25"}>
                                <div className={"-header"}>
                                    <label className={"-title"}>Popular Feeds</label>
                                </div>
                                <div className={"-content"}></div>
                            </div>

                            {/* Categories */}
                            <div className={"block-card -black mt-25"}>
                                <div className={"-header"}>
                                    <label className={"-title"}>Categories</label>
                                </div>
                                <div className={"-content"}></div>
                            </div>

                            {/* Popular Tags */}
                            <div className={"block-card -black mt-25"}>
                                <div className={"-header"}>
                                    <label className={"-title"}>Popular Tags</label>
                                </div>
                                <div className={"-content"}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Header>
    )
}