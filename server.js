const express = require('express');
const path = require('path');
const apiRouter = require('./routes/index');


const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.use(express.static('public'));