import React from "react";
import { Accordion } from "react-bootstrap";
import Select from "react-select"

export const ProjectsComponent = (props) => {
    //Gets data from the parent ProjectsContainer through props 
    //and then uses that data to display it to the screen when it is mounted

    return (
        <div className="container-fluid bg-dark" id="projectmenu">
            {
              !props.loaded ? (
                    <>
                        <div className="spinner-border text-muted">
                        </div>
                        <p>{props.error}</p>
                    </>
                ) : (
                    <div >
                    <h1 className="display-6">Select Project</h1>
                    <h4 className="lead pt-4">Select status</h4>
                    <Select aria-label="dropdown menu to select project status" options={props.statusOptions} onChange={props.handleStatusChange} className="text-dark position-top content" />
                    <h4 className="lead pt-4">Select person</h4>
                    <Select aria-label= "dropdown menu to select project and person" options={props.personOptions} onChange={props.handlePersonChange} className="text-dark position-top content" />
                    <div className="w-100 content">
                        {
                            props.showProject.map((row) => (
                                <Accordion key={row.id} className="content text-dark">
                                    <Accordion.Item key={row.id + 1} eventKey="0" className="w-100">
                                        <Accordion.Header key={row.id + 2}>{row.properties.Projectname.title[0].text.content}</Accordion.Header>
                                        <Accordion.Body  key={row.id + 3}> <ul key={row.id + 4}  >
                                                <li key={row.id + 5}>Status: {row.properties.Status.select?.name}</li>
                                                <li key={row.id + 6}>Hours: {row.properties.Hours.number}</li>
                                                <li key={row.id + 7}>Worked hours: {row.properties["Worked hours"].rollup.number}</li>
                                                <li key={row.id + 8}>Hours left: {row.properties["Hours left"].formula.number}</li>
                                                <li key={row.id + 9}>Timespan: {row.properties.Timespan.date.end ? `${row.properties.Timespan.date?.start} - ${row.properties.Timespan?.date?.end}` : `${row.properties.Timespan.date?.start} - ongoing`}</li>
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