import React, { useEffect } from "react";
import PrivateResource from "../../hooks/PrivateResource"

export default function CategoriesField({fieldName, fieldValue, updateCredentials}) {

    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/categories`, false)
    
    useEffect(() => {
        load()
    }, [])

    return (
        !loading && Object.keys(items ?? []).length > 0 && (
            <select key={fieldName} onChange={(e) => updateCredentials(fieldName, e.currentTarget.value)} multiple={true}>
                <option value={""}>Select a category</option>
                {Object.values(items.results ?? []).map((item, index) => (
                    <option key={index} value={item.id} {...fieldValue.indexOf(item.id) !== -1 ? "selected" : null}>{item.label}</option>
                ))}
            </select>
        )
    )
}