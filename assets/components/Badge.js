import React from "react";

export default function Badge({className, title}) {

    return (
        <span className={`badge ${className}`}>{title}</span>
    )
}