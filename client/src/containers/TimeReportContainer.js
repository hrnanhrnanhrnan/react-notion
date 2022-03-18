import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { useFetch } from "../customHooks/UseFetch";
import { postRequest } from "../utilities/postRequest.js";
import { TimeReportComponent } from "../components/TimeReportComponent.js";

export const TimeReportContainer = () => {
    // //response is just a state to let show a success or failure message when creating a timereport
    const [inputs, setInputs] = useState({});
    const {data, isLoading: isLoadingData} = useFetch("/get_database");
    const [loaded, setLoaded] = useState(true)
    const options = []
    // //this gets the user who is logged in 
    const auth = useAuth()
    
    // populates the projects dropdown select in the component when the data has been loaded
    !isLoadingData && (() => {
        data.results.map((project) => options.push({value: project.id, label: project.properties.Projectname.title[0].plain_text} )) 
    })()

    // eventhandler to handle when value changes in the form controls in the timereportcomponent
    // the eventhandler updates the input state of the container and uses the spread operator and "values" to populate the state with the previous state, 
    // and then sets the state with event target name as a key, and the event target value as the value in the key-value pair 
    const handleChange = (event) => {
      setInputs(values => ({...values, [event.target.name]: event.target.value}))
    }
  
    // eventhandler to handle when the value in the dropdown changes
    // the eventhandler updates the input state of the container and uses the spread operator and "values" to populate the state with the previous state, 
    // and then sets the state with event target name as a key, and the event target value as the value in the key-value pair 
    const handleDropmenu = (event) => {
        setInputs(values => ({...values, project: event.value}))
    }

    // eventhandler to handle when the submit button is pressed in the form in the component
    // the eventhandler calls the postrequest method and passed the values from the input state as parameters to the url to the server
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoaded(false)
      const res = await postRequest(`/timereports/${inputs.date}/${auth.user.value}/${inputs.hours}/${inputs.project}/${inputs.note}`)
      setLoaded(res.ok)
      if(loaded) {
        setInputs({})
      }
    }
    
    // Mounts the timereport component and sends the data and methods from container to the component
    return (
        <TimeReportComponent loaded={loaded} options={options} inputs={inputs} handleChange={handleChange} handleDropmenu={handleDropmenu} handleSubmit={handleSubmit}/>
    )
}
