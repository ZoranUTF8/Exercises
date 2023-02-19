const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Note = require("../Models/note");
const api = supertest(app);
const helper = require("./test_helper");

/*
The database is cleared out at the beginning,
and after that, we save the two notes stored 
in the initialNotes array to the database. By
doing this, we ensure that the database is in
the same state before every test is run.
*/

beforeEach(async () => {
  await Note.deleteMany({});

  const noteObjects = helper.initialNotes.map((note) => new Note(note));

  /*
  creates a new array that consists of promises,
  that are created by calling the save method of
  each item in the noteObjects array
  In other words, it is an array of promises 
  for saving each of the items to the database.
  */
  const promiseArray = noteObjects.map((note) => note.save());

  /*
  The Promise.all method can be used for 
  transforming an array of promises into 
  a single promise, that will be fulfilled 
  once every promise in the array passed to 
  it as a parameter is resolved. The last 
  line of code await Promise.all(promiseArray) 
  waits until every promise for saving a note is 
  finished, meaning that the database has been 
  initialized.
  */

  await Promise.all(promiseArray);
});

//? Tests

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");

  expect(response.body[0].content).toBe("HTML is easy");
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((r) => r.content);
  expect(contents).toContain("Browser can execute only JavaScript");
});

test("there are two notes", async () => {
  const response = await api.get("/api/notes");

  expect(response.body).toHaveLength(helper.initialNotes.length);
});

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("a valid note can be added", async () => {
  const newNote = {
    content: "async/await simplifies making async calls",
    important: true,
  };

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

  const contents = notesAtEnd.map((n) => n.content);

  expect(contents).toContain("async/await simplifies making async calls");
}, 10000);

test("note without content is not added", async () => {
  const newNote = {
    important: true,
  };

  await api.post("/api/notes").send(newNote).expect(400);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
});

test("a specific note can be viewed", async () => {
  const notesAtStart = await helper.notesInDb();

  const noteToView = notesAtStart[0];

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(resultNote.body.data.id).toEqual(noteToView.id);
});

test("a note can be deleted", async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToDelete = notesAtStart[0];

  const res = await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

  const contents = notesAtEnd.map((r) => r.content);

  expect(contents).not.toContain(noteToDelete.content);
}, 10000);

afterAll(async () => {
  await mongoose.connection.close();
});
