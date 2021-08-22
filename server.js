// Required modules/resources
const express = require('express');
const path = require('path');
const apiRouter = require('./routes/index');

//Port
const PORT = process.env.PORT || 3001;

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

//Static pathways
app.use(express.static('public'));

//Home page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Actual note-tab
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//There are 2 places to go: homepage or notepad.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Ensures safe deployement
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🪶`)
);
