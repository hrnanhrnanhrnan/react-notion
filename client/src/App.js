import './style.css';
import {useState, useEffect} from "react"
import {Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useFetch } from './containers/UseFetch';

export const App = () => {

  return (
    <div className="App container-fluid text-center bg-dark">
        <Button className='data-btn' onClick={async () => {
          const response = await fetch("/get_database")
          const jsonResponse = await response.json()
          console.log(jsonResponse)
        }}>Hämta databas</Button>

        <Button className='data-btn btn-secondary' onClick={async () => {
          const response = await fetch("/get_page")
          const jsonResponse = await response.json()
          console.log(jsonResponse)
        }}>Hämta sida</Button>
        </div>
  )
}
