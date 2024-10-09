import React, { useState } from "react";
import Notification from "../components/Notification"

export default function SponsorForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        logo: ""
    })

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [logo]: e.currentTarget.files[0]
        })
    }

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
                        type={"file"}
                        accept={"image/*"}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                
                <div className={"form-actions txt-right"}>
                    <button className={"btn btn-m btn-primary"} type={"submit"}>Submit</button>
                </div>
            </form>
        </>
    )
}