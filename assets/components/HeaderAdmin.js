import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function HeaderAdmin(props) {

    const storageUser = localStorage.getItem("token") ?? ""
    const [isLogged, setIsLogged] = useState(storageUser.length > 0 ? true : false)

    useEffect(() => {
        updateLoggedStatus
    }, [storageUser])

    const handleLogout = (e) => {
        e.preventDefault()
        setIsLogged(false)
    }

    const updateLoggedStatus = (status) => {
        if(storageUser.length == 0) {
            setLogged(status)
        }
    }

    return (
        <>
            {!isLogged && (
                <Navigate to={"/login"} />
            )}

            <div className={"page-admin"}>
                <div className={"page-header"}>
                    <div className={"menu"}>
                        <Link to={"/admin"}>Dashboard</Link>
                        <Link to={"/admin/profile"}>Profile</Link>
                        <Link to={"/admin/services"}>Services</Link>
                        <Link to={"/admin/teams"}>Teams</Link>
                        <Link to={"/admin/events"}>Events</Link>
                        <Link to={"/admin/sponsors"}>Sponsors</Link>
                        <Link to={"/admin/testimonials"}>Testimonials</Link>
                        <Link to={"/admin/blogs"}>Blog</Link>
                        <Link to={"/admin/comments"}>Comments</Link>
                        <Link to={"/admin/prices"}>Prices</Link>
                        <Link to={"/admin/inboxs"}>Inboxs</Link>
                        <Link className={"bg-red"} to={"/logout"} onClick={(e) => handleLogout(e)}>Logout</Link>
                    </div>
                </div>
                <div className={"page-content"}>
                    <div className={"page-banner"}></div>
                    <div className={"page-wrapper"}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}