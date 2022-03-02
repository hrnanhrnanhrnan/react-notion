require("dotenv").config()
const express = require("express")
const {Client} = require("@notionhq/client")
const app = express()
const port = process.env.PORT || 5000

const notion = new Client({
    auth: process.env.NOTION_TOKEN
  })

app.listen(port, () => console.log(`Listening on port: ${port}`))

app.get("/get_database", async (req, res) => {
    const query = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID
    })
    
    res.send(query.results)
})

app.get("/get_page", async (req, res) => {
    const page = await notion.pages.retrieve({
        page_id: process.env.NOTION_PAGE_ID
    })

    res.send(page)
})