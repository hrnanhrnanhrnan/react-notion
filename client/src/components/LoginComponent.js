import React from "react"
import {Button} from "react-bootstrap"
import Select from "react-select"

export const LoginComponent = (props) => {
    return (
        <div id="login-container" className="container-fluid">
        {
            props.isLoading ? (
                <>
                    <div className="spinner-border text-muted">
                    </div>
                    <p>{props.error}</p>
                </>
            ) : (
                <>
                    <Select options={props.options} onChange={props.handleChange} />
                    <Button onClick={() => 
                    {props.routeChange(); 
                    props.onClickHandle();
                    }}>login</Button>
                </>
            )
        }
    </div>
    )
}