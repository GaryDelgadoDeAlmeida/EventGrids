import axios from "axios";
import React, { useState } from "react";
import Notification from "../components/Notification";

export default function EventForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        title: "",
        startAt: "",
        endAt: ""
    })

    const handleChange = (e, fieldName) => {
        let fieldValue = e.currentTarget.value
        if(fieldName == "photo") {
            fieldValue = e.currentTarget.files[0]
        }
        setCredentials({
            ...credentials,
            [fieldName]: fieldValue
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .post(`${window.location.origin}/api/backoffice/event`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json+ld",
                    "Authorization": "Bearer " + localStorage.getItem("token") ?? ""
                }
            })
            .then((response) => {
                let successMessage = "The event has been successfully added"
                if(response.status === 202) {
                    successMessage = "The event has been successfully updated"
                }

                setFormResponse({classname: "success", message: successMessage})
            })
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
                        type={"text"}
                        value={credentials.title}
                        placeholder={"Event title"}
                        onChange={(e) => handleChange(e, "title")}
                        required
                    />
                </div>
                
                <div className={"form-field"}></div>
                
                <div className={"form-field"}></div>
                
                <div className={"form-actions txt-right"}>
                    <button type={"submit"} className={"btn btn-m btn-primary"}>Submit</button>
                </div>
            </form>
        </>
    )
}