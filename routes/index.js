const apiRouter = require('express').Router();

const addNotes = require('./notes');

apiRouter.use('/addNote', addNotes);

module.exports = apiRouter;
