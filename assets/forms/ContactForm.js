import React, { useState } from "react";
import Notification from "../components/Notification";
import axios from "axios";

export default function ContactForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        fullname: "",
        emailAddress: "",
        subject: "",
        message: ""
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .post(`${window.location.origin}/api/inbox`, credentials, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {})
            .catch((error) => {
                let errorMessage = "An error has been encountered."
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                } else if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                }

                setFormResponse({classname: "danger", message: errorMessage})
            })
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form"} onSubmit={(e) => handleChange(e)}>
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <input
                            type={"text"}
                            maxLength={255}
                            placeholder={"Your Name"}
                            value={credentials.fullname}
                            onChange={(e) => handleChange(e, "fullname")}
                            required
                        />
                    </div>
                    <div className={"form-field"}>
                        <input 
                            type={"text"}
                            maxLength={255}
                            value={credentials.subject}
                            placeholder={"Your Subject"}
                            onChange={(e) => handleChange(e, "subject")}
                            required
                        />
                    </div>
                </div>
                <div className={"form-field"}>
                    <input
                        type={"email"}
                        maxLength={255}
                        placeholder={"Your Email"}
                        value={credentials.emailAddress}
                        onChange={(e) => handleChange(e, "emailAddress")}
                        required
                    />
                </div>
                <div className={"form-field"}>
                    <textarea
                        placeholder={"Your Message ..."}
                        onChange={(e) => handleChange(e, "message")}
                        required
                    >{credentials.message}</textarea>
                </div>
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-primary btn-bold w-100"}>Send Message</button>
                </div>
            </form>
        </>
    )
}