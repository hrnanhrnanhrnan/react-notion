require("dotenv").config()
const express = require("express")
const {Client} = require("@notionhq/client")
const app = express()
const port = process.env.PORT || 5000

const notion = new Client({
    auth: process.env.NOTION_TOKEN
  })

app.listen(port, () => console.log(`Listening on port: ${port}`))

//Server endpoint
app.get("/get_database", async (req, res) => {
    const query = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID
    })

    // const list = query.results.map((row) => {
    //     //const projectNameCell = row.properties["ProjectName"]["title"][0]["text"]["content"]
    //     const statusCell = row.properties["Status"]["select"]["name"]
    //     const hoursCell = row.properties["Hours"]["number"]
    //     const workedHoursCell = row.properties["Worked Hours"]["rollup"]["number"]
    //     const hoursLeftCell = row.properties["Hours Left"]["formula"]["number"]
    //     const timespanCell = `${row.properties["TimeSpan"]["date"]["start"]} - ${row.properties["TimeSpan"]["date"]["end"]}`
    //     return {projectName: projectNameCell, status: statusCell, hours: hoursCell, workedHours: workedHoursCell, hoursLeft: hoursLeftCell, timespan: timespanCell}
    // })
    
    res.send(query.results)
})

//Server endpoint
app.get("/get_page", async (req, res) => {
    const page = await notion.pages.retrieve({
        page_id: process.env.NOTION_PAGE_ID
    })

    res.send(page)
})