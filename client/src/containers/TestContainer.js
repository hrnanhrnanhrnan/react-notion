import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";

export const TestContainer = () => {
    //response is just a state to let show a success or failure message when creating a timereport
    const [response, setResponse] = useState(null)

    //this gets the user who is logged in 
    const auth = useAuth()

    //this variabels is used to send to the server endpoint. This variabels is what we then get from the form
    const date = "2022-03-11"
    const person = auth.user.value
    const hours = 3
    const project = "1a0384cc-414d-4200-8103-97c648f638c9"
    const note = "coding from lion-org"
    
    //eventhandler to handle the click from the timereport button, this can later be used to connect to the submit button of the form
    const handleClick = () => {
        //this is the endpoint of the server, we use the variabels or values 
        //we get from the form and pass it into the url as parameters 
        fetch(`/timereports/${date}/${person}/${hours}/${project}/${note}`, {method: "POST"})
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Could not fetch the data...")
        })
        .then((jsonResponse) => {
            //this is just to set the state of the container. this is just testing
            setResponse(jsonResponse)
        })
        .catch((error) => {
            //this is same as above, only for testing
            setResponse(error)
        })
    }
    
    return (
        <div className="container-fluid bg-dark text-white text-center">
            {!response && <Button onClick={handleClick}>Skapa tidsrapport</Button>}
            {
                response?.ok ? (
                    <h3>{response?.message}</h3>
                ) : (
                    <h3>{response?.message}</h3>
                )
            }
        </div>
       
    )
   
    
}

