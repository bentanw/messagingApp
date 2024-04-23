## Messaging App
This project was built using React, Firebase, MaterialUI, ShadCN, and Tailwind

### Features:
- [x] Sign in 
- [x] Real time chat
- [x] Change account
- [x] Log out function

<img width="1440" alt="Screenshot 2024-04-23 at 1 58 16 PM" src="https://github.com/bentanw/messagingApp/assets/73725152/c1a5d995-7761-4aed-a24a-5c125bb8afed">

### Tech Stack
- React
- Firebase
- MaterialUI
- Tailwind

### Start up the project
To start up the project by running `npm install && npm start` in the terminal

### Notes/Challenges:
- firebase app not intialize because import command is wrong: right one is 
    - import firebase from 'firebase/compat/app';
    - import 'firebase/compat/auth';
    - import 'firebase/compat/firestore';
