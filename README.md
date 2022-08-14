# FlyBnB
FlyBnB is an AirBnB clone. The backend was built using PostgreSQL, Sequelize and Express. The front end was developed with React and Redux. No CSS libraries were used in this project.

Live Link: https://fly-bnb.herokuapp.com/login

## Login/Landing Page
![image](https://user-images.githubusercontent.com/73668892/177220387-2a13ddcf-657c-4643-941a-f6a6a8816406.png)

## Listings Page

![image](https://user-images.githubusercontent.com/73668892/177220459-5154bd3d-73f3-49da-b6b9-fe7731bc9933.png)

## Authentication
FlyBnB requires users to register and create an account before entering the site and accessing any of the features. Successfully logged in users will be redirected to the home page and view all listings. Using BcryptJS, passwords are hashed and stored in the database. If a user attempts to navigate the site without proper authentication, they will be redirected to the landing page.

## Future Feature Implementations

* Search Bar
* Google Maps

## Downloading the App
* Clone this repository with the command git ```clone git@github.com:Waseemalame/FlyBnB.git```

* Install all packages in both the frontend and backend folders npm install

* Create a new .env file in the backend to access the database. Follow the example .env in the backend.

* Setup a PSQL user to match your .env file.

* Migrate and seed the database using the following script in the backend npm run reset

* Run npm start in both the backend and front end folders.

* Navigate your browser to localhost:3000
