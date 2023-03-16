/* eslint-disable no-undef */

Cypress.Commands.add("login", ({ username, password }) => {
  /*
instead of logging in a user using the form in the beforeEach block,
Cypress recommends that we bypass the UI and do an HTTP request to
the backend to log in. The reason for this is that logging in with
an HTTP request is much faster than filling out a form.
      */
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("user", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("createNote", ({ content, important }) => {
  cy.request({
    url: "http://localhost:3001/api/notes",
    method: "POST",
    body: { content, important },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  });

  cy.visit("http://localhost:3000");
});

describe("Note app", function () {
  //? Delete the Notes and User db and create a new single user
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains("Login");
  });

  it("login form can be opened", function () {
    cy.contains("Submit").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();
    cy.contains("Submit").click();
    cy.contains("Matti Luukkainen logged in");
  });

  it("invalid login form can not login", function () {
    cy.get("#username").type("someusername");
    cy.get("#password").type("somepassword");
    cy.get("#login-button").click();
    cy.get(".error").should("contain", "Invalid username or password");

    cy.get("html").should("not.contain", "Matti Luukkainen logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("#newNoteInput").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({
          content: "another note cypress",
          important: true,
        });
      });

      it("it can be made not important", function () {
        cy.contains("another note cypress");

        cy.contains("Change to Not important").click();

        cy.contains("another note cypress");

        cy.contains("Change to Important");
      });
    });

    describe.only("and several notes exist", function () {
      beforeEach(function () {
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third note", important: false });
      });

      it("one of those can be made important", function () {
        cy.contains("second note");

        cy.contains("Change to Important").as("theButton");
        cy.get("@theButton").click();

        cy.contains("second note");
        cy.contains("Change to Not important");
      });
    });
  });
});
