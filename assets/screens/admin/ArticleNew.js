import React from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import ArticleForm from "../../forms/ArticleForm";
import { Link } from "react-router-dom";

export default function ArticleNew() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-m btn-primary"} to={"/admin/blogs"}>Return</Link>
            
            <section className={"page-section mt-25"}>
                <ArticleForm />
            </section>
        </HeaderAdmin>
    )
}