/* eslint-disable no-undef */
describe("Note app", function () {
  beforeEach(function () {
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
    cy.contains("Invalid username or password");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.get("#login-button").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("#newNoteInput").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });
  });
});