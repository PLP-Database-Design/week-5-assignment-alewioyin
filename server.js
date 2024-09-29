//  IMPORT DEPENDENCES
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

// CONFIGURE ENVIRONMENT VARIABLE
dotenv.config();

//CREATE CONNECTION OBJECT
const db = mysql.createConnection({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//TEST THE CONNECTION
db.connect((err) => {
    //when connection is not successful
    if (err) {
        console.error('Error connecting to the database:', err);
    } 
    //when connection is successful
    else {
        console.log('Connected to MySQL database successfully:', db.threadId);
    }
});


/* QUESTION 1: RETRIEVE ALL PATIENTS */
app.get('/patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, data) => {
    //if i have an error
        if (err) {
            return res.status(400).send('Failed to get patients data', err)
        }
        //if there is no error
        else{
            res.status(400).send(data);
        }
    })
});


/* QUESTION 2: RETRIEVE ALL PROVIDERS */
app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
    //if i have an error
        if (err) {
            return res.status(400).send('Failed to get providers data', err)
        }
        //if there is no error
        else{
            res.status(400).send(data);
        }
    })
});

/* QUESTION 3: FILTER PATIENTS BY FIRST NAME */
app.get('/patients-firstname', (req, res) => {
    const getPatientsFirstName = "SELECT first_name  FROM patients"
    db.query(getPatientsFirstName, (err, data) => {
    //if i have an error
        if (err) {
            return res.status(400).send('Failed to get patients first name', err)
        }
        //if there is no error
        else{
            res.status(400).send(data);
        }
    })
});


// QUESTION 4: RETRIEVE ALL PROVIDERS BY THEIR SPECIALTY
app.get('/providers-specialty', (req, res) => {
    const getProvidersSpecialty = "SELECT provider_specialty FROM providers"
    db.query(getProvidersSpecialty, (err, data) => {
    //if i have an error
        if (err) {
            return res.status(400).send('Failed to get providers specialty', err)
        }
        //if there is no error
        else{
            res.status(400).send(data);
        }
    })
});


//START AND LISTEN TO SERVER
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});