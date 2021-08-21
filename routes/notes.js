const noteRouter = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

noteRouter.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  noteRouter.post('/', (req, res) => {
    console.info(`${req.method} request received to submit a note`);
    
    // THIS IS A READ AND APPEND SITUATION
    //readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  noteRouter.delete('/', (req, res) => {
    console.info(`${req.method} request received to delete note`);
  
   // readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  module.exports = noteRouter;