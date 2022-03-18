export const postRequest = async (url) => {
    const res = await fetch(url, {method: "POST"})
    .then((response) => {
        if (response.ok) {
            return response.json()
        }
        throw new Error("Could not fetch the data...")
    })
    .catch((error) => {
        return error.message
    })
    return res
}