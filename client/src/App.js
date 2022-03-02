import './App.css';
import {useState, useEffect} from "react"
import {Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

export const App = () => {

  return (
    <div className="App container-fluid text-center bg-dark">
        <Button className='' onClick={async () => {
          const res = await fetch("/get_database")
          const jsonRes = await res.json()
          console.log(jsonRes)
        }}>Hämta databas</Button>

        <Button className='data-btn m-2' onClick={async () => {
          const res = await fetch("/get_page")
          const jsonRes = await res.json()
          console.log(jsonRes)
        }}>Hämta sida</Button>
        </div>
  )
}
