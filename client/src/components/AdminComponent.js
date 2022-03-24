import React from "react";
import Select from "react-select";
import { Accordion } from "react-bootstrap";

export const AdminComponent = (props) => {
    console.log(props.timereport)
    //SHOW ME WHAT YOU GOT!
    return (
        <div className="container-fluid text-white">
            {
                props.isLoadingUsers && props.isLoadingProjects && props.isLoadingTimereports ? (
                    <>
                        <div className="spinner-border text-muted">
                        </div>
                        <p>{props.error}</p>
                    </>
                ) : (
                    <div>
                    <h4 className="pt-3">Select Project</h4> 
                    <Select onChange={props.handleProjectChange} options={props.projectOptions} className="text-dark content"/>
                    <h4 className="pt-3">Select Person</h4> 
                    <Select onChange={props.handlePersonChange} options={props.userOptions} className="text-dark content"/>
                    <div className="w-100 content">
                        {
                            props.timereport.map((element) => (
                                <Accordion className="text-dark">
                                <Accordion.Item eventKey="0" className="w-100">
                                <Accordion.Header>{`${element.properties["Date"].date.start} => ${props.addProjectName(element.properties.Project.relation[0].id)}`}</Accordion.Header>
                                <Accordion.Body>
                                <ul key={element.id + 1}>
                                    <li key={element.id + 2}>Create by: {props.addPersonName(element.properties.Person.relation[0].id)}</li>
                                    <li key={element.id + 3}>Hours: {element.properties.Hours.number}</li>
                                    <li key={element.id + 4}>Weeks: {element.properties.Week.number}</li>
                                    <li key={element.id + 5}>Note: {element.properties.Note.title[0].plain_text}</li>
                                    <li key={element.id + 6}>Worked Hours: {props.getHoursWorked(element.properties.Project.relation[0].id)}</li>
                                </ul>
                                </Accordion.Body>
                                </Accordion.Item>
                                </Accordion>
                            ))
                        }
                        </div>
                    </div>
                )
            }
        </div>
    )
}