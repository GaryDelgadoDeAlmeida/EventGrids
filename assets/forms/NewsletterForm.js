import React, { useState } from "react";
import Notification from "../components/Notification";

export default function NewsletterForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        fullname: "",
        email: ""
    })

    const handleChange = (e, fieldName) => {}

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field"}>
                    <input
                        type={"text"}
                        value={credentials.fullname}
                        onChange={(e) => handleChange(e, "fullname")}
                        placeholder={"Your Name*"}
                        required
                    />
                </div>

                <div className={"form-field"}>
                    <input
                        type={"email"}
                        value={credentials.email}
                        onChange={(e) => handleChange(e, "email")}
                        placeholder={"Email address*"}
                        required
                    />
                </div>
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-primary btn-bold"}>Subscribe</button>
                </div>
            </form>
        </>
    )
}