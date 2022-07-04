# FlyBnB
FlyBnB is an AirBnB clone. The backend was built using PostgreSQL, Sequelize and Express. The front end was developed with React and Redux. No CSS libraries were used in this project.

Live Link: https://fly-bnb.herokuapp.com/login

## Login/Landing Page
![image](https://user-images.githubusercontent.com/73668892/177061819-2665ce43-d8b2-4226-8a45-d6f391a7f369.png)

## Listings Page

![image](https://user-images.githubusercontent.com/73668892/176992292-c8673f18-d087-4a4d-bd9f-73f8b13a67fd.png)

## Authentication
FlyBnB requires users to register and create an account before entering the site and accessing any of the features. Successfully logged in users will be redirected to the home page and view all listings. Using BcryptJS, passwords are hashed and stored in the database. If a user attempts to navigate the site without proper authentication, they will be redirected to the landing page.

## Future Feature Implementations

* Search Bar
* Google Maps
