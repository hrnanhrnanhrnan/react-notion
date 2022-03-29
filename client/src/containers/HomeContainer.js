import { HomeComponent } from "../components/HomeComponent";
import React, { useState } from "react";
import { useFetch } from "../customHooks/UseFetch";
import { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import sv from "date-fns/locale/sv";
registerLocale("sv", sv);

export const HomeContainer = () => {
    const projectOptions = [{value: undefined, label: "All"}]
    const weekOptions = [{value: undefined, label: "All"}]
    const [selectedProject, setSelectedProject] = useState()
    const [selectedWeek, setSelectedWeek] = useState()
    const [startDate, setStartDate] = useState(new Date())
    const [timereport, setTimereport] = useState([])
    const {data: users, isLoading: loadingUsers} = useFetch("/get_members")
    const {data: projects, isLoading: loadingProjects} = useFetch("/get_projects")
    const {data: timereports, isLoading: loadingTimereports, error: timereportsError} = useFetch("/get_timereports")
    let loaded = false
    const [datePickerStatus, setDatePickerStatus] = useState(false)
    const [selectWeekStatus, setSelectWeekStatus] = useState(false)

    const filterAfterDateOrWeek = (date, week) => {
        if (datePickerStatus && !selectWeekStatus) {
            setTimereport(timereports.results?.filter(row => date ? row.properties.Date.date.start === date : row.properties.Date.date.start !== date))
        }
        else {
            setTimereport(timereports.results?.filter(row => week ? row.properties.Week.number === week : row.properties.Week.number !== week))
        }
        
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
    }

    //Eventhandler that gets the value of the selected week in the dropdown and sets it as state
    const handleWeekChange = (e) => {
        setSelectedWeek(e.value)
        filterAfterDateOrWeek(startDate, e.value)
    }

    function setDateAndWeek(date, week){
        setDatePickerStatus(date)
        setSelectWeekStatus(week)
    }

    //waits till all data is loaded and then populates the options arrays
    if(!loadingProjects && !loadingUsers && !loadingTimereports){
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

    return (
        <HomeComponent 
        loaded={loaded}
        startDate={startDate} 
        projectOptions={projectOptions} 
        weekOptions={weekOptions}
        error={timereportsError}
        timereport={timereport}
        selectedWeek={selectedWeek} 
        handleProjectChange={handleProjectChange}  
        handleWeekChange={handleWeekChange}
        getTotalHoursWorked={getTotalHoursWorked}
        addProjectName={addProjectName}
        addPersonName={addPersonName}
        setDateAndWeek={setDateAndWeek}
        datePickerStatus={datePickerStatus}
        selectWeekStatus={selectWeekStatus}
        filterAfterDateOrWeek={filterAfterDateOrWeek}
        setStartDate={setStartDate}
        />
    )

}


    // //takes in the current user and displays it to the screen
    // const auth = useAuth()
    // return (
    //     <div className="container-fluid text-white">
    //         <h1 className="display-1">Welcome {auth.user.label}</h1>
    //     </div>
    // )