import React from "react";
import { Link } from "react-router-dom";

export default function BadgeTag({slug, title}) {

    return (
        <Link className={"badge badge-information"} to={`/tag/${slug}`}>{title}</Link>
    )
}