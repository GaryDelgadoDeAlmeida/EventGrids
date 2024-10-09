import axios from "axios";
import React, { useState } from "react";
import Notification from "../components/Notification";
import ImageField from "./parts/ImageField";
import WyziwigField from "./parts/WyziwigField";

export default function EventForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        author: "",
        img_path: "",
        title: "",
        content: "",
        start_date: "",
        end_date: ""
    })

    const updateCredentials = (fieldName, fieldValue) => {
        setCredentials({
            ...credentials,
            [fieldName]: fieldValue
        })
    }

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
                        maxLength={255}
                        value={credentials.author}
                        placeholder={"Author"}
                        onChange={(e) => handleChange(e, "author")}
                        required
                    />
                </div>
                
                <div className={"form-field"}>
                    <ImageField
                        fieldName={"img_path"}
                        fieldValue={""}
                        updateCredentials={updateCredentials}
                    />
                </div>

                <div className={"form-field"}>
                    <input 
                        type={"text"}
                        maxLength={255}
                        value={credentials.title}
                        placeholder={"Event title"}
                        onChange={(e) => handleChange(e, "title")}
                        required
                    />
                </div>

                <div className={"form-field"}>
                    <WyziwigField
                        fieldName={"content"}
                        fieldValue={credentials.content}
                        placeholder={"Content of the event"}
                        updateCredentials={updateCredentials}
                    />
                </div>

                <div className={"form-field"}>
                    <input
                        type={"text"}
                        value={credentials.location}
                        placeholder={"Event location"}
                        onChange={(e) => handleChange(e, "location")}
                        required
                    />
                </div>

                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <label htmlFor={"start_date"}>Event start date</label>
                        <input 
                            id={"start_date"}
                            type={"datetime-local"}
                            onChange={(e) => handleChange(e, "start_date")}
                            required
                        />
                    </div>
                    <div className={"form-field"}>
                        <label htmlFor={"end_date"}>Event end date</label>
                        <input 
                            id={"end_date"}
                            type={"datetime-local"}
                            onChange={(e) => handleChange(e, "end_date")}
                            required
                        />
                    </div>
                </div>
                
                <div className={"form-actions txt-right"}>
                    <button type={"submit"} className={"btn btn-m btn-primary"}>Submit</button>
                </div>
            </form>
        </>
    )
}