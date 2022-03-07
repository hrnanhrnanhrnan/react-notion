import React, { Component, useContext, useEffect, useState} from "react"
import Select from "react-select"
import { useFetch } from "../customHooks/UseFetch";
import { UserContext } from "../customHooks/UserContext";
import { useNavigate } from "react-router-dom";

export function LoginContainer() {
  const {data, isLoading, error} = useFetch("/get_users");
  const {value, setValue} = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState()
    console.log(data)

    const options = [
        {value: 1, label: 'Robin', authorized: false},
        {value: 2, label: 'Freddy', authorized: false}
    ]
    
    const handleChange = (person) =>{
        setSelectedUser(person)
    }

    let navigate = useNavigate();
    function routeChange() {
        let path = "/";
        navigate(path);
    }

    function onClickHandle() {
        return setValue(selectedUser);
    };

    return (
        <div className="container-fluid">
            <Select options={options} onChange={handleChange} />
            <button onClick={() => 
                {routeChange(); 
                onClickHandle();
                }}>login</button>
            
        </div>
    )
}