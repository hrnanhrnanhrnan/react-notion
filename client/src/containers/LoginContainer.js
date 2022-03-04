import React, { Component, useState} from "react"
import Select from "react-select"

export const LoginContainer = () => {

    const [selectedUser, setSelectedUser] = useState()

    const options = [
        {value: 1, label: 'Robin', authorized: true},
        {value: 2, label: 'Freddy', authorized: true}
    ]
    
    const handleChange = (person) =>{
        setSelectedUser(person)
    }

    return (
        <div className="container-fluid">
            <Select options={options} onChange={handleChange} />
            <button onClick={
                console.log(selectedUser)
                
            }>login</button>
        </div>
        
    )
}