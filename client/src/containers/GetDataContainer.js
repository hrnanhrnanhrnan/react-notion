import {useFetch} from "../customHooks/UseFetch.js"
import { GetDataComponent } from "../components/GetDataComponent.js"


export const GetDataContainer = () => {
  //Calling custom hooks to set state of GetDataContainer
  //GetDataContainer takes care of all logic and then passes that logic to the GetDataComponent when it mounts
  const {data, isLoading, error} = useFetch("/get_database")

  return (
    <GetDataComponent dataParam={data} loadingParam={isLoading} errorParam={error} />
  )
}

