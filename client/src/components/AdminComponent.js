import React from "react";
import Select from "react-select";
import { Accordion } from "react-bootstrap";

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
                    <div>
                    <h4 className="pt-3">Select Project</h4> 
                    <Select onChange={props.handleProjectChange} options={props.projectOptions} className="text-dark content"/>
                    <h4 className="pt-3">Select Person</h4> 
                    <Select onChange={props.handlePersonChange} options={props.userOptions} className="text-dark content"/>
                    <h4 className="pt-3">Select Week</h4> 
                    <Select onChange={props.handleWeekChange} options={props.weekOptions} className="text-dark content"/>
                    <div className="w-100 content">
                        {
                            props.timereport.map((element) => (
                                <Accordion key={element.id} className="text-dark content">
                                <Accordion.Item key={element.id + 1} eventKey="0" className="w-100">
                                <Accordion.Header key={element.id + 2}>{`${element.properties["Date"].date.start} => ${props.addProjectName(element.properties.Project.relation[0].id)}`}</Accordion.Header>
                                <Accordion.Body key={element.id + 3}>
                                <ul key={element.id + 4}>
                                    <li key={element.id + 5}>Create by: {props.addPersonName(element.properties.Person.relation[0].id)}</li>
                                    <li key={element.id + 6}>Hours: {element.properties.Hours.number}</li>
                                    <li key={element.id + 7}>Weeks: {element.properties.Week.number}</li>
                                    <li key={element.id + 8}>Note: {element.properties.Note.title[0].plain_text}</li>
                                    <li key={element.id + 9}>Worked Hours: {props.getHoursWorked(element.properties.Project.relation[0].id)}</li>
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