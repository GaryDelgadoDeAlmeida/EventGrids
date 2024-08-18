import React, { useState } from "react";
import Notification from "../components/Notification"
import WyziwigField from "./parts/WyziwigField"
import CategoriesField from "./parts/CategoriesField";
import TagsField from "./parts/TagsField";

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
                        type={"file"}
                        accept="image/*"
                        onChange={(e) => handleChange(e, "image")}
                    />
                </div>

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
                    <WyziwigField
                        fieldName={"content"}
                        fieldValue={credentials.content}
                        placeholder={"Article description"}
                        updateCredentials={(fieldName, fieldValue) => {
                            setCredentials({
                                ...credentials,
                                [fieldName]: fieldValue
                            })
                        }}
                    />
                </div>
                
                <div className={"form-field"}>
                    <label>Categories</label>

                    <CategoriesField
                        fieldName={"categories"}
                        fieldValue={credentials.categories}
                        updateCredentials={(fieldName, fieldValue) => (
                            setCredentials({
                                ...credentials,
                                [fieldName]: {...fieldValue}
                            })
                        )}
                    />
                </div>
                
                <div className={"form-field"}>
                    <label>Tags</label>

                    <TagsField />
                </div>
                
                <div className={"form-actions txt-right"}>
                    <button type={"submit"} className={"btn btn-m btn-primary btn-bold"}>Submit</button>
                </div>
            </form>
        </>
    )
}