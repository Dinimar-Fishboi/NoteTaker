const noteRouter = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

//This should just get all the pre-existing data to upload
noteRouter.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
  });

  noteRouter.post('/', (req, res) => {
    console.info(`${req.method} request received to submit a note`);

    const { title, text} = req.body;

    if (title && text){
    const newNote = {
      title,
      text,
      note_id: uuid(),
    }

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    }

      res.json(response);
    } else {
      res.json('Error: cannot post new note')
    }
    
    // THIS IS A READ AND APPEND SITUATION
  });

  noteRouter.delete('/', (req, res) => {
    console.info(`${req.method} request received to delete note`);
  
  });

  module.exports = noteRouter;