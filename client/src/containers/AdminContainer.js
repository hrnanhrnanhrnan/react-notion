import React from "react";
import { AdminComponent } from "../components/AdminComponent"
import { useAuth } from "../contexts/AuthContext";
import { useFetch } from "../customHooks/UseFetch";

export const AdminContainer = () => {
    const {data: users, isLoading: isLoadingUsers} = useFetch("/get_people")
    const {data: projects, isLoading: isLoadingProjects} = useFetch("/get_database")
    const auth = useAuth()

    if(!isLoadingUsers && !isLoadingProjects){
        console.log(users)
        console.log(projects)
    }
    return (
        <AdminComponent>
        </AdminComponent>
    )
}