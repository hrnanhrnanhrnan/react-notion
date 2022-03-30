import { useEffect } from "react"
import { NavbarComponent } from "../components/NavbarComponent"
import { useAuth } from "../contexts/AuthContext"

export const NavbarContainer = (props) => {
  // takes in the auth context and the runs the updatetimereports in a useeffect 
  // to set the timereports out of date state in the auth context on reload
  const auth = useAuth()
  useEffect(() => {
    auth.updateTimeReports()
  }, [])
  //On logout click in Navbar, call logout in AuthContext
  const handleClick = () => {
    auth.logout()
  }

  //Mounts the navbarcomponent and sends in the handleclick eventhandler, 
  // the logo, the user and warnings of the amount of timereports to the component
    return (
      <NavbarComponent logo={props.logo} handleClick={handleClick} user={auth?.user} warnings={auth?.timereportsOutOfSpan}/>
    )
}