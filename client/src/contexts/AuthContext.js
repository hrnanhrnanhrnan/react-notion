import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    //Gets user from localStorage as state, null if not logged in
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")))

    //Adds user to localStorage JSON file. Then sets user in state
    const login = (user) => {
        localStorage.setItem("userData", JSON.stringify(user));
        isAdminAuth(user)
        setUser(user)
    }

    //Clears user logged in from localStorage/state
    const logout = () => {
        setUser(null)
        localStorage.clear()
    }

    const isAdminAuth = (user) => {
        if(user.adminAuthorized === "true"){
            user.adminAuthorized = true
        } else {
            user.adminAuthorized = false
        }
    }
    
    //Returns value to authorize user to continue after login
    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

//Returns context with userData through AuthContext.Provider
export const useAuth = () => {
    return useContext(AuthContext)
}