const notesRouter = require("express").Router();
const Note = require("../Models/note");

//* Get  single note
notesRouter.get("/", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

//* Get single note
notesRouter.get("/:id", (req, res) => {
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

//* Add new note
notesRouter.post("/", (req, res, next) => {
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

//* Delete single note
notesRouter.delete("/:id", (req, res) => {
  Note.findByIdAndRemove(req.params.id)
    .then((note) => {
      res.status(200).json({ message: `Note with id ${note.id} was removed.` });
    })
    .catch((error) => next(error));
});

//* Update note importance
notesRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body;

  const newNote = { content, important };

  Note.findByIdAndUpdate(request.params.id, newNote, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
