import React, { Component, useContext, useEffect, useState} from "react"
import Select from "react-select"
import { useFetch } from "../customHooks/UseFetch";
import { UserContext } from "../customHooks/UserContext";
import { useNavigate } from "react-router-dom";
import {Button} from "react-bootstrap"

export function LoginContainer() {
  const {data, isLoading, error} = useFetch("/get_users");
  const {value, setValue} = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState()


    const options = [
        {value: 1, label: 'Owner', authorized: false},
        {value: 2, label: 'Projectleader', authorized: false},
        {value: 3, label: 'User', authorized: false}
    ]

    const handleChange = (person) =>{
        setSelectedUser(person)
    }

    !isLoading && (() => {
        const realUsers = data.results.filter((user) => user.type !== "bot")
        realUsers.map((user) => options.push({value: user.id, label: user.name, authorized: false}))
    })()

    let navigate = useNavigate();
    function routeChange() {
        let path = "/home";
        navigate(path);
    }

    function onClickHandle() {
        return setValue(selectedUser);
    };
    //Hejhej
    
    return (
        <div className="container-fluid">

            {
                isLoading ? (
                    <>
                        <div className="spinner-border text-muted">
                        </div>
                        <p>{error}</p>
                    </>
                ) : (
                    <>
                    <Select options={options} onChange={handleChange} />
                        <Button onClick={() => 
                        {routeChange(); 
                        onClickHandle();
                        }}>login</Button>
                        </>
                )
            }

        </div>
    )
}