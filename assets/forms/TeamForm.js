import axios from "axios";
import React, { useState } from "react";
import Notification from "../components/Notification";

export default function TeamForm({team = null}) {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        photo: "",
        firstname: "",
        lastname: "",
        job: "",
        socialLinks: []
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
            .post(`${window.location.origin}/api/backoffice/team`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json+ld",
                    "Authorization": "Bearer " + localStorage.getItem("token") ?? ""
                }
            })
            .then((response) => {
                let successMessage = "The team member has been successfully added"
                if(response.status == 202) {
                    successMessage = "The team member has been successfully updated"
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
                        onChange={(e) => handleChange(e, "photo")}
                    />
                </div>
                
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <input 
                            type={"text"}
                            maxLength={255}
                            value={credentials.firstname}
                            onChange={(e) => handleChange(e, "firstname")}
                            placeholder={"Firstname"}
                            required
                        />
                    </div>
                    
                    <div className={"form-field"}>
                        <input
                            type={"text"}
                            maxLength={255}
                            value={credentials.lastname}
                            onChange={(e) => handleChange(e, "lastname")}
                            placeholder={"Lastname"}
                            required
                        />
                    </div>
                </div>
                
                <div className={"form-field"}>
                    <input
                        type={"text"}
                        maxLength={255}
                        value={credentials.job}
                        onChange={(e) => handleChange(e, "job")}
                        placeholder={"Current job"}
                        required
                    />
                </div>
                
                <div className={"form-field"}>
                    <input
                        type={"url"}
                        value={credentials.facebook}
                        onChange={(e) => handleChange(e, "facebook")}
                        placeholder={"URL Facebook"}
                    />
                </div>
                
                <div className={"form-field"}>
                    <input
                        type={"url"}
                        value={credentials.instagram}
                        onChange={(e) => handleChange(e, "instagram")}
                        placeholder={"URL Instagram"}
                    />
                </div>
                
                <div className={"form-field"}>
                    <input
                        type={"url"}
                        value={credentials.linkedin}
                        onChange={(e) => handleChange(e, "linkedin")}
                        placeholder={"URL Linkedin"}
                    />
                </div>
                
                <div className={"form-actions txt-right"}>
                    <button className={"btn btn-m btn-primary"} type={"submit"}>Submit</button>
                </div>
            </form>
        </>
    )
}