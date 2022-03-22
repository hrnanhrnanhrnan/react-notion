import React, { useState } from "react";
import { AdminComponent } from "../components/AdminComponent"
import { useFetch } from "../customHooks/UseFetch";

export const AdminContainer = () => {
    const userOptions = [{value: "All", label: "All"}]
    const projectOptions = [{value: "All", label: "All"}]
    const [selectedProject, setSelectedProject] = useState()
    const [selectedPerson, setSelectedPerson] = useState()
    const [timereport, setTimereport] = useState([])
    const {data: users, isLoading: loadingUsers} = useFetch("/get_members")
    const {data: projects, isLoading: loadingProjects} = useFetch("/get_projects")
    const {data: timereports, isLoading: loadingTimereports, error: timereportsError} = useFetch("/get_timereports")

    //Adds user to the dropdown menu
    !loadingUsers && (() => {
        users.results.map((users) => userOptions.push({value: users.id, label: users.properties.Name.title[0].plain_text}))
    })()
    
    //Adds projects to the dropdown menu
    !loadingProjects && (() => {
        projects.results.map((projects) => projectOptions.push({value: projects.id, label: projects.properties.Projectname.title[0].plain_text}))
    })()

    // Handling options from admin-page, depending on dropdown menu selected item
    const selectedOptions = (projectId, personId) => {
        if((projectId === "All" || projectId === undefined) && personId !== "All"){
            //Filter on person
            setTimereport(timereports.results.filter((element) => element.properties.Person.relation[0].id === personId))
        } else if((personId === "All" || personId === undefined) && projectId !== "All"){
            //Filter on project
            setTimereport(timereports.results.filter((element) => element.properties.Project.relation[0].id === projectId))
        } else if(projectId === "All" && personId === "All"){
            //Filter on all projekts and all users
            setTimereport(timereports.results)
        } else {
            setTimereport(timereports.results.filter((element) => element.properties.Person.relation[0].id === personId && element.properties.Project.relation[0].id === projectId))
        }
   }

    const handlePersonChange = (e) => {
        setSelectedPerson(e.value)
        selectedOptions(selectedProject, e.value)
    }

    const handleProjectChange = (e) => {
        setSelectedProject(e.value)
        selectedOptions(e.value, selectedPerson)
    }
    
    //For testing purposes
    if(!loadingProjects && !loadingUsers && !loadingTimereports){
        // console.log(users)
        // console.log(projects)
        // console.log(timereports)
    }

    //LOGIK
    return (
        <AdminComponent isLoadingUsers={loadingUsers} 
        isLoadingProjects={loadingProjects} 
        isLoadingTimereports={loadingTimereports} 
        projectOptions={projectOptions} 
        userOptions={userOptions} 
        error={timereportsError} 
        handleProjectChange={handleProjectChange} 
        handlePersonChange={handlePersonChange}  
        timereport={timereport}
        />
    )
}