import React from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import SponsorForm from "../../forms/SponsorForm"

export default function SponsorNew() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-m btn-primary"} to={"/admin/sponsors"}>Return</Link>

            <section className={"page-section mt-25"}>
                <SponsorForm />
            </section>
        </HeaderAdmin>
    )
}