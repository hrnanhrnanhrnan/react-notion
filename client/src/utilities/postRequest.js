export const postRequest = async (url) => {
    let response = {}
    await fetch(url, {method: "POST"})
    .then((response) => {
        if (response.ok) {
            return response.json()
        }
        throw new Error("Could not fetch the data...")
    })
    .then((jsonResponse) => {
        response = jsonResponse
    })
    .catch((error) => {
        response = error
    })
    return response
}