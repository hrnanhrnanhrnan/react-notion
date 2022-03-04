import React, { Component, useContext, useState} from "react"
import Select from "react-select"
import { useFetch } from "../customHooks/UseFetch";
import { UserContext } from "../customHooks/UserContext";

export function LoginContainer() {
  const {data, isLoading, error} = useFetch("/get_users");
  console.log(data);
  const {value, setValue} = useContext(UserContext);
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
            <button onClick={() => {setValue(selectedUser)}}>login</button>
            
        </div>
    )
}