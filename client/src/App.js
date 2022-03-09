import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { GetDataContainer } from './containers/GetDataContainer';
import { NavBarContainer } from './containers/NavBarContainer';
import { HomeContainer } from './containers/HomeContainer';
import { TestContainer } from './containers/TestContainer';

export const App = (props) => {
  
  //Children of App, showing Navbar if logged in.
  return (
    <>
    <NavBarContainer />
        <Routes>
          <Route path="home" element={<HomeContainer />}/>
          <Route path="projects" element={<GetDataContainer />}/>
          <Route path="test" element={<TestContainer />}/>
        </Routes>
        </>
  )
}
