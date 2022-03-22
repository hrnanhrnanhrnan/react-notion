import React from "react"
import {Button} from "react-bootstrap"
import Select from "react-select"

export const LoginComponent = (props) => {
    //Returns complete page with data from LoginContainer(props) and then mounts when called
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
                    <Select className="text-dark" options={props.options} onChange={props.handleChange} id="LoginBtn" />
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