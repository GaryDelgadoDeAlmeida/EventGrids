import React from "react";
import Header from "../../components/Header";
import LoginForm from "../../forms/LoginForm";

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
                        <div className={"mw-50 m-auto"}>
                            <div className={"block-card"}>
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