import React from "react";
import { useAuth } from "../contexts/AuthContext";

export const HomeContainer = () => {
    const auth = useAuth()
    return (
        <div className="container-fluid display-1 bg-dark text-white text-center">
            Välkommen {auth?.user?.label}
            
        </div>
    )
}