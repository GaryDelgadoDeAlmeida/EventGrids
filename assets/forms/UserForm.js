import React, { useState } from "react";
import Notification from "../components/Notification";

export default function UserForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.currentTarget.value
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

            <form className={"form"} onSubmit={(e) => handleChange(e)}>
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <input 
                            type={"text"}
                            maxLength={255}
                            value={credentials.firstname}
                            placeholder={"Your Firstname"}
                            onChange={(e) => handleChange(e, "firstname")}
                            required 
                        />
                    </div>
                    <div className={"form-field"}>
                        <input 
                            type={"text"}
                            maxLength={255}
                            value={credentials.lastname}
                            placeholder={"Your Lastname"}
                            onChange={(e) => handleChange(e, "lastname")}
                            required 
                        />
                    </div>
                </div>

                <div className={"form-field"}>
                    <input
                        type={"text"}
                        maxLength={255}
                        value={credentials.email}
                        placeholder={"Your Email"}
                        onChange={(e) => handleChange(e, "email")}
                        required
                    />
                </div>
                
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-primary btn-bold"}>Submit</button>
                </div>
            </form>
        </>
    )
}