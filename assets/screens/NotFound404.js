import React from "react";
import { Link } from "react-router-dom";

export default function NotFound404() {

    return (
        <div className={"page"}>
            <div className={"page-content"}>
                <section className={"page-section h-100vh"}>
                    <div className={"page-background"}>
                        <img src={`${window.location.origin}/content/img/background-error.jpg`} alt={""} />
                        <div className={"page-superposition"}></div>
                    </div>
                    <div className={"page-wrapper align-center h-100"}>
                        <div className={"mw-500 -m-mw-100 m-auto"}>
                            <div className={"message-card"}>
                                <div className={"-header"}>
                                    <label>4<em>0</em>4</label>
                                </div>
                                <div className={"-content"}>
                                    <label className={"-title"}>The page you were looking for doesn't exist anymore.</label>
                                    <p className={"-description"}>It might have been moved or deleted.</p>
                                </div>
                                <div className={"-footer"}>
                                    <Link className={"btn btn-primary"} to={"/"}>Back To Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}