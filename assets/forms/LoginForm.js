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
        e.preventDefault()
        
        axios
            .post(`${window.location.origin}/api/login_check`, credentials, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {})
            .catch((error) => {
                let errorMessage = "An error has been encountered. Please retry later"
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