
// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, 
// and then return the new note to the client. You'll need to find a way to give each note a unique id when 
// it's saved (look into npm packages that could do this for you).

const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(results);
  });
  
app.post('/api/notes', (req, res) => {
// set id based on what the next index of the array will be
req.body.id = notes.length.toString();

// if any data in req.body is incorrect, send 400 error back
if (!validateNotes(req.body)) {
    res.status(400).send('The note is not properly formatted.');
} else {
    const note = createNewNote(req.body, notes);
    res.json(note);
}
});  

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });