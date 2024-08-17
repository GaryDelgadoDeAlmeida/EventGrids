import React, { useState } from "react";
import Notification from "../components/Notification"
import TextareaField from "./parts/TextareaField"
import axios from "axios";

export default function TestimonialForm({testimonial = null}) {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        firstname: "",
        lastname: "",
        job: "",
        comment: "",
        note: 0
    })
    const [credentialFiles, setCredentialFiles] = useState({
        photo: ""
    })

    const handleChange = (e, fieldName) => {
        if(fieldName == "photo") {
            setCredentialFiles({
                ...credentials,
                [fieldName]: e.currentTarget.files[0]
            })
        } else {
            setCredentials({
                ...credentials,
                [fieldName]: e.currentTarget.value
            })
        }
    }

    const handleSubmit = (e) => {
        axios
            .post(`${window.location.origin}/api/backoffice/testimonial`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json+ld",
                    "Authorization": "Bearer " + localStorage.getItem("token") ?? ""
                }
            })
            .then((response) => {
                let testimonial = response.data
                if(testimonial) {
                    handlePhotoUpdate(testimonial)
                }
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

    const handlePhotoUpdate = (testimonial) => {
        axios
            .post(`${window.location.origin}/api/backoffice/testimonial/${testimonial.id}/photo/update`, credentialFiles, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token") ?? ""
                }
            })
            .then((response) => {
                let successMessage = "The photo of the testimonial has been added"
                if(response.status === 202) {
                    successMessage = "The photo of the testimonial has been updated"
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
                        onChange={(e) => handleChange(e, "photo")}
                    />
                </div>
                
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <input
                            type={"text"}
                            maxLength={100}
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
                        placeholder={"Job"}
                        required
                    />
                </div>
                
                <div className={"form-field"}>
                    <select value={credentials.note} onChange={(e) => handleChange(e, "note")} required>
                        <option value={""}>Select a review</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
                
                <div className={"form-field"}>
                    <TextareaField
                        fieldName={"comment"}
                        fieldValue={credentials.comment}
                        placeholder={"Comment"}
                        updateCredentials={(fieldName, fieldValue) => {
                            setCredentials({
                                ...credentials,
                                [fieldName]: fieldValue
                            })
                        }}
                    />
                </div>
                
                <div className={"form-actions txt-right"}>
                    <button type={"submit"} className={"btn btn-m btn-primary"}>Submit</button>
                </div>
            </form>
        </>
    )
}