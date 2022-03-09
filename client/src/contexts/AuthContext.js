import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")))
    console.log(user)

    const login = (user) => {
        localStorage.setItem("userData", JSON.stringify(user));
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        localStorage.clear()
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}