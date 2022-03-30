import React from "react"
import { ProjectleaderComponent } from "../components/ProjectleaderComponent.js";
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext.js";
import { useFetch } from "../customHooks/UseFetch";
import { putRequest } from "../utilities/putRequest.js";

export const ProjectleaderContainer = () => {

    const [inputs, setInputs] = useState({});
    const {data, isLoading: isLoadingData} = useFetch("/get_projects");
    const options = []
    const [showProject, setshowProject] = useState([]);
    const [loaded, setLoaded] = useState(true)
    const auth = useAuth()

    const [endDate, setEndDate] = useState(new Date())

    const projectOptions = [{value: undefined, label: "All"}]
    const weekOptions = [{value: undefined, label: "All"}]
    const [selectedProject, setSelectedProject] = useState()
    const [selectedWeek, setSelectedWeek] = useState()
    const [project, setProject] = useState([])
    const {data: timereports, isLoading: loadingTimereports, error: timereportsError} = useFetch("/get_timereports")
    const {data: users} = useFetch("/get_members")
    let loadedData = false

 !isLoadingData && (() => {
        data.results.map((project) => options.push({value: project.id, label: project.properties.Projectname.title[0].plain_text} )) 
    })()

    const handleDropmenu = (event) => {
        setshowProject(projectsToShow(event.value))
        setInputs({hours: data.results.filter(project => project.id === event.value)[0].properties.Hours.number})
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
      const res = await putRequest(`/updateProjectHours/${inputs.hours}/${showProject[0].id}/${auth.user.value}/${dateStr}`)
      setLoaded(res.ok)
      if(loaded) {
        setInputs({})
      }
    }
    
    // ---------------------Datepicker-----------------------------------------------
    

    const handleSubmitDate = async (event) => {
        const formatedDate = ((date) => {
            const [dateStr] = new Date(date).toISOString().split('T')
            return dateStr
        })(endDate)
        event.preventDefault();
        setLoaded(false)
        const res = await putRequest(`updateProjectDate/${showProject[0].properties.Timespan.date.start}/${formatedDate}/${showProject[0].id}/${auth.user.value}/${new Date().toLocaleString("sv")}`)
        setLoaded(res.ok)
        if(loaded) {
            setInputs({})
        }
        console.log(res.message)
    }

    //---------------------------------Admin stuff---------------------------------------------
    

    const getProjectHoursLeft = (projectId) => {
        return data?.results?.filter(row => row.id === projectId)?.map(project => project.properties["Hours left"])[0]?.formula.number
    }

    const filterAfterProjectAndWeek = (projectId) => {
        setProject(data.results.filter(row => projectId ? row.id === projectId : row.id !== projectId))
    }

    const getReportedTime = (projectId) => {
        return getTotalHoursWorked(timereports?.results.filter(row => (row.properties.Project.relation[0].id === projectId) &&
        (selectedWeek ? row.properties.Week.number === selectedWeek : row.properties.Week.number !== selectedWeek)))
    }
    
   //Maps the projects name when project and timereport id is the same
   function addProjectName(projectId){
       const projectNames = data?.results.filter((element) => element.id === projectId)
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
    if(!isLoadingData && !loadingTimereports){
        //Adds projects to the dropdown menu
        data.results.map((projects) => projectOptions.push({value: projects.id, label: projects.properties.Projectname.title[0].plain_text}))
        
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
            options={options}
            endDate={endDate}
            setEndDate={setEndDate}
            inputs={inputs}
            showProject={showProject}
            getReportedTime={getReportedTime}
            getProjectHoursLeft={getProjectHoursLeft}
            handleProjectChange={handleProjectChange}  
            handleWeekChange={handleWeekChange}
            getTotalHoursWorked={getTotalHoursWorked}
            addProjectName={addProjectName}
            addPersonName={addPersonName}
            loadedData={loadedData}
            projectOptions={projectOptions} 
            weekOptions={weekOptions}
            error={timereportsError}
            project={project}
            timereportsOutOfSpan={auth.timereportsOutOfSpan} 
        />

    )
}