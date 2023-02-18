const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Note = require("../Models/note");
const api = supertest(app);

//? Initialise the database
const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

/*
The database is cleared out at the beginning,
and after that, we save the two notes stored 
in the initialNotes array to the database. By
doing this, we ensure that the database is in
the same state before every test is run.
*/

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
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

  expect(response.body).toHaveLength(initialNotes.length);
});



test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});
