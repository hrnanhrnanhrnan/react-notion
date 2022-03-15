import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { useFetch } from "../customHooks/UseFetch";
import Select from "react-select"

export const TestContainer = () => {
    // //response is just a state to let show a success or failure message when creating a timereport
    const [response, setResponse] = useState(null)
    const [inputs, setInputs] = useState({});
    const {data, isLoading, error} = useFetch("/get_database");
    const options = []
    // //this gets the user who is logged in 
    const auth = useAuth()
    

    !isLoading && (() => {
        data.results.map((project) => options.push({value: project.id, label: project.properties.Projectname.title[0].plain_text} )) 
    })()

    
    // eventhandler to handle the click from the timereport button, this can later be used to connect to the submit button of the form
    const handleClick = () => {
        //this is the endpoint of the server, we use the variabels or values 
        //we get from the form and pass it into the url as parameters 
        fetch(`/timereports/${inputs.date}/${auth.user.value}/${inputs.hours}/${inputs.project}/${inputs.note}`, {method: "POST"})
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

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleDropmenu = (event) => {
        const value = event.value;
        setInputs(values => ({...values, project: value}))
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      handleClick();
    }
    
    return (
        <div className="test">
      <form onSubmit={handleSubmit} className="text-white">
        <label>Date: <br />
            <input 
            type="text" 
            name="date" 
            value={inputs.date || ""} 
            onChange={handleChange}
            />
        </label>
        <label>Hours: <br />
          <input 
            type="number" 
            name="hours" 
            value={inputs.hours || ""} 
            onChange={handleChange}
            />
        </label>
        <label>Project: <br />
            
            <Select options={options} onChange={handleDropmenu} className="text-dark"/>
            
        </label>
        <label>Note: <br />
            <textarea 
            name="note" 
            value={inputs.note || ""} 
            onChange={handleChange}
            />
        </label> <br />
          <input type="submit" className="submitButton"/>
      </form>
      </div>
    )
}
