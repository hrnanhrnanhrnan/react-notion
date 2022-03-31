import { useState, createContext, useContext, useEffect } from "react";
import { useFetch } from "../customHooks/UseFetch";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    //Gets user from localStorage as state, null if not logged in
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")))
    const [timereportsOutOfSpan, setTimereportsOutOfSpan] = useState([])
    const {data: projects, isLoading: loadingProjects} = useFetch("/get_projects")
    
    //Adds user to localStorage JSON file. Then sets user in state
    const login = (user) => {
        localStorage.setItem("userData", JSON.stringify(user));
        setUser(user)
        updateTimeReports()
    }

    //Clears user logged in from localStorage/state
    const logout = () => {
        setUser(null)
        localStorage.clear()
    }

    //Method to get the timereports that are out of the timespan and update the contexts state
    const updateTimeReports = async () => {
        const timereports = []
        await fetch("/get_timereports")
        .then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonResponse => {
            // loop through the timereports from the fetch and if the date of the timereports
            // is lower or bigger than the corresponding timespan from the project to which the 
            // timereport is reported to then it will get pushed to the timereports array which is then set as state
            try{
                for(let idx = 0; idx < jsonResponse.results.length; idx++){
                    if((new Date(jsonResponse.results[idx].properties["Date"].date.start) > 
                        new Date(projects.results.filter(row => row.id === jsonResponse.results[idx].properties.Project.relation[0].id)[0].properties.Timespan.date.end))
                        || 
                        (new Date(jsonResponse.results[idx].properties["Date"].date.start) < 
                        new Date(projects.results.filter(row => row.id === jsonResponse.results[idx].properties.Project.relation[0].id)[0].properties.Timespan.date.start))) {
                        timereports.push(jsonResponse.results[idx])
                    }
                }
                setTimereportsOutOfSpan(timereports)
            }
            catch (error) {
                throw new Error(error)
            }
        }).catch(error => {
            console.log(error)
        })
    }
        
    //Returns value to authorize user to continue after login, as well as the 
    return (
        !loadingProjects && <AuthContext.Provider value={{user, timereportsOutOfSpan, updateTimeReports, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

//Returns context with userData through AuthContext.Provider
export const useAuth = () => {
    return useContext(AuthContext)
}