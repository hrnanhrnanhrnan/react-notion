import './style.css';
import {useState, useEffect} from "react"
import {Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { GetDataContainer } from './containers/GetDataContainer';
import { NavBarContainer } from './containers/NavBarContainer';
import { HomeContainer } from './containers/HomeContainer';
import { TestContainer } from './containers/TestContainer';
import { LoginContainer } from './containers/LoginContainer';
import { UserContext } from './customHooks/UserContext';

export const App = (props) => {
  const [value, setValue] = useState('hello from context');

  return (
    <UserContext.Provider value={{value, setValue}}>
    <Router>
      <NavBarContainer />
        <Routes>
          <Route path="/" element={<LoginContainer />}/>
          <Route path="/home" element={<HomeContainer />}/>
          <Route path="/projects" element={<GetDataContainer />}/>
          <Route path="/test" element={<TestContainer />}/>
        </Routes>
    </Router>
    </UserContext.Provider>
  )
}
