import { Button, Form } from "react-bootstrap";
import Select from "react-select"
import {Table, Dropdown} from "react-bootstrap"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import sv from "date-fns/locale/sv";
registerLocale("sv", sv);

export const ProjectleaderComponent = (props) => {
return (
    <div className="container-fluid-test bg-dark text-white" >
        <div className="container-fluid-test1 bg-dark text-white">
            <Select options={props.options} onChange={props.handleDropmenu} className="text-dark position-top text-center" id="test"/>
            {
                props.showProject.map((project) => ( 
                    <ul key={project.id + 1}>
                    <li key={project.id + 2}> Name: {project.properties.Projectname.title[0].plain_text} </li>
                    <li key={project.id + 3}> Hours: {project.properties.Hours.number} </li>
                    <li key={project.id + 4}> Timespan: {
                        (function () {                               
                            if (new Date(project.properties.Timespan?.date?.end) < new Date()) {
                                return <strong className="text-danger">{`${project.properties.Timespan.date?.start} - ${project.properties.Timespan?.date?.end}`}<br />Project has passed its end date.</strong>;
                            } else {
                                return <>{`${project.properties.Timespan.date?.start} - ${project.properties.Timespan?.date?.end}`}</>;
                            }
                            })()                           
                        } </li>
                    </ul>                                             
                ))                   
            }
        </div>
        <div className="container-fluid-test2 bg-dark text-white">
            <Form onSubmit={props.handleSubmit} id="test">
                <Form.Group className="mb-5 text-white" controlId="hourTest" >
                    <Form.Label>Hours: </Form.Label>
                        <Form.Control 
                            className="text-center"
                            placeholder="0"
                            type="number" 
                            name="hours" 
                            value={props.inputs.hours || "" } 
                            onChange={props.handleChange}
                            required
                        />
                    <Button variant="primary" type="submit" className="submitButton">Change Hours</Button>
                </Form.Group>
            </Form>
            <Form onSubmit={props.handleSubmitDate} id="test" >
                <Form.Group className="mb-5 text-white" controlId="dateTest" >
                    <Form.Label>Date: </Form.Label>
                        <DatePicker 
                            className="text-center w-100"
                            id="datepickertest"
                            selected={props.endDate}
                            onChange={(date) => props.setEndDate(date)}
                            locale="sv"
                            showWeekNumbers
                            dateFormat={"yyyy-MM-dd"}
                            strictParsing
                            todayButton="Today"
                        />
                    <Button variant="primary" type="submit" className="submitButton">Change Date</Button>
                </Form.Group>
            </Form>
        </div>
        {
                !props.loadedData ? (
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