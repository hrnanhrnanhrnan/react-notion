import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, Routes} from "react-router-dom"
import { ProjectsContainer } from './containers/ProjectsContainer';
import { NavbarContainer } from './containers/NavBarContainer';
import { HomeContainer } from './containers/HomeContainer';
import { TimeReportContainer } from './containers/TimeReportContainer';
import { ManagerContainer } from './containers/ManagerContainer';
import { ProjectleaderContainer } from './containers/ProjectleaderContainer';
import { AdminAuth } from './AdminAuth'
import { useFetch } from './customHooks/UseFetch';


export const App = () => {
  //fetches the page data from notion and sends in the logo icon emoji as a prop to the navbarcontainer
  const {data: logoData, isLoading: loadingLogo, error} = useFetch("/get_page")
  
  //Children of App, showing Navbar if logged in.
  return (
    <>
    {
      loadingLogo ? (
        <div className='container-fluid'>
          <div className="spinner-border text-muted">
          </div>
          <p>{error}</p>
        </div>
      ) : (
        <>
        <NavbarContainer logo={logoData.icon.emoji} />
        <Routes>
          <Route path="home" element={<HomeContainer />}/>
          <Route path="projects" element={<ProjectsContainer />}/>
          <Route path="timereport" element={<TimeReportContainer />}/>
          <Route path="manager" element={<AdminAuth><ManagerContainer /></AdminAuth>}/>
          <Route path="projectleader" element={<AdminAuth><ProjectleaderContainer /></AdminAuth>}/>
        </Routes>
        </>
      )
    }
    </>
  )
}
