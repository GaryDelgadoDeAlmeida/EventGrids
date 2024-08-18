import React, { useEffect } from "react";
import PrivateResource from "../../hooks/PrivateResource";

export default function TagsField({fieldName, fieldValue, updateCredentials}) {

    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/tags`, false)

    useEffect(() => {
        load()
    }, [])

    return (
        !loading && Object.keys(items ?? []).length > 0 && (
            <select onChange={(e) => updateCredentials(fieldName, e.currentTarget.value)} multiple={true}>
                <option value={""}>Select a tag</option>
            </select>
        )
    )
}