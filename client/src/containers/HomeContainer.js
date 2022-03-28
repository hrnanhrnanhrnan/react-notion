import React, { useState } from "react";
import { useFetch } from "../customHooks/UseFetch";
import Select from "react-select"
import {Table, Dropdown} from "react-bootstrap"
import DatePicker, { registerLocale } from "react-datepicker"
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

    const filterAfterDate = (date) => {
        !loadingTimereports &&  setTimereport(timereports.results?.filter(row => date ? row.properties.Date.date.start === date : row.properties.Date.date.start !== date))
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
        //filterAfterSelectedOptions(e.value, selectedPerson, selectedWeek)
    }

    //Eventhandler that gets the value of the selected week in the dropdown and sets it as state
    const handleWeekChange = (e) => {
        setSelectedWeek(e.value)
    }

    const sumOfHours = (arr) => {
        let sum = 0
        for (let index = 0; index < arr.length; index++) {
            sum += arr[index].properties.Hours.number
        }
        return sum
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

        
        /* ------------------------------------------------------------------------------ */

    }

    //LOGIK
    return (
        <div className="container-fluid text-white">
            {
                !loaded ? (
                    <>
                        <div className="spinner-border text-muted">
                        </div>
                        <p>{timereportsError}</p>
                    </>
                ) : (

                    <div className="container">
                                <h4>Projektledare</h4>
                                <h4 className="pt-3 text-center">Select Project</h4> 
                                <Select options={projectOptions} onChange={handleProjectChange} className="text-dark text-center content"/>
                                <h4 className="pt-3 text-center">Select Week</h4>
                                <Select options={weekOptions} onChange={handleWeekChange} className="text-dark text-center content"/>
                                <Table responsive variant="dark" striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Project</th>
                                    <th>Hours</th>
                                    <th>Date</th>
                                    <th>Hours left</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                                </Table>


                                <h4>Chef</h4>
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic">
                                        Choose Date or week
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={(() => {
                                            setDatePickerStatus(true)
                                            setSelectWeekStatus(false)
                                        })}>Date</Dropdown.Item>
                                        <Dropdown.Item onClick={(() => {
                                            setDatePickerStatus(false)
                                            setSelectWeekStatus(true)
                                        })} >Week</Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
                                {
                                    datePickerStatus ? 
                                    (
                                        <div>
                                        <h4 className="pt-3 text-center">Select Date</h4>
                                        <DatePicker
                                        className="text-center w-100"
                                        id="datepickertest"
                                        selected={startDate}
                                        onChange={(date) => {
                                            setStartDate(date)
                                            filterAfterDate(date.toLocaleDateString("sv"))
                                            }}
                                        locale="sv"
                                        showWeekNumbers
                                        dateFormat={"yyyy/MM/dd"}
                                        strictParsing
                                        todayButton="Today"
                                        />
                                        </div>
                                    ) : selectWeekStatus ? (
                                        <div>
                                        <h4 className="pt-3 text-center">Select Week</h4>
                                        <Select options={weekOptions} onChange={handleWeekChange} className="text-dark text-center content"/>
                                        </div>
                                    ) : null
                                }
                                <Table responsive variant="dark" striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Project</th>
                                    <th>Person</th>
                                    <th>Date</th>
                                    <th>Week</th>
                                    <th>Hours</th>
                                    </tr>
                                </thead>
                                {
                                    timereport?.map(row => (
                                    <tbody>
                                    <tr>
                                        <td>{addProjectName(row.properties.Project.relation[0].id)}</td>
                                        <td>{addPersonName(row.properties.Person.relation[0].id)}</td>
                                        <td>{row.properties.Date.date.start}</td>
                                        <td>{row.properties.Week.number}</td>
                                        <td>{row.properties.Hours.number}</td>
                                    </tr>
                                    </tbody>
                                    ))
                                }
                                <tfoot>Total hours reported: {timereport && sumOfHours(timereport)}</tfoot>
                                </Table>

                    </div>

                    


                )
            }

        </div>
    )
}

{/* <AdminComponent 
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
/> */}