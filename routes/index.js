
const express = require('express');

//Import modular routers

const notes = require('./notes');

const app = express();

app.use('/notes', notes);


module.exports = app;