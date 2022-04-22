const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving notes
notes.get('/notes', (req, res)  =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// GET Route for a specific note
notes.get('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});


// POST Route for adding a new note
notes.post('/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

    //checking for all required parts in the body
  if (req.body) {
    // the new saved object
    const newNote = {
      title,
      text,
      // note_id: noteID(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'Your note has been added!',
      body: newNote,
    };

    res.json(response);

  } else {
    res.json('Error adding note');
  }
});


// function noteID{
//   const ID = '';
//   ID = Math.floor(Math.random() * max);
//   console.log(ID);
// }

module.exports = notes;