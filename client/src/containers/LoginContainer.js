import React, { Component} from "react"
import Select from "react-select"

export const LoginContainer = () => {

    const options = [
        {value: 'Robin', label: 'Robin'},
        {value: 'Freddy', label: 'Freddy'}
    ]

    return (
        <div className="container-fluid">
            <Select options={options} />
        </div>
    )
}