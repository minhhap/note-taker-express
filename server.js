
// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, 
// and then return the new note to the client. You'll need to find a way to give each note a unique id when 
// it's saved (look into npm packages that could do this for you).

const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db');
const express = require('express');
const { ok } = require('assert');
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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.get('/api/notes', (req, res) => {
    if (notes) {
        res.json(notes);
      } else {
        res.send(404);
      }
  });

app.post('/api/notes', (req, res) => {
// set id based on what the next index of the array will be
    // req.body.id = notes.length.toString();
    const newNote = req.body;
    res.json(newNote);
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(notes, null, 2), function(err) {
        if (err) throw err;
    });
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });