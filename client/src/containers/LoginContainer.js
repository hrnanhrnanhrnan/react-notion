import React, { useState} from "react"
import { useFetch } from "../customHooks/UseFetch";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../contexts/AuthContext"
import { LoginComponent } from "../components/LoginComponent";

export function LoginContainer() {
  const {data, isLoading, error} = useFetch("/get_users");
    const [selectedUser, setSelectedUser] = useState("")
    const auth = useAuth()
    const navigate = useNavigate();

    const options = [
        {value: 1, label: 'Owner'},
        {value: 2, label: 'Projectleader'}
    ]
    
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
    };

    return (
        <LoginComponent isLoading={isLoading} error={error} options={options}
         handleChange={handleChange} routeChange={routeChange} onClickHandle={onClickHandle} />
    )
}