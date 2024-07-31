import React, { useEffect } from "react";
import HeaderAdmin from "../../components/HeaderAdmin"
import PrivateResource from "../../hooks/PrivateResource"
import ProfileForm from "../../forms/UserForm"

export default function Profile() {

    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/backoffice/profile`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <div className={"page-section"}>
                <ProfileForm />
            </div>
        </HeaderAdmin>
    )
}