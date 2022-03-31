import React from "react";
import Select from "react-select";
import {Table, Dropdown} from "react-bootstrap"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import sv from "date-fns/locale/sv";
registerLocale("sv", sv);

export const ManagerComponent = (props) => {
    
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
                    <div className="container content">
                                <h4>View timereports</h4>
                                <Dropdown>
                                    <Dropdown.Toggle className="mb-3" id="dropdown-basic">
                                        Sort on date or week
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item aria-label="dropdown menu to select date" onClick={(() => {
                                            props.setDateAndWeek(true, false)
                                        })}>Date</Dropdown.Item>
                                        <Dropdown.Item aria-label="dropdown menu to select week" onClick={(() => {
                                            props.setDateAndWeek(false, true)
                                        })} >Week</Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
                    
                                {
                                    props.datePickerStatus ? 
                                    (
                                        <div>
                                        <h4 className="lead pt-3 content">Select Date</h4>
                                        <DatePicker
                                        className="text-center d-flex content content mb-3 pb-1"
                                        id="datepickertest"
                                        selected={props.startDate}
                                        onChange={(date) => {
                                            props.setStartDate(date)
                                            props.filterAfterDateOrWeek(date.toLocaleDateString("sv"), props.selectedWeek)
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
                                        <h4 className="lead pt-3 content">Select Week</h4>
                                        <Select options={props.weekOptions} onChange={props.handleWeekChange} className="text-dark text-center w-50 content mb-3"/>
                                        </div>
                                    ) : null
                                }
                                <Table className="content" responsive variant="dark" striped bordered hover>
                                <thead className="content">
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
                                    <tbody key={row.id} className="content">
                                    <tr key={row.id + 1}>
                                        <td key={row.id + 2}>{props.addProjectName(row.properties.Project.relation[0].id)}</td>
                                        <td key={row.id + 3}>{props.addPersonName(row.properties.Person.relation[0].id)}</td>
                                        <td key={row.id + 4}>{row.properties.Date.date.start}</td>
                                        <td key={row.id + 5}>{row.properties.Week.number}</td>
                                        <td key={row.id + 6}>{row.properties.Hours.number}</td>
                                    </tr>
                                    </tbody>
                                    ))
                                }
                                </Table>
                                Total hours reported: {props.timereport && props.getTotalHoursWorked(props.timereport)}
                    </div>

                    
                )
            }
        </div>
    )
}