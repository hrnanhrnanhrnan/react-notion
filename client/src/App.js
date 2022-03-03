import './style.css';
import {useState, useEffect} from "react"
import {Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useFetch } from './containers/UseFetch';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { GetData } from './containers/GetData';
import { NavBarContainer } from './containers/NavBarContainer';
import { HomeContainer } from './containers/HomeContainer';
import { TestContainer } from './containers/TestContainer';

export const App = (props) => {

  return (
    <Router>
      <NavBarContainer />
      <Routes>
        <Route path="/" element={<HomeContainer />}/>
        <Route path="/getdata" element={<GetData />}/>
        <Route path="/test" element={<TestContainer />}/>
      </Routes>
    </Router>

  )
}
