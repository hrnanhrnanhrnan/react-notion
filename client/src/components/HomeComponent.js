import React from "react";

export const HomeComponent = (props) => {
    // takes in the username through props
    return (
        <div className="container-fluid flex-column text-white">
            <h1 className="display-1">Welcome {props.userName}</h1>
        </div>
    )
}