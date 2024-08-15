import axios from "axios";
import React, { useState } from "react";
import Notification from "../components/Notification";
import TextareaField from "./parts/TextareaField";

export default function ServiceForm({service = null}) {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        imgPath: "",
        title: "",
        description: ""
    })

    const handleChange = (e, fieldName) => {
        let fieldValue = e.currentTarget.value
        if(fieldName == "imgPath") {
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
            .post(`${window.location.origin}/api/backoffice/service`, credentials, {
                headers: {
                    "Content-Type": "",
                    "Accept": "application/json+ld",
                    "Authorization": "Bearer " + localStorage.getItem("token") ?? ""
                }
            })
            .then((response) => {
                let successMessage = "The service has been successfully created"
                if(response.status == 202) {
                    successMessage = "The service has been successfully updated"
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
        ;
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
                        onChange={(e) => handleChange(e, "imgPath")}
                        // required
                    />
                </div>
                
                <div className={"form-field"}>
                    <input
                        type={"text"}
                        maxLength={255}
                        value={credentials.title}
                        onChange={(e) => handleChange(e, "title")}
                        placeholder={"Service title"}
                        required
                    />
                </div>
                
                <div className={"form-field"}>
                    <TextareaField 
                        fieldName={"description"}
                        placeholder={"Service description"}
                        fieldValue={credentials.description}
                        updateCredentials={(fieldName, fieldValue) => setCredentials({
                            ...credentials,
                            [fieldName]: fieldValue
                        })}
                    />
                </div>
                
                <div className={"form-actions txt-right"}>
                    <button className={"btn btn-primary btn-m"} type={"submit"}>Submit</button>
                </div>
            </form>
        </>
    )
}