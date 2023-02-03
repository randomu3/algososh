/// <reference types="cypress" />
import {
  CHANGING_COLOR,
  DEFAULT_COLOR,
  MODIFIED_COLOR,
} from "../../src/constants/colors";
import { BUTTON } from "../../src/constants/element-captions";
import { DELAY_IN_MS } from "../../src/constants/delays";
import { getCircle } from "../utils/ultils";

describe("Приложение корректно запускает страницу Строка:", function () {
  beforeEach(function () {
    cy.visit("recursion");
    cy.get(BUTTON).last().as("button");
    cy.get("input[placeholder='Введите текст']").first().as("input");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна:", function () {
    cy.get("@button").eq(0).should("be.disabled");

    cy.get("@input").type("text").should("have.value", "text");
    cy.get("@button").should("not.be.disabled");

    cy.get("@input").clear();
    cy.get("@button").should("be.disabled");
  });

  it("Разворот строки работает корректно:", function () {
    cy.get("@input").type("text");
    cy.clock();
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
    cy.tick(DELAY_IN_MS);

    cy.get(getCircle(0))
      .should("contain", "t")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.get(getCircle(1))
      .should("contain", "e")
      .should("have.css", "border-color", CHANGING_COLOR);
    cy.get(getCircle(2))
      .should("contain", "x")
      .should("have.css", "border-color", CHANGING_COLOR);
    cy.get(getCircle(3))
      .should("contain", "t")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.tick(DELAY_IN_MS);

    cy.get(getCircle(0))
      .should("contain", "t")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.get(getCircle(1))
      .should("contain", "x")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.get(getCircle(2))
      .should("contain", "e")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.get(getCircle(3))
      .should("contain", "t")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.tick(DELAY_IN_MS);

    cy.get("@button").should("not.be.disabled");
  });
});
