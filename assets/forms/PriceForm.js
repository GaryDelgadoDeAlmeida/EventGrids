import React, { useState } from "react";
import Notification from "../components/Notification";
import PriceDetailField from "./parts/PriceDetailField";

export default function PriceForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        offer_type: "",
        price: 0,
        details: []
    })

    const updateCredentials = (fieldName, fieldValue) => {
        setCredentials({
            ...credentials,
            [fieldName]: fieldValue
        })
    }

    const handleClick = (e) => {
        e.preventDefault()

        let lastKey = Object.keys(credentials.details).pop()
        if(!lastKey) {
            lastKey = 0
        } else {
            lastKey++
        }

        setCredentials({
            ...credentials,
            details: {
                ...credentials.details,
                [lastKey]: {
                    label: ""
                }
            }
        })
    }

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
                    <select value={credentials.offer_type} onChange={(e) => handleChange(e, "offer_type")} required>
                        <option value={""}>Select an offer</option>
                        <option value={"regular"}>Regular</option>
                        <option value={"professional"}>Professional</option>
                        <option value={"business"}>Business</option>
                    </select>
                </div>
                
                <div className={"form-field"}>
                    <input 
                        type={"number"}
                        min={0}
                        placeholder={"Price"}
                        value={credentials.price}
                        onChange={(e) => handleChange(e, "price")}
                        required
                    />
                </div>
                
                <div className={"form-field"}>
                    <label>Offer details</label>
                    <div id={"price_details"}>
                        {Object.values(credentials.details).map((item, index) => (
                            <PriceDetailField 
                                key={index} 
                                updateCredentials={updateCredentials}
                            />
                        ))}
                        {console.log(credentials.details, typeof credentials.details)}
                    </div>
                    <button type={"button"} className={"btn btn-primary btn-m"} onClick={(e) => handleClick(e)}>Add a detail</button>
                </div>
                
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-primary btn-m"}>Submit</button>
                </div>
            </form>
        </>
    )
}