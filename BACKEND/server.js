require('dotenv').config();

const bodyParser = require('body-parser')

const express = require('express');

const router = require('./router/routes')

const app = express();
const PORT = process.env.PORT || 5000;

const db = require('./DB/db.config');
const cors = require('cors');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static('Static/uploads'))

app.use(router)


app.listen(PORT , ()=>{
    console.log(`Listening on ${PORT}`);
});