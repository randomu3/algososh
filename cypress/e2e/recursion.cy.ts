/// <reference types="cypress" />
import {
  CHANGING_COLOR,
  DEFAULT_COLOR,
  MODIFIED_COLOR,
} from "../../src/constants/colors";
import { getCircle } from "../utils/ultils"; 

describe("Приложение корректно запускает страницу Строка:", function () {
  beforeEach(function () {
    cy.visit("recursion");
    cy.get('button.text_type_button.text').last().as('button');
    cy.get('input.text.text_type_input').first().as('input');
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна:", function () {
    cy.get("@button").eq(0).should("be.disabled");

    cy.get("@input")
      .type("text")
      .should("have.value", "text");
    cy.get("@button").should("not.be.disabled");

    cy.get("@input").clear();
    cy.get("@button").should("be.disabled");
  });

  it("Разворот строки работает корректно:", function () {
    cy.get("@input").type("text");
    cy.get("@button").click();
    cy.get("@button").should("be.disabled");

    cy.get(getCircle(0))
      .should("contain", "t")
      .should("have.css", "border-color", CHANGING_COLOR);
    cy.get(getCircle(1))
      .should("contain", "e")
      .should("have.css", "border-color", DEFAULT_COLOR);
    cy.get(getCircle(2))
      .should("contain", "x")
      .should("have.css", "border-color", DEFAULT_COLOR);
    cy.get(getCircle(3))
      .should("contain", "t")
      .should("have.css", "border-color", CHANGING_COLOR);

    cy.get(getCircle(0))
      .should("contain", "t")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.get(getCircle(1))
      .should("contain", "x")
      .should("have.css", "border-color", CHANGING_COLOR);
    cy.get(getCircle(2))
      .should("contain", "e")
      .should("have.css", "border-color", CHANGING_COLOR);
    cy.get(getCircle(3))
      .should("contain", "t")
      .should("have.css", "border-color", MODIFIED_COLOR);

    cy.get(getCircle(0))
      .should("contain", "t")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.get(getCircle(1))
      .should("contain", "e")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.get(getCircle(2))
      .should("contain", "x")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.get(getCircle(3))
      .should("contain", "t")
      .should("have.css", "border-color", MODIFIED_COLOR);
      
    cy.get("@button").should("not.be.disabled");
  });
});
