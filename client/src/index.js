import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

const Index = () => {
  return (
    <App />
  )
}

ReactDOM.render(
  <React.StrictMode>
  <Index />
  </React.StrictMode>,
  document.getElementById('root')
);
