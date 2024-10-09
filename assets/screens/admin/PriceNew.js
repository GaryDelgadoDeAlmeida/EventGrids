import React from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import { Link } from "react-router-dom";
import PriceForm from "../../forms/PriceForm";

export default function PriceNew() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-green btn-m"} to={"/admin/prices"}>Return</Link>

            <section className={"page-section mt-25"}>
                <div className={"block-card"}>
                    <div className={"-header"}></div>
                    <div className={"-content"}>
                        <PriceForm />
                    </div>
                </div>
            </section>
        </HeaderAdmin>
    )
}