import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { LoginContainer } from './containers/LoginContainer';
import { AuthProvider } from './contexts/AuthContext';
import { RequireAuth } from './RequireAuth';


const Index = () => {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<LoginContainer />}/>
      <Route path='/*' element={<RequireAuth><App /></RequireAuth>} />
    </Routes>
    </AuthProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
  <Router>
    <Index />
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
