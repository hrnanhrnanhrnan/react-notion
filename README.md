INFO:
Client-foldern innehåller allt React-relaterat, dvs Frontend.

server.js som ligger i root-foldern (alltså express-react-notion) är vår server som kommer att agera en mellanhand i att hämta datan från Notion api'et eftersom vi inte kan hämta datan från api direkt från frontend pga CORS.

Vi kommer därför att sätta upp olika endpoints på vår server beroende på vilken databas-action vi vill göra (hämta, uppdatera osv..).
Från front-end (dvs React-appen) kommer vi sedan att kalla på de olika endpointsen som finns på vår server.

Allt som står inom "" i nedan beskrivning är alltså själva kommandot eller filnamnet, och allt som står inom '' är en sträng

KOMMA IGÅNG:

Notera om nedan saker inte fungerar så kan det vara så att ni måste köra "npm install" i client foldern, och testa sedan nedan steg igen.

1. Börja med att skapa en ".env" fil i root foldern. I den filen lägger du in din Notion token, och id till den databas som du vill kalla på. Den ska se ut såhär:

NOTION_TOKEN='HÄR SKA DIN NOTION TOKEN FINNAS'
NOTION_DATABASE_ID='HÄR SKA ID FINNAS TILL DEN DATABAS DU VILL KALLA PÅ'
NOTION_PAGE_ID='HÄR SKA ID FINNAS TILL DEN SIDA DU VILL KALLA PÅ'

2. Öppna en terminal i VSCODE. När du står i root foldern skriv kommandot "npm run proxy". Du ska då få ett meddelande i terminalen där det står "Listening on port: 5000" om allt fungerar som det ska.

3. Nu kan du öppna en ny terminal och därifrån navigerar du in i "client" foldern. När du står i "client" foldern
   skriv kommandot "npm start" för att starta React. I browsern öppna konsolen. Klicka på "Hämta data" på React hemsidan och om allt går som det ska så kan du då se datan i konsolen.

4. Om ni vill stänga ned servern eller React så är det bara att skriva Ctrl + C i respektive terminal och välja "y" för "yes".

VID ÄNDRINGAR:
Vid ändringar i React-appen eller i servern så är det bara att spara i VSCODE och uppdatera browsern för att se ändringarna direkt.
Eftersom nodemon är installerat för servern så räcker det att starta igång servern via kommandot ovan och därefter så kommer alla ändringar som sparas i servern att automatiskt starta om servern. Återigen om ni får "Listening on port 5000" i terminalen så är servern up and running igen

VID FELMEDDELANDE "'react-scripts' is not recognized as an internal or external command, operable program or batch file":
Stäng ned servern och React och navigera till client-foldern och kör kommandot "npm install" och testa sedan att starta server React på nytt enligt ovan beskrivningar

VID FELMEDDELANDE I BROWSERN PÅ REACT-START:
Om något fel skulle uppstå när du kör kommandot "npm start" så testa att bara gå in på VSCODE och tryck på ctrl + S i package.json filen i client-foldern och därefter klicka ned felmeddelandet i browsern så ska allting funka som det ska igen. Gör det inte det så har något annat fel inträffat och då har jag ingen koll på vad det är (fram med Google och börja leta)

VID FELMEDDELANDE "Module not found: Error: Can't resolve 'react-router-dom' in ....":
Testa kör "npm install react-router-dom@6" client-foldern och upprepa ovan 1-2

FÖR ATT JOBBA MED GIT OCH GITHUB:

För att ta hem repositoryt:

1. Med hjälp av terminalen navigera in i den foldern där du vill att projektet (repositoryt) ska ligga
2. Kör kommandot "git clone hrnanhrnanhrnan/react-notion" (det här clonar github repositoryt till din folder på din dator)
3. Navigera sedan in i repository-foldern med hjälp av terminalen
4. När du står i repo-foldern kör kommandot "git remote add origin https://github.com/hrnanhrnanhrnan/react-notion.git"

För att jobba med synkning mot repositoryt:
Alla git-kommandon ska utföras från root foldern (\react-notion)

1. Kör kommandot "git pull" (ska alltid köras först för att ta hem ändringar innan man addar, commitar, och pushar)
2. "git add -A" (för att lägga till alla ändrade filer)
3. "git commit -m 'MEDDELANDE' (för att commita ändringar)
4. "git push origin main" (för att pusha ändringar till remote repositoryt)
