import React from "react"
import Select from "react-select"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext.js";
import { useFetch } from "../customHooks/UseFetch";
import { Button, Form } from "react-bootstrap";
import { putRequest } from "../utilities/putRequest.js";

export const TestContainer = () => {

    const [inputs, setInputs] = useState({});
    const {data, isLoading: isLoadingData} = useFetch("/get_projects");
    const options = []
    const [showProject, setshowProject] = useState([]);
    const [loaded, setLoaded] = useState(true)
    const auth = useAuth()
    
 !isLoadingData && (() => {
        data.results.map((project) => options.push({value: project.id, label: project.properties.Projectname.title[0].plain_text} )) 
    })()

    const handleDropmenu = (event) => {
        setshowProject(projectsToShow(event.value))
    }
   
    const projectsToShow = (id) => 
        data.results.filter(project => project.id === id)
    

    const handleChange = (event) => {
        setInputs(values => ({...values, [event.target.name]: event.target.value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const [dateStr] = new Date().toISOString().split('T')
      setLoaded(false)
      const res = await putRequest(`/timereports/${inputs.hours}/${showProject[0].id}/${auth.user.value}/${dateStr}`)
      setLoaded(res.ok)
      if(loaded) {
        setInputs({})
      }
    }
    console.log( new Date().toISOString().split('T'))

    return (
        <div className="container-fluid bg-dark text-white">
            <Select options={options} onChange={handleDropmenu} className="text-dark"/>
            
            {
                showProject.map((project) => ( 
                    <ul key={project.id + 1}>
                    <li key={project.id + 2}> Name: {project.properties.Projectname.title[0].plain_text} </li>
                    <li key={project.id + 3}> Hours: {project.properties.Hours.number} </li>
                    <li key={project.id + 4}> Timespan: {`${project.properties.Timespan.date?.start} - ${project.properties.Timespan?.date?.end}`} </li>
                    </ul>
                ))
            
            }
            <Form onSubmit={handleSubmit} id="test">
                <Form.Group className="mb-5 text-white" controlId="formTest" >
                    <Form.Label>Hours: </Form.Label>
                        <Form.Control 
                            className="text-center"
                            placeholder="0"
                            type="number" 
                            name="hours" 
                            value={inputs.hours || ""} 
                            onChange={handleChange}
                            required
                        />
                    <Button variant="primary" type="submit" className="submitButton">Submit</Button>
                </Form.Group>
            </Form>
        </div>

    )
}