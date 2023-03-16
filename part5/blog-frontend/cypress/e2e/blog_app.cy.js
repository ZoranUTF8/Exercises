/* eslint-disable no-undef */

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/auth/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("user", JSON.stringify(body.data));
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("register", ({ name, username, password }) => {
  cy.request("POST", "http://localhost:3001/api/auth/register", {
    name,
    username,
    password,
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.request({
    url: "http://localhost:3001/api/blogs",
    method: "POST",
    body: { title, author,url },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  });

  cy.visit("http://localhost:3000");
});

describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");

    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };

    cy.register({ ...user });

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown first", function () {
    cy.contains("Login");
  });

  describe("Login with new user credentials", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#login-username").type("mluukkai");
      cy.get("#login-password").type("salainen");
      cy.get("#login-btn").click();
      cy.contains(`Logged in as: Matti Luukkainen`);
    });

    it("fails with wrong credentials", function () {
      cy.get("#login-username").type("myusername");
      cy.get("#login-password").type("wrongpassword");
      cy.get("#login-btn").click();
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("A blog can be created", function () {
      cy.contains("Add note").click();
      cy.get("#newBlogTitle").type("Test blog title");
      cy.get("#newBlogAuthor").type("Test blog author");
      cy.get("#newBlogUrl").type("Test blog URL");
      cy.get("#addBlogSubmitBtn").click();
      cy.contains("Test blog title");
    });

    describe("When a blog exists", function () {
      
    });
  });
});
