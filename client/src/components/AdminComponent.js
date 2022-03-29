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
                                <h4>Projectleader</h4>
                                <h4 className="pt-3 text-center">Select Project</h4> 
                                <Select options={props.projectOptions} onChange={props.handleProjectChange} className="text-dark text-center content"/>
                                <h4 className="pt-3 text-center">Select Week</h4>
                                <Select options={props.weekOptions} onChange={props.handleWeekChange} className="text-dark text-center content"/>
                                <Table className="content mt-3" responsive variant="dark" striped bordered hover>
                                <thead className="content">
                                    <tr>
                                    <th>Project</th>
                                    <th>Reported Time</th>
                                    <th>Hours left</th>
                                    </tr>
                                </thead>
                                {
                                    props.project?.map(row => (
                                    <tbody className="content" key={row.id}>
                                        <tr key={row.id + 1}>
                                            <td key={row.id + 2}>{row.properties.Projectname.title[0].plain_text}</td>
                                            <td key={row.id + 3}>{props.getReportedTime(row.id)}</td>
                                            <td key={row.id + 4}>{row.properties["Hours left"].formula.number}</td>
                                        </tr>
                                    </tbody>
                                    ))
                                }
                                </Table>

                                {
                                    props.timereportsOutOfSpan?.length > 0 ? (
                                        <>
                                        <h4>Projects out of span</h4>
                                        <Table className="content mt-3" responsive variant="dark" striped bordered hover>
                                <thead className="content">
                                    <tr>
                                    <th>Date</th>
                                    <th>Project</th>
                                    <th>Person</th>
                                    <th>Note</th>
                                    </tr>
                                </thead>
                                {
                                    props.timereportsOutOfSpan?.map(row => (
                                    <tbody className="content" key={row.id}>
                                        <tr key={row.id + 1}>
                                            <td key={row.id + 2}>{row.properties.Date.date.start}</td>
                                            <td key={row.id + 3}>{props.addProjectName(row?.properties.Project.relation[0].id)}</td>
                                            <td key={row.id + 4}>{props.addPersonName(row?.properties.Person.relation[0].id)}</td>
                                            <td key={row.id + 5}>{row?.properties.Note.title[0].plain_text}</td>
                                        </tr>
                                    </tbody>
                                    ))
                                }
                                </Table>
                                </>
                                    ) : (
                                        null
                                    )
                                }
                                

                    </div>

                    
                )
            }
        </div>
    )
}