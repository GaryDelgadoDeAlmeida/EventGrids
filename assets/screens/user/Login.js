import React from "react";
import Header from "../../components/Header";
import LoginForm from "../../forms/LoginForm";
import { Link } from "react-router-dom";

export default function Login() {

    return (
        <div className={"page"}>
            <div className={"page-content"}>
                <section className={"page-section h-100vh"}>
                    <div className={"page-background"}>
                        <img src={`${window.location.origin}/content/img/background-error.jpg`} alt={""} />
                        <div className={"page-superposition"}></div>
                    </div>
                    <div className={"page-wrapper h-100 align-center"}>
                        <div className={"mw-500 -m-mw-100 m-auto"}>
                            <div className={"d-flex jf-between mb-15"}>
                                <Link className={"btn btn-m btn-primary -inline-flex"} to={"/"}>
                                    <img src={`${window.location.origin}/content/svg/arrow-left-long-white.svg`} alt={""} />
                                    <span>Back to home</span>
                                </Link>
                            </div>
                            <div className={"message-card"}>
                                <div className={"-header"}>
                                    <label>Sign in</label>
                                </div>
                                <div className={"-content"}>
                                    <LoginForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}