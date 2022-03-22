import React from "react"
import Select from "react-select"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext.js";
import { useFetch } from "../customHooks/UseFetch";


export const TestContainer = () => {

    const [inputs, setInputs] = useState({});
    const {data, isLoading: isLoadingData} = useFetch("/get_projects");
    const options = []
    const [showProject, setshowProject] = useState([]);
    
 !isLoadingData && (() => {
        data.results.map((project) => options.push({value: project.id, label: project.properties.Projectname.title[0].plain_text} )) 
    })()

    const handleDropmenu = (event) => {
        // setInputs(values => ({...values, project: event.value}))
        setshowProject(projectsToShow(event.value))
        
    }
   
    const projectsToShow = (id) => 
         data.results.filter(project => project.id === id)
    

   
    console.log(showProject)
    return (
        <div className="container-fluid bg-dark text-white text-center">
            <Select options={options} onChange={handleDropmenu} className="text-dark"/>
            {
                showProject.map((project) => ( 
                     <p>Name: {project.properties.Projectname.title[0].plain_text}</p>
                     
                ))
               
            }
           
        </div>
    )
}