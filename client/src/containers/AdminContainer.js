import React from "react";
import { AdminComponent } from "../components/AdminComponent"
import { useAuth } from "../contexts/AuthContext";

export const AdminContainer = () => {
    const auth = useAuth()
    return (
        <AdminComponent>
        </AdminComponent>
    )
}