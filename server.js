require("dotenv").config()
const express = require("express")
const {Client} = require("@notionhq/client")
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

const notion = new Client({
    auth: process.env.NOTION_TOKEN
  })

app.listen(port, () => console.log(`...bitcoin-mining initialized on port: ${port}`))

//GET routes
//Server endpoint to get database sorted
app.get("/get_projects", async (req, res) => {
    const query = await notion.databases.query({
        database_id: process.env.NOTION_PROJECTS_DATABASE_ID
    })

    res.send(query) 
})

//Freddy wuz her

app.get("/get_members", async(req, res) => {
    const query = await notion.databases.query({
        database_id: process.env.NOTION_MEMBERS_DATABASE_ID
    })

    res.send(query)
})

app.get("/get_timereports", async (req, res) => {
  const query = await notion.databases.query({
    database_id: process.env.NOTION_TIMEREPORT_DATABASE_ID
  })

  res.send(query)
})

//POST routes
//the endpoint which is called from the frontend and 
//everything that follow "/:" is parameters that we populate from the frontend 
//with variables from the form that is being submitted
//the values from the frontend can then be accessed through req.params and passed into the updateTimeReport method
//the endpoint then returns success or failure message back to the frontend
app.post("/timereports/:date/:personId/:hours/:projectId/:note/:weekNumber", async (req, res) => {
    let message = ""
    let ok = false
    try {
        await updateTimereports(req.params.date, req.params.personId, req.params.hours, req.params.projectId, req.params.note, req.params.weekNumber)
        return message = "Successfully mined some bitcoins!", ok = true
    }
    catch(error){
        return message = error.message
    }
    finally {
        res.send({ok, message})
    }
})

//PUT + PATCH routes
app.patch("/timereports/:hours/:projectId/:UserId/:date", async (req, res) => {
    let message = ""
    let ok = false
    try {
        await updateHours(req.params.hours, req.params.projectId, req.params.UserId, req.params.date)
        return message = "Successfully mined some Dogecoins!", ok = true
    }
    catch(error){
        return message = error.message
    }
    finally {
        res.send({ok, message}) 
    }
})


//DELETE routes


//Method to update the timereport database through notion API call
const updateTimereports = async (date, personId, hours, projectId, note, weekNumber) => {

    //sends the parameters from the method call to the api to create new database entry 
    await notion.pages.create({
        parent: {database_id: process.env.NOTION_TIMEREPORT_DATABASE_ID},
        properties: {
          Date: {
              date: {
                  start: date
              }
          },
          Person: {
              relation: [
                  {
                      id: personId
                  }
              ]
          },
          Hours: {
              number: parseInt(hours)
          },
          Week: {
              number: parseInt(weekNumber)
          },
          Project: {
              relation: [
                  {
                      id: projectId
                  }
              ]
          },
          Note: {
              title: [
                  {
                      text: {
                          content: note
                      }
                  }
              ]
          }
      }
      })
  }

  const updateHours =  async (hours, projectId, userId, date) => {
    await notion.pages.update({
        parent: {database_id: process.env.NOTION_TIMEREPORT_DATABASE_ID},
        page_id: projectId,
        properties: {
          Hours: {
              number: parseInt(hours)
          },
          ["Last edited by"]: {
            relation: [
                {
                    id: userId
                }
            ]
        },
            ["Last edited"]: {
                date: {
                    start: date
            }
        }
      }
      })
  }