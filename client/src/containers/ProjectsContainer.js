import {useFetch} from "../customHooks/UseFetch.js"
import { ProjectsComponent } from "../components/ProjectsComponent.js"
import {useState} from "react";
import { useAuth } from "../contexts/AuthContext.js";

export const ProjectsContainer = () => {
  //Calling custom hooks to set state of ProjectsContainer
  //ProjectsContainer takes care of all logic and then passes that logic to the GetDataComponent when it mounts
  const {data: projects, isLoading: isLoadingProjects, error} = useFetch("/get_projects")
  const {data: timereports, isLoading: isLoadingTimeReports} = useFetch("/get_timereports")
  const [showProject, setshowProject] = useState([]);

  //const {data: users, isLoading: isLoadingUsers} = useFetch("/get_members")
  // const [status, setStatus] = useState()
  // const [person, setPerson] = useState()
  const auth = useAuth()
  const statusOptions = [{value: "All", label:"All"}]

  // const personOptions = [
  //   {value: "All", label:"All"},
  //   {value: auth.user.value, label: "Mine"}
  // ]


  //all the projects that the user has reported time to
  const usersProjects = []

  
  !isLoadingProjects && (() => {
    //get unique statuses
    const uniqueStatus = [...new Set(projects.results.map(project => project.properties.Status.select.name)) ]
    for(var i = 0; i < uniqueStatus.length; i++) {
      statusOptions.push({value:uniqueStatus[i], label:uniqueStatus[i]})
    }

    //get the projects where the user has reported time and push that to the array with all the projects that the user has reported
    !isLoadingTimeReports && (() => {

      const userTimereports = timereports.results.filter((timereport) => timereport.properties.Person.relation[0].id === auth.user.value)
      const uniqueProjectId = [...new Set(userTimereports.map(row => row.properties.Project.relation[0].id))]
      
      //populate the userprojects array
      for(let i = 0; i < uniqueProjectId.length; i++) {
        const project = projects.results.filter(project => project.id === uniqueProjectId[i]) 
        usersProjects.push(project[0])
      }

    })()
  })()

  const handleChange = (event) => {
    setshowProject(projectsToShow(event.value))
  }

  const projectsToShow = (status) => {
    if (status === "All") {
      return usersProjects
    } 
    
    return usersProjects.filter(project => project.properties.Status.select.name === status )
  }
 
  return (
     <ProjectsComponent isLoading={isLoadingProjects} 
     error={error} 
     statusOptions={statusOptions} 
     showProject={showProject} 
     handleChange={handleChange}/>
  )
}

