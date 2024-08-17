import React from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import { Link } from "react-router-dom";
import TeamForm from "../../forms/TeamForm";

export default function TeamNew() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-m btn-primary"} to={"/admin/teams"}>Return</Link>

            <section className={"page-section mt-25"}>
                <TeamForm />
            </section>
        </HeaderAdmin>
    )
}