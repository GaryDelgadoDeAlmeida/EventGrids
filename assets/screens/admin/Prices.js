import React from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import { Link } from "react-router-dom";

export default function Prices() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-green btn-m"} to={"/admin/price/add"}>Add a price offer</Link>

            <section className={"page-section mt-25"}>
                <h2 className={"page-title"}>Price</h2>
            </section>
        </HeaderAdmin>
    )
}