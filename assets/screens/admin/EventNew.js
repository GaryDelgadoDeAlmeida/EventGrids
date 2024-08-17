import React from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import { Link } from "react-router-dom";

export default function EventNew() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-m btn-primary"} to={"/admin/events"}>Return</Link>
            
            <section className={"page-section mt-25"}></section>
        </HeaderAdmin>
    )
}