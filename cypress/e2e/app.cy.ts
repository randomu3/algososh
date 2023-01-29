/// <reference types="cypress" />

describe("Приложение корректно запускается:", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3000/");
    });
  });
  