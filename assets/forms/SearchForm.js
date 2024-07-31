import React, { useState } from "react";
import Notification from "../components/Notification";

export default function SearchForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        search: ""
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
                        value={credentials.search}
                        placeholder={"Search an article ..."}
                        onChange={(e) => handleChange(e, "search")}
                        maxLength={255}
                        required
                    />
                </div>
                <div className={"form-actions"}>
                    <button className={"btn btn-primary"} type={"submit"}>Research</button>
                </div>
            </form>
        </>
    )
}