import {useFetch} from "../customHooks/UseFetch.js"
import { GetDataComponent } from "../components/GetDataComponent.js"
import {useState} from "react";

export const GetDataContainer = () => {
  //Calling custom hooks to set state of GetDataContainer
  //GetDataContainer takes care of all logic and then passes that logic to the GetDataComponent when it mounts
  const {data, isLoading, error} = useFetch("/get_database")
  const [showProject, setshowProject] = useState([]);
  const options = [
    {value: "All", label:"All"}
  ]

  !isLoading && (() => {
    const uniqueStatus = [...new Set(data.results.map(project => project.properties.Status.select.name)) ]
    for(var i = 0; i < uniqueStatus.length; i++) {
      options.push({value:uniqueStatus[i], label:uniqueStatus[i]})
    }
  })()

  const handleChange = (event) => {
    setshowProject(projectsToShow(event.value))
  }

  const projectsToShow = (status) => {
    if (status === "All") {
      return data.results
    } 
    
    return data.results.filter(project => project.properties.Status.select.name === status )
  }
  
 
  return (
     <GetDataComponent data={data} isLoading={isLoading} error={error} options={options} showProject={showProject} handleChange={handleChange}/>
  )
}

