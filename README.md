
This project was built using React, Firebase, MaterialUI, and Tailwind

Features:
- [x] Sign in 
- [x] Real time chat
- [x] Change account
- [x] Log out function

<img width="1440" alt="Screenshot 2023-11-05 at 5 38 25 PM" src="https://github.com/bentan1020/messagingApp/assets/73725152/f0378690-59a1-4359-afc7-97875fba4afd">

To start up the project
run '''npm start''' in the terminal

Notes/Challenges:
- firebase app not intialize because import command is wrong: right one is 
    - import firebase from 'firebase/compat/app';
    - import 'firebase/compat/auth';
    - import 'firebase/compat/firestore';
