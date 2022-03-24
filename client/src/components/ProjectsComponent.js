import React from "react";
import { Accordion } from "react-bootstrap";
import Select from "react-select"

export const ProjectsComponent = (props) => {
    //Gets data from the parent ProjectsContainer through props 
    //and then uses that data to display it to the screen when it is mounted

    return (
        <div className="container-fluid bg-dark" id="projectmenu">
            {
              props.isLoading ? (
                    <>
                        <div className="spinner-border text-muted">
                        </div>
                        <p>{props.error}</p>
                    </>
                ) : (
                    <div >
                    <h1 className="display-6">Select Project</h1>
                    <h4 className="lead pt-4">Select status</h4>
                    <Select options={props.statusOptions} onChange={props.handleStatusChange} className="text-dark position-top  content" />
                    <h4 className="lead pt-4">Select person</h4>
                    <Select options={props.personOptions} onChange={props.handlePersonChange} className="text-dark position-top content" />
                    <div className="w-100 content">
                        {
                            props.showProject.map((row) => (
                                <Accordion className="content text-dark">
                                    <Accordion.Item eventKey="0" className="w-100">
                                        <Accordion.Header>{row.properties.Projectname.title[0].text.content}</Accordion.Header>
                                        <Accordion.Body> <ul key={row.id + 2}>
                                                <li key={row.id + 3}>Status: {row.properties.Status.select?.name}</li>
                                                <li key={row.id + 4}>Hours: {row.properties.Hours.number}</li>
                                                <li key={row.id + 5}>Worked hours: {row.properties["Worked hours"].rollup.number}</li>
                                                <li key={row.id + 6}>Hours left: {row.properties["Hours left"].formula.number}</li>
                                                <li key={row.id + 7}>Timespan: {`${row.properties.Timespan.date?.start} - ${row.properties.Timespan?.date?.end}`}</li>
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