const notesRouter = require("express").Router();
const Note = require("../Models/note");

//* Get  single note
notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

//* Get single note
notesRouter.get("/:id", async (req, res, next) => {
  try {
    const foundNote = await Note.findById(req.params.id);

    if (foundNote) {
      res.status(200).json({
        status: "success",
        message: `Note with ${req.params.id} found`,
        data: foundNote,
      });
    } else {
      response.status(404).json({
        statusbar: "error",
        message: `Note with ${req.params.id} has not been found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

//* Add new note
notesRouter.post("/", async (req, res, next) => {
  const newNote = new Note({
    content: req.body.content,
    important: req.body.important || false,
  });

  try {
    const savedNote = await newNote.save();

    res.status(201).json({
      message: `Note added under id ${savedNote.id}`,
      data: savedNote,
    });
  } catch (exception) {
    next(exception);
  }
});

//* Delete single note
notesRouter.delete("/:id", async (req, res, next) => {
  try {
    const deletedNote = await Note.findByIdAndRemove(req.params.id);

    res
      .status(204)
      .json({ message: `Note with id ${deletedNote.id} was removed.` });
  } catch (error) {
    next(error);
  }
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
