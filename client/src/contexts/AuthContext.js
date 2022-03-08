import { useState, createContext, useContext } from "react";
import {withCookies, Cookies, useCookies, CookiesProvider} from "react-cookie"

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [storedUser, setStoredUser] = useState(localStorage.getItem("user"))
    const [user, setUser] = useState(null)

    console.log(localStorage.getItem("user"))

    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        localStorage.clear()
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
        <CookiesProvider>
            {children}
        </CookiesProvider>
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}