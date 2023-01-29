/// <reference types="cypress" />
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { CHANGING_COLOR, DEFAULT_COLOR } from "../../src/constants/colors";

describe("Приложение корректно запускает страницу Стек:", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
    cy.contains("Добавить").as("add");
    cy.contains("Удалить").as("remove");
    cy.contains("Очистить").as("clear");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна:", () => {
    cy.get("@add").should("be.disabled");

    cy.get("input.text.text_type_input").type("5").should("have.value", "5");
    cy.get("@add").should("not.be.disabled");

    cy.get("input.text.text_type_input").clear();
    cy.get("@add").should("be.disabled");
  });

  it("Правильность добавления элемента в стек:", () => {
    cy.clock();
    cy.get("input.text.text_type_input").type("1");
    cy.get("@add").click();

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circle-0"]')
      .should("contain", "1")
      .should("have.css", "border-color", CHANGING_COLOR);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circle-0"]')
      .should("contain", "1")
      .should("have.css", "border-color", DEFAULT_COLOR);

    cy.get("input.text.text_type_input").should("not.have.value");
  });

  it("Правильность поведения кнопки «Очистить»", () => {
    cy.clock();

    cy.get("input.text.text_type_input").type("1");
    cy.get("@add").click();

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("input.text.text_type_input").type("2");
    cy.get("@add").click();

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("@clear").click();

    cy.get('[data-cy="circle-0"]').should("not.exist");
    cy.get('[data-cy="circle-1"]').should("not.exist");
  });

  it("Правильность удаления элемента из стека:", () => {
    cy.clock();

    cy.get("input.text.text_type_input").type("1");
    cy.get("@add").click();

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("input.text.text_type_input").type("2");
    cy.get("@add").click();

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("@remove").click();

    cy.get('[data-cy="circle-1"]')
      .should("contain", "2")
      .should("have.css", "border-color", CHANGING_COLOR);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circle-1"]').should("not.exist");
  });
});
