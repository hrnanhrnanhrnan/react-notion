import React, { useState} from "react"
import { useFetch } from "../customHooks/UseFetch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import { LoginComponent } from "../components/LoginComponent";

export function LoginContainer() {
    const {data, isLoading, error} = useFetch("/get_members"); //Custom hook to get data from Notion through Express server
    const [selectedUser, setSelectedUser] = useState(null) //State of selected user, default null
    const auth = useAuth() 
    const navigate = useNavigate();
    const options = [] //empty

    //Sets person state, to user selected from dropdown menu
    const handleChange = (person) =>{
        setSelectedUser(person)
    }

    //If it's done fetching from Notion, add users to dropdown menu
    !isLoading && (() => {
        data.results.map((user) => options.push({value: user.id, label: user.properties.Name.title[0].plain_text, adminAuthorized: isAdmin(user)}))
        console.log(data.results)
    })()

    //Checks if Authorization is true, sets boolean to true or false
    function isAdmin(user){
        if(user?.properties?.Authorized?.rich_text[0]?.plain_text === "true"){
            return true
        } else {
            return false
        }
    }

    //Sends user to home page upon login
    function routeChange() {
        let path = "home";
        navigate(path);
    }

    //Sends user to AuthContext for authorization
    function onClickHandle() {
        auth.login(selectedUser)
    };

    //Returns data to LoginComponent for display correctly
    return (
        <LoginComponent isLoading={isLoading} error={error} options={options}
         handleChange={handleChange} routeChange={routeChange} onClickHandle={onClickHandle} />
    )
}