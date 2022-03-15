import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";

export const TestContainer = () => {
    // //response is just a state to let show a success or failure message when creating a timereport
    const [response, setResponse] = useState(null)
    const [inputs, setInputs] = useState({});
    // //this gets the user who is logged in 
    const auth = useAuth()

    // //this variabels is used to send to the server endpoint. This variabels is what we then get from the form
    // const date = inputs.date
    // const person = auth.user.value
    // const hours = inputs.hours
    // const project = inputs.project
    // const note = inputs.note

    const date = inputs.date
    const person = auth.user.value
    const hours = inputs.hours
    const project = "a15930f95dad4ebd9dd9879de038191f"
    const note = inputs.note
    
    // eventhandler to handle the click from the timereport button, this can later be used to connect to the submit button of the form
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

    
    // // const [values, setValues] = useState({
    // //     date: "", hours: 0, project: "", note: ""
    // // });
    
    // // const set = (name) => {
    // //     return ({ target: { value } }) => {
    // //     setValues((oldValues) => ({ ...oldValues, [name]: value }));
    // //     };
    // // };
    
    // return (
    // <form onSubmit={handleClick} className="text-white"> 
    // <h2>Create Timereport</h2>

    // <label>Date:</label>
    // <input 
    //     id="dateLabel"
    //     type="text" required
    //     value={values.date} onChange={set("date")}
    // />

    // <label>Hours:</label>
    // <input 
    //     type="number" required
    //     value={values.hours} onChange={set("hours")}
    // />

    // <label>Project:</label>
    // <input
    //     type="text" required
    //     value={values.project} onChange={set("project")} 
    // />

    // <label>Note:</label>
    // <textarea value={values.note} onChange={set("note")} />

    // {!response && <Button onClick={handleClick}>Skapa tidsrapport</Button>}
    //             {
    //                 response?.ok ? (
    //                     <h3>{response?.message}</h3>
    //                 ) : (
    //                     <h3>{response?.message}</h3>
    //                 )
    //             }
    // </form>
    // );

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(inputs, person);
      handleClick();
    }
  
    return (
        <div>
      <form onSubmit={handleSubmit} className="text-white">
        <label>Date:
            <input 
            type="text" 
            name="date" 
            value={inputs.date || ""} 
            onChange={handleChange}
            />
        </label>
        <label>Hours:
          <input 
            type="number" 
            name="hours" 
            value={inputs.hours || ""} 
            onChange={handleChange}
            />
        </label>
        <label>Project:
            <select onChange={handleChange}>
                <option value="a15930f95dad4ebd9dd9879de038191f">TEST</option>
                <option value="1a0384cc414d4200810397c648f638c9">My First Project</option>
                <option value="a501137114ea4dec8238a460cb9c0aa5">Another Project</option>
                <option value="c7f2f48431324c00a1a8bfe27a2fb1cf">The Best Project</option>
            </select> 
        </label>
        <label>Note:
            <textarea 
            name="note" 
            value={inputs.note || ""} 
            onChange={handleChange}
            />
        </label>
          <input type="submit" />
      </form>
      </div>
    )
}

