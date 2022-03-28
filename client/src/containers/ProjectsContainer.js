import {useFetch} from "../customHooks/UseFetch.js"
import { ProjectsComponent } from "../components/ProjectsComponent.js"
import {useState} from "react";
import { useAuth } from "../contexts/AuthContext.js";

export const ProjectsContainer = () => {
  //Calling custom hooks to fetch projects and timereports
  const {data: projects, isLoading: isLoadingProjects, error} = useFetch("/get_projects")
  const {data: timereports, isLoading: isLoadingTimeReports} = useFetch("/get_timereports")
  const [showProject, setShowProject] = useState([]);
  const [status, setStatus] = useState()
  const [person, setPerson] = useState()
  //get the logged in user
  const auth = useAuth()
  //populate the options for the select elements
  const statusOptions = [{value: "All", label:"All"}]
  const personOptions = [{value: "All", label:"All"},{value: auth.user.value, label: "Mine"}]
  let loaded = false

  //all the projects that the user has reported time to
  const usersProjects = []

  const selectedOptions = (status, personId) => {
    if((status === "All" || status === undefined) && (personId !== "All" && personId !== undefined)){
        //when status is set to all or not selected at all, return all projects where the logged in user has reported time on
        return usersProjects
        
    } else if((personId === "All" || personId === undefined) && (status !== "All" && status !== undefined)){
        //when person is set to all or not selected at all, return all projects where the logged in user 
        return projects.results.filter(project => project.properties.Status.select.name === status)
        
    } else if((status === "All" || status === undefined) && (personId === "All" || personId === undefined)){
        //when both status and person is either set to all or not selected at all, return all projects
        return projects.results
    } else {
      //when both person and status is choosen, return all projects where the user has reported time that matches the choosen status
      return usersProjects.filter(projects => projects.properties.Status.select.name === status)        
    }
  }

//eventhandler that handles when status is changed in the select element 
//and sets the status state and then updates the showproject state through the selectedoptions method
  const handleStatusChange = (event) => {
    setStatus(event.value)
    setShowProject(selectedOptions(event.value, person))
  }

  //eventhandler that handles when person is changed in the select element 
//and sets the person state and then updates the showproject state through the selectedoptions method
  const handlePersonChange = (event) => {
    setPerson(event.value)
    setShowProject(selectedOptions(status, event.value))
  }

  //wait until all data is loaded and the populates the dropdown options arrays
  if(!isLoadingProjects && !isLoadingTimeReports) {
    //get unique statuses
    const uniqueStatus = [...new Set(projects.results.map(project => project.properties.Status.select.name)) ]
    for(var i = 0; i < uniqueStatus.length; i++) {
      statusOptions.push({value:uniqueStatus[i], label:uniqueStatus[i]})
    }

    //get the projects where the user has reported time and push that to the array with all the projects that the user has reported
    const userTimereports = timereports.results.filter((timereport) => timereport.properties.Person.relation[0].id === auth.user.value)
    const uniqueProjectId = [...new Set(userTimereports.map(row => row.properties.Project.relation[0].id))]
    
    //populate the userprojects array
    for(let i = 0; i < uniqueProjectId.length; i++) {
      const project = projects.results.filter(project => project.id === uniqueProjectId[i]) 
      usersProjects.push(project[0])
    }
    
    //when all the data is loaded then sets loaded to true and passes that to the component
    loaded = true
  }
 
  return (
     <ProjectsComponent 
     loaded={loaded} 
     error={error} 
     statusOptions={statusOptions}
      personOptions={personOptions}
      showProject={showProject} 
      handleStatusChange={handleStatusChange}
      handlePersonChange={handlePersonChange}
     />
  )
}

