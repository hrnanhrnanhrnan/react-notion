import React, { useContext } from "react";
import { useAuth } from "../contexts/AuthContext";

export const HomeContainer = () => {
    const auth = useAuth()
    return (
        <div className="container-fluid display-1 bg-dark text-white">
            Välkommen {auth?.user?.label}
            
        </div>
    )
}