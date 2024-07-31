import React, { useState } from "react";
import Notification from "../components/Notification";

export default function CommentForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        author: "",
        email: "",
        comment: ""
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
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <label>Your name</label>
                        <input
                            type={"text"}
                            maxLength={255}
                            value={credentials.author}
                            placeholder={"Garry ALMEIDA"}
                            onChange={(e) => handleChange(e, "author")}
                            required
                        />
                    </div>
                    <div className={"form-field"}>
                        <label>Email address</label>
                        <input 
                            type={"email"}
                            maxLength={255}
                            value={credentials.email}
                            placeholder={"example@gmail.com"}
                            onChange={(e) => handleChange(e, "email")}
                            required
                        />
                    </div>
                </div>
                <div className={"form-field"}>
                    <label>Comment</label>
                    <textarea
                        onChange={(e) => handleChange(e, "comment")}
                        placeholder={"Write your comment"}
                        required
                    >{credentials.comment}</textarea>
                </div>
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-primary btn-bold"}>Post Comment</button>
                </div>
            </form>
        </>
    )
}