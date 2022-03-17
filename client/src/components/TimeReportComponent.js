import { Button, Form } from "react-bootstrap";
import Select from "react-select"

export const TimeReportComponent = (props) => {
    return (
        <div className="container-fluid bg-dark text-white text-center" >
        <Form onSubmit={props.handleSubmit} id="test">
        <Form.Group className="mb-5 text-white" controlId="formBasic" >
            <Form.Label>Date: </Form.Label>
                <Form.Control  
                    className="text-center"
                    placeholder="yyyy-mm-dd"
                    type="text" 
                    name="date" 
                    value={props.inputs.date || ""} 
                    onChange={props.handleChange}
                />
            <Form.Label>Hours: </Form.Label>
                <Form.Control 
                    className="text-center"
                    placeholder="0"
                    type="number" 
                    name="hours" 
                    value={props.inputs.hours || ""} 
                    onChange={props.handleChange}
                />
            <Form.Label>Project: </Form.Label>
                
                <Select options={props.options} onChange={props.handleDropmenu} className="text-dark"/>
    
            <Form.Label>Note: </Form.Label>
                <Form.Control 
                    placeholder="Comment"
                    as="textarea"
                    name="note" 
                    value={props.inputs.note || ""} 
                    onChange={props.handleChange}
                />
                <Button variant="primary" type="submit" className="submitButton">Submit</Button>
                
        </Form.Group>
        </Form>
        </div>
        )
}