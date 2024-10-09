import React from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import EventForm from "../../forms/EventForm";

export default function EventNew() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-m btn-primary"} to={"/admin/events"}>Return</Link>
            
            <section className={"page-section mt-25"}>
                <div className={"card"}>
                    <div className={"-header"}></div>
                    <div className={"-content"}>
                        <EventForm />
                    </div>
                </div>
            </section>
        </HeaderAdmin>
    )
}