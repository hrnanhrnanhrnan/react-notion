import React from "react";

export const HomeComponent = (props) => {
    return (
        <div className="container-fluid text-white">
            <h1 className="display-1">Welcome {props.userName}</h1>
        </div>
    )
}