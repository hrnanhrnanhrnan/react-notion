import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export const RequireAuth = ({children}) => {
    const auth = useAuth()

    //If user is not logged in, return to login page.
    if (!auth.user) {
        return <Navigate to="/" />
    }

    return children
}