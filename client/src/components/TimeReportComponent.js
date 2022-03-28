import { Button, Form } from "react-bootstrap";
import Select from "react-select"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import sv from "date-fns/locale/sv";
registerLocale("sv", sv);

export const TimeReportComponent = (props) => {
    return (
        <div className="container-fluid bg-dark text-white text-center" >
        {
            !props.loaded ? (
                <>
                    <div className="spinner-border text-muted">
                    </div>
                    <p>{props.error}</p>
                </>
            ) : (
                <Form onSubmit={props.handleSubmit} id="test">
                    <Form.Group className="mb-5 text-white" controlId="formBasic" >
                        <Form.Label>Date: </Form.Label>
                            <DatePicker
                                className="text-center w-100"
                                id="datepickertest"
                                selected={props.startDate}
                                onChange={(date) => props.setStartDate(date)}
                                locale="sv"
                                showWeekNumbers
                                dateFormat={"yyyy/MM/dd"}
                                strictParsing
                                todayButton="Today"
                            />
                        <Form.Label>Hours: </Form.Label>
                            <Form.Control 
                                className="text-center"
                                placeholder="0"
                                type="number" 
                                name="hours" 
                                value={props.inputs.hours || ""} 
                                onChange={props.handleChange}
                                required
                            />
                        <Form.Label>Project: </Form.Label>
                        
                        <Select options={props.options} onChange={props.handleDropmenu} required className="text-dark"/>
            
                        <Form.Label>Note: </Form.Label>
                            <Form.Control 
                                placeholder="Comment"
                                as="textarea"
                                name="note" 
                                value={props.inputs.note || ""} 
                                onChange={props.handleChange}
                                required
                                maxLength={100}
                            />
                        <Button disabled={props.requiredFieldsNotFilledOut()} variant="primary" type="submit" className="submitButton">Submit</Button>
                    </Form.Group>
                </Form>
            )
        }


        </div>
        )
}