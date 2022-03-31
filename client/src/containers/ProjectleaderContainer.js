import React from "react"
import { ProjectleaderComponent } from "../components/ProjectleaderComponent.js";
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext.js";
import { useFetch } from "../customHooks/UseFetch";
import { putRequest } from "../utilities/putRequest.js";

export const ProjectleaderContainer = () => {
    //Fetches data from different tables in Notion
    const {data: projectData, isLoading: isLoadingProjects} = useFetch("/get_projects");
    const {data: timereports, isLoading: loadingTimereports, error: timereportsError} = useFetch("/get_timereports")
    const {data: users} = useFetch("/get_members")
    //States
    const [inputs, setInputs] = useState({});
    const [showProject, setshowProject] = useState([]);
    const [loaded, setLoaded] = useState(true)
    const [endDate, setEndDate] = useState(new Date())
    const [selectedProject, setSelectedProject] = useState()
    const [selectedWeek, setSelectedWeek] = useState()
    const [project, setProject] = useState([])
    //Dropdown menu options
    const projectOptions = [{value: undefined, label: "All"}]
    const weekOptions = [{value: undefined, label: "All"}]
    const auth = useAuth()
    let loadedData = false
    const options = []

    //When done loading projects, add to options dropdown menu.
    !isLoadingProjects && (() => {
        projectData.results.map((project) => options.push({value: project.id, label: project.properties.Projectname.title[0].plain_text} )) 
    })()
    
    //Sets projects by value, in setShowProject state, then adds hours from selected project to inputs.hours
    const handleDropmenu = (event) => {
        setshowProject(projectsToShow(event.value))
        setInputs({hours: projectData.results.filter(project => project.id === event.value)[0].properties.Hours.number})
        setEndDate(new Date(projectData.results.filter(row => row.id === event.value)[0].properties.Timespan.date.end))
    }

    // Filters out data, if data/projects have the same id as passed id, return object
    const projectsToShow = (id) => {
        return projectData.results.filter(project => project.id === id)
    }

    // Sets inputs from event, to display selected project
    const handleChange = (event) => {
        setInputs(values => ({...values, [event.target.name]: event.target.value}))
    }

    //On submit button press, update value in Notion DB
    const handleSubmit = async (event) => {
        event.preventDefault();
        const [dateStr] = new Date().toISOString().split('T')
      setLoaded(false)
      const res = await putRequest(`/updateProjectHours/${inputs.hours}/${showProject[0].id}/${auth.user.value}/${dateStr}`)
      const reloadedProjects = await fetch("/get_projects")
      .then(res => res.json())
      .then(jsonRes => setshowProject(jsonRes.results.filter(row => row.id === showProject[0].id)))
      setLoaded(res.ok)
      if(loaded && reloadedProjects) {
            try{
                setInputs({hours: reloadedProjects.results.filter(project => project.id === event.value)[0].properties.Hours.number})
            }
            catch (error){
                console.log(error)
            }
      }
    }
    
    // ---------------------Datepicker-----------------------------------------------
    
    // On button press, change timespan of selected project
    const handleSubmitDate = async (event) => {
        const formatedDate = ((date) => {
            const [dateStr] = new Date(date).toISOString().split('T')
            return dateStr
        })(endDate)
        event.preventDefault();
        setLoaded(false)
        const res = await putRequest(`updateProjectDate/${showProject[0].properties.Timespan.date.start}/${formatedDate}/${showProject[0].id}/${auth.user.value}/${new Date().toLocaleString("sv")}`)
        const reloadedProjects = await fetch("/get_projects")
        .then(res => res.json())
        .then(jsonRes => setshowProject(jsonRes.results.filter(row => row.id === showProject[0].id)))
        setLoaded(res.ok)
        if(loaded && reloadedProjects) {
            try{
                setEndDate(new Date(projectData.results.filter(row => row.id === event.value)[0].properties.Timespan.date.end))
            }
              catch(error){
                console.log(error)
              }
        }
    }

    //---------------------------------Admin stuff---------------------------------------------
    
    // Filters out how many hours are left of selected project
    const getProjectHoursLeft = (projectId) => {
        return projectData?.results?.filter(row => row.id === projectId)?.map(project => project.properties["Hours left"])[0]?.formula.number
    }

    // When selecting hours and project, set state to returned objects that passes the conditions
    const filterAfterProjectAndWeek = (projectId) => {
        setProject(projectData.results.filter(row => projectId ? row.id === projectId : row.id !== projectId))
    }

    // Calls the method to get total hours worked on specific project and week, the returns it
    const getReportedTime = (projectId) => {
        return getTotalHoursWorked(timereports?.results.filter(row => (row.properties.Project.relation[0].id === projectId) &&
        (selectedWeek ? row.properties.Week.number === selectedWeek : row.properties.Week.number !== selectedWeek)))
    }
    
    //Maps the projects name when project and timereport id is the same
    function addProjectName(projectId){
       const projectNames = projectData?.results.filter((element) => element.id === projectId)
       return projectNames?.[0].properties.Projectname.title[0].plain_text
    }

    //Maps the persons name when person and timereports id is the same
    function addPersonName(personId){
        const personNames = users?.results.filter((element) => element.id === personId)
        return personNames?.[0].properties.Name.title[0].plain_text
    }

    // Adds together all worked hours, into a totalWorkedHours of project
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
    if(!isLoadingProjects && !loadingTimereports){
        //Adds projects to the dropdown menu
        projectData.results.map((projects) => projectOptions.push({value: projects.id, label: projects.properties.Projectname.title[0].plain_text}))
        
        //Adds unique weeks to the dropdown menu
        const unique = [...new Set(timereports.results.map(row => row.properties.Week.number))]
        for(let i = 0; i < unique.length; i++){
            weekOptions.push({value: unique[i], label: unique[i]})
        }

        //when all dropdown options has been populated loaded is set to true and passed as prop to the component
        loadedData = true
    }

    return (
        <ProjectleaderComponent 
            handleChange={handleChange}
            handleDropmenu={handleDropmenu}
            handleSubmit={handleSubmit}
            handleSubmitDate={handleSubmitDate}
            handleProjectChange={handleProjectChange}  
            handleWeekChange={handleWeekChange}
            addProjectName={addProjectName}
            addPersonName={addPersonName}
            getReportedTime={getReportedTime}
            options={options}
            endDate={endDate}
            setEndDate={setEndDate}
            inputs={inputs}
            showProject={showProject}
            getProjectHoursLeft={getProjectHoursLeft}
            getTotalHoursWorked={getTotalHoursWorked}
            loadedData={loadedData}
            projectOptions={projectOptions} 
            weekOptions={weekOptions}
            error={timereportsError}
            project={project}
            timereportsOutOfSpan={auth.timereportsOutOfSpan} 
        />

    )
}