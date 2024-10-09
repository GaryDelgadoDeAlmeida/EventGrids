import React, { useEffect, useState } from "react";

export default function PriceDetailField({index, updateCredentials}) {

    const [details, setDetails] = useState({
        label: ""
    })

    // useEffect(() => {
    //     updateCredentials("details", details)
    // }, [details])

    const handleChange = (e) => {
        setDetails({
            ...details,
            label: e.currentTarget.value
        })
    }

    const handleRemove = (e) => {
        let price_details = [...details]
        price_details.slice(index, 1)

        setDetails({
            ...details,
            ...price_details
        })
    }

    console.log(details)

    return (
        <div className={"form-field-inline"}>
            <div className={"form-field"}>
                <input 
                    type={"text"}
                    maxLength={255}
                    placeholder={"Offer details"}
                    onChange={(e) => handleChange(e)}
                    required
                />
            </div>
            <div className={"form-actions d-flex"}>
                <button type={"button"} className={"btn btn-red btn-m"}>Remove</button>
            </div>
        </div>
    )
}