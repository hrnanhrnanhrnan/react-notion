## GENERAL INFO:

The client folder contains everything React-related, ie Frontend.

server.js which is in the root folder (ie express-react-notion) is our server which will act as an intermediary in retrieving the data from the Notion api because we can not retrieve the data from the api directly from the frontend due to CORS.

We will therefore set up different endpoints on our server depending on which database action we want to do (download, update, etc ..).
From the front-end (ie the React app) we will then call on the various endpoints that are on our server.

Everything that is within "" in the description below is therefore the command or filename itself, and everything that is within '' is a string

## GETTING STARTED:

Note if things below do not work, you may need to run "npm install" in the client folder, and then test the steps below again.

1. Start by creating a ".env" file in the root folder. In that file, enter your Notion token, and ID of the database you want to call. It should look like this:

NOTION_TOKEN='HERE SHOULD YOUR NOTION TOKEN BE'
NOTION_PROJECTS_DATABASE_ID='HERE IS ID FOR THE NOTION PROJECTS DATABASE'
NOTION_PEOPLE_DATABASE_ID='HERE IS THE ID OF NOTION PEOPLE DATABASE'
NOTION_TIMEREPORT_DATABASE_ID='HERE IS THE ID OF NOTION TIMEREPORT DATABASE'
NOTION_MEMBERS_DATABASE_ID='HERE IS THE ID OF NOTION MEMBERS DATABASE'
NOTION_PAGE_ID='HERE IS THE ID OF NOTION PAGE'

2. Open a terminal in VSCODE. When you are in the root folder, type the command "npm run proxy". You will then receive a message in the terminal that says "Listening on port: 5000 ....." if everything works as it should.

3. You can now open a new terminal and from there navigate into the "client" folder. When you are in the "client" folder
   type the command "npm start" to start React.

4. If you want to shut down the server or React, just type Ctrl + C in each terminal and select "y" for "yes".

## IN THE EVENT OF CHANGES:

For changes in the React app or in the server, just save in VSCODE and update the browser to see the changes immediately.
Since the nodemon is installed for the server, it is sufficient to start the server via the command above and then all changes saved in the server will automatically restart the server. Again if you get "Listening on port 5000 ...." in the terminal then the server is up and running again

## IN THE EVENT OF ERROR MESSAGE "'react-scripts' is not recognized as an internal or external command, operable program or batch file":

Shut down the server and React and navigate to the client folder and run the command "npm install" and then try to restart server React as described above

## IN THE EVENT OF A BROWSER ERROR ON REACT START:

If an error should occur when you run the command "npm start" then try to just go to VSCODE and press ctrl + S in the package.json file in the client folder and then click down the error message in the browser and everything will work as it should again. If not, then another error has occurred and then I have no idea what it is (forward with Google and start searching)

## VID ERROR MESSAGE "Module not found: Error: Can't resolve 'react-router-dom' in ....":

Test run "npm install react-router-dom @ 6" in the client folder and repeat the above steps

## LIST OF PACKAGES:

- express (root folder)
- nodemon (root folder)
- react-router-dom @6 (client folder)
- moment (client folder)
- react-select (client folder)
- react-bootstrap (client folder)
- react-datepicker (client folder)
