import {useEffect, useState} from "react";

//Custom hook to fetch data from the servers endpoints by passing the url for the specific endpoint
export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        let isMounted = true

        fetch(url)
        .then((response) => {
            if (response.ok && isMounted) {
                return response.json()
            }
            throw new Error("Could not fetch the data...")
        })
        .then((jsonResponse) => {
            setData(jsonResponse)
            setIsLoading(false)
        })
        .catch((error) => {
            setError(error.message)
        })

        return () => {
            isMounted = false
        }
        
    }, [url])

    return {data, isLoading, error}
}