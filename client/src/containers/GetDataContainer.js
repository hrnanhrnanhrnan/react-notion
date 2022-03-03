import {useFetch} from "../customHooks/UseFetch.js"
import { GetDataComponent } from "../components/GetDataComponent.js"


export const GetDataContainer = () => {
  const {data, isLoading, error} = useFetch("/get_database")

  return (
    <GetDataComponent dataParam={data} loadingParam={isLoading} errorParam={error} />
  )
}

