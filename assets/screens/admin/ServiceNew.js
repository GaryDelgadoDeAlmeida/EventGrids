import React from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import { Link } from "react-router-dom";
import ServiceForm from "../../forms/ServiceForm";

export default function ServiceNew() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-m btn-primary"} to={"/admin/services"}>Return</Link>

            <section className={"page-section mt-25"}>
                <ServiceForm />
            </section>
        </HeaderAdmin>
    )
}