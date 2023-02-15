require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Note = require("./Models/note");
//? Middleware imports

const MongooseErrorHandler = require("./Middleware/Errors/MongooseErrors");

let notes = require("./data/notes.json");
/*
The json-parser functions so that it takes the JSON data of a request, 
transforms it into a JavaScript object and then attaches it to the body
 property of the request object before the route handler is called.*/
app.use(express.json());
app.use(cors());

//! Unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

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
  Note.findByIdAndRemove(req.params.id)
    .then((note) => {
      if (notes) {
        res
          .status(200)
          .json({ message: `Note with id ${note.id} was removed.` });
      } else {
        res
          .status(404)
          .json({ message: `No note with id ${req.params.id} was found.` });
      }
    })
    .catch((error) => next(error));
});

//* Add new note
app.post("/api/notes", (req, res, next) => {
  const newNote = new Note({
    content: req.body.content,
    important: req.body.important || false,
  });

  newNote
    .save()
    .then((note) => {
      res
        .status(200)
        .json({ message: `Note added under id ${newNote.id}`, data: note });
    })
    .catch((err) => {
      next(err);
    });
});

//* Update note importance
app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT);

console.log(`Server running on port ${PORT}`);

//! handler of requests with unknown endpoint
app.use(unknownEndpoint);
//! Note that the error-handling middleware has to be the last loaded middleware!
app.use(MongooseErrorHandler);
