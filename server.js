/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Shubham A Patel Student ID: 145882205 Date: 16/09/2022
* Cyclic Link: _______________________________________________________________
*
********************************************************************************/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = express();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.json({message: "API Listening"});
});

require('dotenv').config();




app.get("/api/Movies", (req, res) => {
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
        .then((Movies) => {
            res.status(201).json(Movies);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});
app.post("/api/Movies", (req, res) => {
    db.addNewMovie(req.body)
        .then(() => {
            res.status(201).json(`Successfully added the new movie`);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.get("/api/Movies/:id", (req, res) => {
    db.getMovieById(req.params.id)
        .then((Movies) => {
            res.status(201).json(Movies);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.put("/api/Movies/:id", (req, res) => {
    db.updateMovieById(req.body, req.params.id)
        .then(() => {
            res.status(201).json(`Movie ${req.body._id} updated successfully`);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.delete("/api/Movies/:id", (req, res) => {
    db.deleteMovieById(req.params.id)
        .then(() => {
            res.status(201).json(`Movie ${req.params.id} deleted successfully`);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});