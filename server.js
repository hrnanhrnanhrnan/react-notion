require("dotenv").config()
const express = require("express")
const {Client} = require("@notionhq/client")
const app = express()
const port = process.env.PORT || 5000

const notion = new Client({
    auth: process.env.NOTION_TOKEN
  })

app.listen(port, () => console.log(`...bitcoin-mining initialized on port: ${port}`))

//GET routes
//Server endpoint to get database sorted
app.get("/get_database", async (req, res) => {
    const query = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID
    })
    
    // const list = query.results.map((row) => {
    //     const projectName = row.properties.Projectname.title[0].text.content
    //     const status = row.properties.Status.select?.name
    //     const hours = row.properties.Hours.number
    //     const workedHours = row.properties["Worked hours"].number
    //     const hoursLeft = row.properties["Hours left"].formula.number
    //     const timespan = `${row.properties.Timespan.date?.start} - ${row.properties.Timespan.date?.end}`

    //     return {projectName, status, hours, workedHours, hoursLeft, timespan}
    // })

    res.send(query) 
})

//Freddy wuz her

app.get("/get_page", async (req, res) => {
    const page = await notion.pages.retrieve({
        page_id: process.env.NOTION_PAGE_ID
    })

    res.send(page)
})

app.get("/get_users", async (req, res) => {
    const users = await notion.users.list()
    res.send(users)
})




app.get("/get_database", async (req, res) => {
    const query = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID
    })

    res.send(query)
})



//POST routes



//PUT routes



//DELETE routes