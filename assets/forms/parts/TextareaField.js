import React from "react";

export default function TextareaField({fieldName, fieldValue, placeholder, updateCredentials}) {

    const handleChange = (e) => {
        updateCredentials(fieldName, e.currentTarget.value)
    }

    return (
        <textarea 
            onChange={(e) => handleChange(e)} 
            placeholder={placeholder}
            value={fieldValue}
        ></textarea>
    )
}