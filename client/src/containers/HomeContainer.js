import { HomeComponent } from "../components/HomeComponent";
import React from "react";
import { useAuth } from "../contexts/AuthContext"

export const HomeContainer = () => {
    //takes in the logged in username from the authcontext
    const auth = useAuth()
    return (
        <HomeComponent 
            userName={auth.user.label}
        />
    )
}
