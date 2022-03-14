import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export const AdminAuth = ({children}) => {
    const auth = useAuth()

    if(auth.user.adminAuthorized){
        return children
    } else {
        alert("You do not have access to this page, LEAVE MORTAL!")
        return <Navigate to="/home" />
    }
}