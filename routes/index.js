const apiRouter = require('express').Router();

const addNotes = require('./addNote');

apiRouter.use('/addNote', addNotes);

module.exports = apiRouter;
