import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, Routes} from "react-router-dom"
import { GetDataContainer } from './containers/GetDataContainer';
import { NavbarContainer } from './containers/NavBarContainer';
import { HomeContainer } from './containers/HomeContainer';
import { TestContainer } from './containers/TestContainer';
import { AdminContainer } from './containers/AdminContainer';
import { AdminAuth } from './AdminAuth'


export const App = () => {
  //Children of App, showing Navbar if logged in.
  return (
    <>
    <NavbarContainer />
        <Routes>
          <Route path="home" element={<HomeContainer />}/>
          <Route path="projects" element={<GetDataContainer />}/>
          <Route path="test" element={<TestContainer />}/>
          <Route path="admin" element={<AdminAuth><AdminContainer /></AdminAuth>}/>
        </Routes>
        </>
  )
}
