const noteRouter = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const db = require("../db/db.json");

//Retrieve pre-existing data to upload in sidebar
noteRouter.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
  });

  // Allows new notes to be added
  noteRouter.post('/', (req, res) => {
    console.info(`${req.method} request received to submit note`);

    // values passed from the Front
    const {title, text} = req.body;

    if (title && text){
      
    const activeNote = {
      title,
      text,
      id: uuid(),
    }

    // Adds note to actual db.json file
    readAndAppend(activeNote, './db/db.json');

    //This will push the new info to the now present db variable.
    // This is due to the db not updating after initial upload.
    db.push(activeNote);

      res.json(activeNote);
    } else {
      res.json('Error: cannot post new note')
    }

  });

  // Deletes selected note on front end and in db
  noteRouter.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete note`);

    const id = req.params.id;
    
    for ( i = 0; i < db.length; i++){
     
      console.info(" THis is what we see in the loop " + db[i].id);
      if (db[i].id === id){
        db.splice(i, 1);
        console.info("The selected note was deleted");
      } else {
        console.info(`We did not delete ${id}`);
      }
    }

    //Overwrites db.json
    writeToFile("./db/db.json", db);

    //Updates sidebar
    readFromFile('./db/db.json').then((data) => res.json(data));

  });

  module.exports = noteRouter;