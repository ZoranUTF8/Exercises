require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Note = require("./Models/note");

let notes = require("./data/notes.json");
const { response } = require("express");
/*
The json-parser functions so that it takes the JSON data of a request, 
transforms it into a JavaScript object and then attaches it to the body
 property of the request object before the route handler is called.*/
app.use(express.json());
app.use(cors());

//! REQUEST HANDLERS
app.get("/", (request, response) => {
  response.send("<h1>Hello from your api! Check the other endpoints.</h1>");
});

//! REST VERBS
//? Add update note

//* Get  single note

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

//* Get single note
app.get("/api/notes/:id", (req, res) => {
  // const noteId = Number(req.params.id);

  Note.findById(req.params.id)
    .then((note) => {
      res.status(200);
      res.json({
        status: "success",
        message: `Note with ${req.params.id} found`,
        data: note,
      });
    })
    .catch((error) => {
      res.status(204);
      res.json({ status: "fail", message: `No note with ${req.params.id}` });
    });
});

//* Delete single note
app.delete("/api/notes/:id", (req, res) => {
  const noteFound = notes.find((note) => note.id === Number(req.params.id));

  if (noteFound) {
    notes = notes.filter((note) => note.id !== noteFound.id);
    res.status(200).send({ message: `Note with id ${req.params.id} deleted` });
  } else {
    res
      .status(404)
      .send({ message: `No notes with id ${req.params.id} found` });
  }
});

//* Add new note
app.post("/api/notes", (req, res) => {
  if (req.body.content) {
    const newNote = new Note({
      content: req.body.content,
      important: req.body.important || false,
    });

    newNote.save().then((note) => {
      res
        .status(200)
        .send({ message: `Note added under id ${newNote.id}`, data: note });
    });
  } else {
    res.status(400).send({ error: "Bad request, missing content" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT);

console.log(`Server running on port ${PORT}`);
