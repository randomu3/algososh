/// <reference types="cypress" />
import {
  CHANGING_COLOR,
  DEFAULT_COLOR,
  MODIFIED_COLOR,
} from "../../src/constants/colors";

describe("Приложение корректно запускает страницу Строка:", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/recursion");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна:", function () {
    cy.get("button.text_type_button.text").eq(0).should("be.disabled");

    cy.get("input.text.text_type_input")
      .type("text")
      .should("have.value", "text");
    cy.get("button.text_type_button.text").should("not.be.disabled");

    cy.get("input.text.text_type_input").clear();
    cy.get("button.text_type_button.text").should("be.disabled");
  });

  it("Разворот строки работает корректно:", function () {
    cy.get("input.text.text_type_input").type("text");
    cy.get("button.text_type_button.text").click();
    cy.get("button.text_type_button.text").should("be.disabled");

    cy.get('[data-cy="circle-0"]')
      .should("contain", "t")
      .should("have.css", "border-color", CHANGING_COLOR);
    cy.get('[data-cy="circle-1"]')
      .should("contain", "e")
      .should("have.css", "border-color", DEFAULT_COLOR);
    cy.get('[data-cy="circle-2"]')
      .should("contain", "x")
      .should("have.css", "border-color", DEFAULT_COLOR);
    cy.get('[data-cy="circle-3"]')
      .should("contain", "t")
      .should("have.css", "border-color", CHANGING_COLOR);

    cy.get('[data-cy="circle-0"]')
      .should("contain", "t")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.get('[data-cy="circle-1"]')
      .should("contain", "x")
      .should("have.css", "border-color", CHANGING_COLOR);
    cy.get('[data-cy="circle-2"]')
      .should("contain", "e")
      .should("have.css", "border-color", CHANGING_COLOR);
    cy.get('[data-cy="circle-3"]')
      .should("contain", "t")
      .should("have.css", "border-color", MODIFIED_COLOR);

    cy.get('[data-cy="circle-0"]')
      .should("contain", "t")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.get('[data-cy="circle-1"]')
      .should("contain", "e")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.get('[data-cy="circle-2"]')
      .should("contain", "x")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.get('[data-cy="circle-3"]')
      .should("contain", "t")
      .should("have.css", "border-color", MODIFIED_COLOR);
      
    cy.get("button.text_type_button.text").should("not.be.disabled");
  });
});
