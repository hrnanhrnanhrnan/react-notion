import { NavbarComponent } from "../components/NavbarComponent"
import { useAuth } from "../contexts/AuthContext"

export const NavbarContainer = (props) => {
  const auth = useAuth()
  //On logout click in Navbar, call logout in AuthContext
  const handleClick = () => {
    auth.logout()
  }

  //Mounts the navbarcomponent and sends in the handleclick eventhandler and the logo
    return (
      <NavbarComponent logo={props.logo} handleClick={handleClick} user={auth?.user}/>
    )
}