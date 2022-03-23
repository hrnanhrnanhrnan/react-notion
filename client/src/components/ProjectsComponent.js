import React from "react";
import Select from "react-select"
import {Accordion} from "react-bootstrap"

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
                        <h1 className="display-3">Projects</h1>
                        <div>
                            <h4 className="lead">Select status</h4>
                            <Select options={props.statusOptions} onChange={props.handleStatusChange} className="text-dark position-top" />
                            <h4 className="lead">Select person</h4>
                            <Select options={props.personOptions} onChange={props.handlePersonChange} className="text-dark position-top" />
                        </div>
                        <div>
                                {
                                    props.showProject.map((row) => (
                                        <Accordion className="text-dark content">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>{row.properties.Projectname.title[0].text.content}</Accordion.Header>
                                                <Accordion.Body>
                                                    <ul key={row.id + 1}>
                                                        <li key={row.id + 2}>Status: {row.properties.Status.select?.name}</li>
                                                        <li key={row.id + 3}>Hours: {row.properties.Hours.number}</li>
                                                        <li key={row.id + 4}>Worked hours: {row.properties["Worked hours"].rollup.number}</li>
                                                        <li key={row.id + 5}>Hours left: {row.properties["Hours left"].formula.number}</li>
                                                        <li key={row.id + 6}>Timespan: {`${row.properties.Timespan.date?.start} - ${row.properties.Timespan?.date?.end}`}</li>
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