import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, Routes} from "react-router-dom"
import { ProjectsContainer } from './containers/ProjectsContainer';
import { NavbarContainer } from './containers/NavBarContainer';
import { HomeContainer } from './containers/HomeContainer';
import { TimeReportContainer } from './containers/TimeReportContainer';
import { AdminContainer } from './containers/AdminContainer';
import { TestContainer } from './containers/TestContainer';
import { AdminAuth } from './AdminAuth'


export const App = () => {
  //Children of App, showing Navbar if logged in.
  return (
    <>
    <NavbarContainer />
        <Routes>
          <Route path="home" element={<HomeContainer />}/>
          <Route path="projects" element={<ProjectsContainer />}/>
          <Route path="timereport" element={<TimeReportContainer />}/>
          <Route path="admin" element={<AdminAuth><AdminContainer /></AdminAuth>}/>
          <Route path="test" element={<AdminAuth><TestContainer /></AdminAuth>}/>
        </Routes>
        </>
  )
}
