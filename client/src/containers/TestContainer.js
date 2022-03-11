import React from "react";
import {useFetch} from "../customHooks/UseFetch.js"

export const TestContainer = () => {
    
    const {data} = useFetch("/get_timereports")
    console.log(data)
    return (
        <div className="container-fluid bg-dark text-white text-center">
            <h1 className="display-3">Välkommen till testcontainern</h1>
        </div>
       
    )
   
    
}

