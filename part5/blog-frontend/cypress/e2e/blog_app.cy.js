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
    body: { title, author, url },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  });

  cy.visit("http://localhost:3000");
});

describe("Blog app", () => {
  describe("Login with new user credentials", function () {
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
      cy.get('input[placeholder="Enter title"]').type("Test blog title");

      cy.get('input[placeholder="Enter author"]').type("Test blog author");

      cy.get('input[placeholder="Enter URL"]').type("Test blog URL");

      cy.contains("Submit").click();
      cy.contains("Test blog title");
    });

    it("Blog can be liked", function () {
      cy.contains("Add note").click();
      cy.get('input[placeholder="Enter title"]').type("Test blog title");

      cy.get('input[placeholder="Enter author"]').type("Test blog author");

      cy.get('input[placeholder="Enter URL"]').type("Test blog URL");

      cy.contains("Submit").click();

      cy.contains("1: Test blog title by: Test blog author").click();
      cy.contains("Likes: 0");
      cy.get("#single_blog_like_btn").click();
      cy.contains("Likes: 1");
    });

    it("User who created a blog can delete it", function () {
      cy.contains("Add note").click();
      cy.get('input[placeholder="Enter title"]').type("Test blog title");

      cy.get('input[placeholder="Enter author"]').type("Test blog author");

      cy.get('input[placeholder="Enter URL"]').type("Test blog URL");

      cy.contains("Submit").click();

      cy.contains("1: Test blog title by: Test blog author").click();
      cy.get("#single_blog_delete_btn").click();
      cy.contains("Ok").click();
    });
  });

  describe.only("More users present", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/testing/reset");

      const user = {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      };

      cy.register({ ...user });

      cy.visit("http://localhost:3000");

      const user2 = {
        name: "Zoran Janjic",
        username: "Zochan",
        password: "Moeko2023!",
      };

      cy.register({ ...user2 });
      cy.visit("http://localhost:3000");
    });

    it("Logging in with first user works", function () {
      cy.login({ username: "mluukkai", password: "salainen" });

      cy.contains("Add note").click();
      cy.get('input[placeholder="Enter title"]').type("Test blog title");

      cy.get('input[placeholder="Enter author"]').type("Test blog author");

      cy.get('input[placeholder="Enter URL"]').type("Test blog URL");

      cy.contains("Submit").click();
      cy.contains("Test blog title");

      cy.get(".Toastify__toast").click();
      cy.contains("Logout").click();

      cy.login({ username: "Zochan", password: "Moeko2023!" });

      cy.contains("1: Test blog title by: Test blog author").click();

      cy.get("#single_blog_delete_btn").should("have.attr", "disabled");
    });
  });
});
