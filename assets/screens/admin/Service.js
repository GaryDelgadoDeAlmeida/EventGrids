import React from "react";
import { Link, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import ServiceForm from "../../forms/ServiceForm";

export default function Service() {
    const { serviceID } = useParams()

    return (
        <HeaderAdmin>
            <Link className={"btn btn-m btn-primary"} to={"/admin/services"}>Return</Link>
            
            <section className={"page-section mt-25"}>
                <ServiceForm />
            </section>
        </HeaderAdmin>
    )
}