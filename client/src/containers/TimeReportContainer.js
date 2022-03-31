import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { useFetch } from "../customHooks/UseFetch";
import { postRequest } from "../utilities/postRequest.js";
import { TimeReportComponent } from "../components/TimeReportComponent.js";
import Moment from "moment"

export const TimeReportContainer = () => {
    // //response is just a state to let show a success or failure message when creating a timereport
    const [inputs, setInputs] = useState({});
    const {data, isLoading: isLoadingData, error} = useFetch("/get_projects");
    const [loaded, setLoaded] = useState(true)
    const [startDate, setStartDate] = useState(new Date())
    const options = []
    // //this gets the user who is logged in 
    const auth = useAuth()
    
    // Adds week number to timereports table
    function getWeek(date) {
      var weekNumber = (Moment(date).format("w") - 1)
      return weekNumber
    }

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
      const formatedDate = ((date) => {
        const [dateStr] = new Date(date).toISOString().split('T')
        return dateStr
      })(startDate)
      event.preventDefault();
      const reportedWeek = getWeek(formatedDate)
      setLoaded(false)
      const res = await postRequest(`/timereports/${formatedDate}/${auth.user.value}/${inputs.hours}/${inputs.project}/${inputs.note}/${reportedWeek}`)
      setLoaded(res.ok)
      if(loaded) {
        setInputs({})
        auth.updateTimeReports()
      }
    }

    //If all inputs is truthy then returns false which will set the submit button in the component to false, thus enables the button
    const requiredFieldsNotFilledOut = () => {
      if(inputs.hours && inputs.project && inputs.note) {
        return false
      }
      else{
        return true
      }
    }

    // Mounts the timereport component and sends the data and methods from container to the component
    return (
        <TimeReportComponent 
        loaded={loaded}
        error={error}
        isLoadingData={isLoadingData} 
        options={options} 
        inputs={inputs} 
        handleChange={handleChange} 
        handleDropmenu={handleDropmenu} 
        handleSubmit={handleSubmit} 
        startDate={startDate} 
        setStartDate={setStartDate}
        requiredFieldsNotFilledOut={requiredFieldsNotFilledOut}
        />
    )
}
