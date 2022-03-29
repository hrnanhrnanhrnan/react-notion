import React from "react";
import Select from "react-select";
import {Table, Dropdown} from "react-bootstrap"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import sv from "date-fns/locale/sv";
registerLocale("sv", sv);

export const AdminComponent = (props) => {
    //SHOW ME WHAT YOU GOT!
    return (
        <div className="container-fluid text-white">
            {
                !props.loaded ? (
                    <>
                        <div className="spinner-border text-muted">
                        </div>
                        <p>{props.error}</p>
                    </>
                ) : (
                    <div className="container">
                                <h4>Projektledare</h4>
                                <h4 className="pt-3 text-center">Select Project</h4> 
                                <Select options={props.projectOptions} onChange={props.handleProjectChange} className="text-dark text-center content"/>
                                <h4 className="pt-3 text-center">Select Week</h4>
                                <Select options={props.weekOptions} onChange={props.handleWeekChange} className="text-dark text-center content"/>
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
                                            props.setDateAndWeek(true, false)
                                        })}>Date</Dropdown.Item>
                                        <Dropdown.Item onClick={(() => {
                                            props.setDateAndWeek(false, true)
                                        })} >Week</Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
                                {
                                    props.datePickerStatus ? 
                                    (
                                        <div>
                                        <h4 className="pt-3 text-center">Select Date</h4>
                                        <DatePicker
                                        className="text-center w-100"
                                        id="datepickertest"
                                        selected={props.startDate}
                                        onChange={(date) => {
                                            props.setStartDate(date)
                                            props.filterAfterDate(date.toLocaleDateString("sv"))
                                            }}
                                        locale="sv"
                                        showWeekNumbers
                                        dateFormat={"yyyy/MM/dd"}
                                        strictParsing
                                        todayButton="Today"
                                        />
                                        </div>
                                    ) : props.selectWeekStatus ? (
                                        <div>
                                        <h4 className="pt-3 text-center">Select Week</h4>
                                        <Select options={props.weekOptions} onChange={props.handleWeekChange} className="text-dark text-center content"/>
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
                                    props.timereport?.map(row => (
                                    <tbody>
                                    <tr>
                                        <td>{props.addProjectName(row.properties.Project.relation[0].id)}</td>
                                        <td>{props.addPersonName(row.properties.Person.relation[0].id)}</td>
                                        <td>{row.properties.Date.date.start}</td>
                                        <td>{row.properties.Week.number}</td>
                                        <td>{row.properties.Hours.number}</td>
                                    </tr>
                                    </tbody>
                                    ))
                                }
                                <tfoot>Total hours reported: {props.timereport && props.getTotalHoursWorked(props.timereport)}</tfoot>
                                </Table>

                    </div>

                    
                )
            }
        </div>
    )
}