// Dependencies
const fs = require('fs');
const path = require('path');
const notes  = require('./db/db');
const express = require('express');
const { ok } = require('assert');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// Parse incoming JSON data
app.use(express.json());

// Connect with index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Route to fetch notes
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
    notes.push(newNote);
    res.json(newNote);
    console.log(newNote)
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });