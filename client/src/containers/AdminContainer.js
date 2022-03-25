import React, { useState } from "react";
import { AdminComponent } from "../components/AdminComponent"
import { useFetch } from "../customHooks/UseFetch";

export const AdminContainer = () => {
    const userOptions = [{value: undefined, label: "All"}]
    const projectOptions = [{value: undefined, label: "All"}]
    const weekOptions = [{value: undefined, label: "All"}]
    const [selectedProject, setSelectedProject] = useState()
    const [selectedPerson, setSelectedPerson] = useState()
    const [selectedWeek, setSelectedWeek] = useState()
    const [timereport, setTimereport] = useState([])
    const {data: users, isLoading: loadingUsers} = useFetch("/get_members")
    const {data: projects, isLoading: loadingProjects} = useFetch("/get_projects")
    const {data: timereports, isLoading: loadingTimereports, error: timereportsError} = useFetch("/get_timereports")
    let loaded = false

    //method to filter the timereports depending on the choosen states of person, project and week
    const filterAfterSelectedOptions = (projectId, personId, week) => {
        setTimereport(timereports.results.filter((element) => 
            //if personId is truthy, run filter and get all timereports made by the choosen person, else filter without a personId filter
            (personId ? element.properties.Person.relation[0].id === personId : element.properties.Person.relation[0].id !== personId) &&
            //if projectid is truthy, run filter and get all timereports to the choosen project, else filter without a project filter
            (projectId ? element.properties.Project.relation[0].id === projectId : element.properties.Project.relation[0].id !== projectId) &&
            ////if Week is truthy, run filter and get all timereports made on the choosen week, else filter without a week filter
            (week ? element.properties.Week.number === week : element.properties.Week.number !== week)
        ))
    }

   //Maps the projects name when project and timereport id is the same
   function addProjectName(projectId){
       const projectNames = projects.results.filter((element) => element.id === projectId)
       return projectNames[0].properties.Projectname.title[0].plain_text
    }

    //Maps the persons name when person and timereports id is the same
    function addPersonName(personId){
       const personNames = users.results.filter((element) => element.id === personId)
       return personNames[0].properties.Name.title[0].plain_text
    }

    function getHoursWorked(timereportId){
        const workedHours = projects.results.filter((element) => element.id === timereportId)
        return workedHours[0].properties["Worked hours"].rollup.number
    }

    //Eventhandler that gets the value of the selected project in dropdown and sets it as state
    const handleProjectChange = (e) => {
        setSelectedProject(e.value)
        filterAfterSelectedOptions(e.value, selectedPerson, selectedWeek)
    }
    
    //Eventhandler that gets the value of the selected person in dropdown and sets it as state
    const handlePersonChange = (e) => {
        setSelectedPerson(e.value)
        filterAfterSelectedOptions(selectedProject, e.value, selectedWeek)
    }

    //Eventhandler that gets the value of the selected week in the dropdown and sets it as state
    const handleWeekChange = (e) => {
        setSelectedWeek(e.value)
        filterAfterSelectedOptions(selectedProject, selectedPerson, e.value)
    }

    //waits till all data is loaded and then populates the options arrays
    if(!loadingProjects && !loadingUsers && !loadingTimereports){
        //Adds user to the dropdown menu
        users.results.map((users) => userOptions.push({value: users.id, label: users.properties.Name.title[0].plain_text}))

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
        userOptions={userOptions} 
        weekOptions={weekOptions}
        error={timereportsError}
        timereport={timereport} 
        handleProjectChange={handleProjectChange} 
        handlePersonChange={handlePersonChange}  
        handleWeekChange={handleWeekChange}
        getHoursWorked={getHoursWorked}
        addProjectName={addProjectName}
        addPersonName={addPersonName}
        />
    )
}