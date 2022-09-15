const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("API listening");
});

require('dotenv').config();

app.listen(HTTP_PORT, () => {
    console.log('Ready to handle requests on port ' + HTTP_PORT);
});
