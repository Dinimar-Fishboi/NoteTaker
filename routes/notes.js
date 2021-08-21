const noteRouter = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

//This should just get all the pre-existing data to upload in sidebar
noteRouter.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    //readAndAppend('./db/db.json').then((data) => res.json(JSON.parse(data)))

  });

  noteRouter.post('/', (req, res) => {
    console.info(`${req.method} request received to submit note`);

    const { title, text} = req.body;

    if (title && text){

    const activeNote = {
      title,
      text,
      id: uuid(),
    }

    readAndAppend(activeNote, './db/db.json');

      res.json(activeNote);
    } else {
      res.json('Error: cannot post new note')
    }

  });

  noteRouter.delete('/', (req, res) => {
  //  console.info(`${req.method} request received to delete note`);
  
  });

  module.exports = noteRouter;