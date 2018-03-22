# Science from Scientists

This full-stack web application’s purpose is to allow easy management and maintenance of education modules for Science from Scientists, as well as to create streamlined shopping lists for components of the educational modules.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
This software is required to install this application.
- [Node.js](https://nodejs.org/en/)
- [Postico](https://eggerapps.at/postico/)

## Installing 
1. Download this project.
2. Start PostreSQL, add a database called "sciencefromscientists", then run the project `database.sql` file. 
3. `npm install`
4. Create a `.env` 
    a. Add `SERVER_SESSION_SECRET = ` and a random string
    b. Also, add `DEFAULTPASSWORD=Welcome1` 
5. `npm start`

### Build scss files into CSS
1. To build scss file changes, run `npm run build-css`
2. To watch scss file changes, run `npm run watch-css`

## Built With
- Node.js
- PostgreSQL
- AngularJS
- Express.js
- Passport.js
- Chart.js

## Screenshots
User View
![Image of User View](/documentation/user-view.png)

Shopping List View
![Image of Shopping List View](/documentation/shopping-list-view.png)

Shopping List Creation View
![Image of Shopping List Creation View](/documentation/shopping-list-creation-view.png)

Module View
![Image of Module View](/documentation/module-view.png)

Module Library View
![Image of Module Library View](/documentation/module-library-view.png)

Chart Modal View
![Image of Chart Modal View](/documentation/chart-modal-view.png)

## Authors

- Andrew Johnson
- Monica Wheeler
- Philip Owen
- Darian Nasrabadi
- Alaethia Dvoracek
