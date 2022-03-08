import React, { Component, useContext, useEffect, useState} from "react"
import Select from "react-select"
import { useFetch } from "../customHooks/UseFetch";
import { useNavigate } from "react-router-dom";
import {Button} from "react-bootstrap"
import {useAuth} from "../contexts/AuthContext"

export function LoginContainer() {
  const {data, isLoading, error} = useFetch("/get_users");
    const [selectedUser, setSelectedUser] = useState("")
    const auth = useAuth()
    const navigate = useNavigate();

    const options = [
        {value: 1, label: 'Owner'},
        {value: 2, label: 'Projectleader'}
    ]

    console.log(auth.storedUser)

    const handleChange = (person) =>{
        setSelectedUser(person)
    }

    !isLoading && (() => {
        const realUsers = data.results.filter((user) => user.type !== "bot")
        realUsers.map((user) => options.push({value: user.id, label: user.name}))
    })()

    
    function routeChange() {
        let path = "home";
        navigate(path);
    }

    function onClickHandle() {
        auth.login(selectedUser)
        //document.cookie = `userId=${selectedUser.value};`
    };

    return (
        <div id="login-container" className="container-fluid">

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