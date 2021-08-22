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

    readAndAppend(activeNote, './db/db.json');

      res.json(activeNote);
    } else {
      res.json('Error: cannot post new note')
    }

  });

  // Deletes selected note on front end and in db
  noteRouter.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete note`);

    const id = req.params.id;
    console.info(id);
    console.info(db);
    console.info(db[1].id);
    console.log(id);
    console.log(db);
    console.log(db[1].id);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))

    for ( i = 0; i < db.length; i++){
     
      console.info(" THis is what we see in the loop " + db[i].id);
      if (db[i].id === id){
        db.splice(i, 1);
        console.info("The selected note was deleted");
        console.info(db);
        console.log("The selected note was deleted");
        console.log(db);
      } else {
        console.info(`We did not delete ${id}`);
        console.log(`We did not delete ${id}`);
      }
    }

    //readAndAppend(db, './db/db.json');

   // writeToFile("./db/db.json", db);

   // readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

  });

  module.exports = noteRouter;