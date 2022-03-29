import React, { useState } from "react";
import { useFetch } from "../customHooks/UseFetch";
import { AdminComponent } from "../components/AdminComponent.js"
import {useAuth} from "../contexts/AuthContext"

export const AdminContainer = () => {
    const projectOptions = [{value: undefined, label: "All"}]
    const weekOptions = [{value: undefined, label: "All"}]
    const [selectedProject, setSelectedProject] = useState()
    const [selectedWeek, setSelectedWeek] = useState()
    const [project, setProject] = useState([])
    const {data: projects, isLoading: loadingProjects} = useFetch("/get_projects")
    const {data: timereports, isLoading: loadingTimereports, error: timereportsError} = useFetch("/get_timereports")
    const {data: users} = useFetch("/get_members")
    let loaded = false
    const auth = useAuth()

    const getProjectHoursLeft = (projectId) => {
        return projects?.results?.filter(row => row.id === projectId)?.map(project => project.properties["Hours left"])[0]?.formula.number
    }

    const filterAfterProjectAndWeek = (projectId) => {
        setProject(projects.results.filter(row => projectId ? row.id === projectId : row.id !== projectId))
    }

    const getReportedTime = (projectId) => {
        return getTotalHoursWorked(timereports?.results.filter(row => (row.properties.Project.relation[0].id === projectId) &&
        (selectedWeek ? row.properties.Week.number === selectedWeek : row.properties.Week.number !== selectedWeek)))
    }
    
   //Maps the projects name when project and timereport id is the same
   function addProjectName(projectId){
       const projectNames = projects?.results.filter((element) => element.id === projectId)
       return projectNames?.[0].properties.Projectname.title[0].plain_text
    }

    //Maps the persons name when person and timereports id is the same
    function addPersonName(personId){
        const personNames = users?.results.filter((element) => element.id === personId)
        return personNames?.[0].properties.Name.title[0].plain_text
        }

    const getTotalHoursWorked = (arr) => {
        let sum = 0
        for (let index = 0; index < arr.length; index++) {
            sum += arr[index].properties.Hours.number
        }
        return sum
    }

    //Eventhandler that gets the value of the selected project in dropdown and sets it as state
    const handleProjectChange = (e) => {
        setSelectedProject(e.value)
        filterAfterProjectAndWeek(e.value, selectedWeek)
    }

    //Eventhandler that gets the value of the selected week in the dropdown and sets it as state
    const handleWeekChange = (e) => {
        setSelectedWeek(e.value)
        filterAfterProjectAndWeek(selectedProject, e.value)
    }

    //waits till all data is loaded and then populates the options arrays
    if(!loadingProjects && !loadingTimereports){
        //Adds projects to the dropdown menu
        projects.results.map((projects) => projectOptions.push({value: projects.id, label: projects.properties.Projectname.title[0].plain_text}))
        
        //Adds unique weeks to the dropdown menu
        const unique = [...new Set(timereports.results.map(row => row.properties.Week.number))]
        for(let i = 0; i < unique.length; i++){
            weekOptions.push({value: unique[i], label: unique[i]})
        }
        
        //when all dropdown options has been populated loaded is set to true and passed as prop to the component
        loaded = true
    }

    //LOGIK
    return (
        <AdminComponent 
        loaded={loaded}
        projectOptions={projectOptions} 
        weekOptions={weekOptions}
        error={timereportsError}
        project={project}
        timereportsOutOfSpan={auth.timereportsOutOfSpan} 
        getReportedTime={getReportedTime}
        getProjectHoursLeft={getProjectHoursLeft}
        handleProjectChange={handleProjectChange}  
        handleWeekChange={handleWeekChange}
        getTotalHoursWorked={getTotalHoursWorked}
        addProjectName={addProjectName}
        addPersonName={addPersonName}
        />
    )
}