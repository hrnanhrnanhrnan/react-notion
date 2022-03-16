import React from "react";
import Select from "react-select";

export const AdminComponent = (props) => {

    //SHOW ME WHAT YOU GOT!

    return (
        <div className="container-fluid">
            <Select options={props.userOptions}/>
            <Select options={props.projectOptions}/>
        </div>
    )
}