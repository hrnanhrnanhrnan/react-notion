export const putRequest = async (url) => {
    const res = await fetch(url, {method: "PATCH", headers: {

        Accept: 'application/json',
        
        'Notion-Version': '2022-02-22',
        
        'Content-Type': 'application/json'
        
        }})
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