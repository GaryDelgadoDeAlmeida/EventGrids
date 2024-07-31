import React, { useState } from "react";
import Notification from "../components/Notification"

export default function ArticleForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        image: "",
        title: "",
        content: "",
        tags: {},
        categories: {}
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

            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field"}>
                    <input 
                        type={"text"}
                        maxLength={255}
                        value={credentials.title}
                        placeholder={"Article title"}
                        onChange={(e) => handleChange(e, "title")}
                        required
                    />
                </div>
                
                <div className={"form-field"}>
                    <input 
                        type={"file"}
                        accept="image/*"
                        onChange={(e) => handleChange(e, "image")}
                    />
                </div>
                
                <div className={"form-field"}>
                    <textarea
                        onChange={(e) => handleChange(e, "content")}
                        required
                    >{credentials.content}</textarea>
                </div>
                
                <div className={"form-field"}>
                    <label>Categories</label>
                </div>
                
                <div className={"form-field"}>
                    <label>Tags</label>
                </div>
                
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-primary btn-bold"}>Submit</button>
                </div>
            </form>
        </>
    )
}