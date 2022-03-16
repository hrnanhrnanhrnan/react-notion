import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { useFetch } from "../customHooks/UseFetch";
import { postRequest } from "../utilities/postRequest.js";
import { TimeReportComponent } from "../components/TimeReportComponent.js";

export const TimeReportContainer = () => {
    // //response is just a state to let show a success or failure message when creating a timereport
    const [inputs, setInputs] = useState({});
    const {data, isLoading} = useFetch("/get_database");
    const options = []
    // //this gets the user who is logged in 
    const auth = useAuth()
    

    !isLoading && (() => {
        data.results.map((project) => options.push({value: project.id, label: project.properties.Projectname.title[0].plain_text} )) 
    })()

    
    // eventhandler to handle the click from the timereport button, this can later be used to connect to the submit button of the form
    const handleClick = () => {
        postRequest(`/timereports/${inputs.date}/${auth.user.value}/${inputs.hours}/${inputs.project}/${inputs.note}`, {method: "POST"})
    }

    const handleChange = (event) => {
      setInputs(values => ({...values, [event.target.name]: event.target.value}))
    }
  
    const handleDropmenu = (event) => {
        setInputs(values => ({...values, project: event.value}))
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      handleClick();
    }
    
    return (
        <TimeReportComponent options={options} inputs={inputs} handleChange={handleChange} handleDropmenu={handleDropmenu} handleSubmit={handleSubmit}/>
    )
}
