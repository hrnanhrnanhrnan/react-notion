import { NavbarComponent } from "../components/NavbarComponent"
import { useAuth } from "../contexts/AuthContext"

export const NavbarContainer = () => {
  const auth = useAuth()

  //On logout click in Navbar, call logout in AuthContext
  const handleClick = () => {
    auth.logout()
  }

  //Mounts the navbarcomponent and sends in the handleclick eventhandler
    return (
      <NavbarComponent handleClick={handleClick} />
    )
}