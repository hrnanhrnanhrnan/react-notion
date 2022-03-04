import React, { useContext } from "react";
import { UserContext } from "../customHooks/UserContext";

export const HomeContainer = () => {
    const {value, setValue} = useContext(UserContext);
    return (
        <div className="container-fluid display-1 bg-dark text-white">
            Välkommen {value.label}
            
        </div>
    )
}