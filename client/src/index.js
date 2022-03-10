import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { LoginContainer } from './containers/LoginContainer';
import { AuthProvider } from './contexts/AuthContext';
import { RequireAuth } from './RequireAuth';


const Index = () => {
  //Handling login, authorization from loginComponent/Container
  //If login is successfull you're pushed to the App component
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<LoginContainer />}/>
      <Route path='/*' element={<RequireAuth><App /></RequireAuth>} />
    </Routes>
    </AuthProvider>
  )
}

//Renders LoginContainer
ReactDOM.render(
  <React.StrictMode>
  <Router>
    <Index />
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
