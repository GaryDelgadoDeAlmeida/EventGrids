import React, { useState } from "react";
import Notification from "../components/Notification";
import axios from "axios";

export default function LoginForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
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
        axios
            .post(`${window.location.origin}/api/login_check`, credentials, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {})
            .catch((error) => {})
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field"}>
                    <input 
                        type={"email"} 
                        maxLength={255}
                        value={credentials.email} 
                        placeholder={"Your email address"}
                        onChange={(e) => handleChange(e, "email")}
                        required 
                    />
                </div>

                <div className={"form-field"}>
                    <input 
                        type={"password"}
                        maxLength={255}
                        value={credentials.password}
                        placeholder={"Your password"}
                        onChange={(e) => handleChange(e, "password")}
                        required
                    />
                </div>

                <div className={"form-actions"}>
                    <button className={"btn btn-primary btn-bold"} type={"submit"}>Submit</button>
                </div>
            </form>
        </>
    )
}