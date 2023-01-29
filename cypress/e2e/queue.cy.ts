/// <reference types="cypress" />
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  CHANGING_COLOR,
  DEFAULT_COLOR,
} from "../../src/constants/colors";

describe("Приложение корректно запускает страницу Очередь:", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
    cy.get("input").as("input");
    cy.contains("Добавить").as("add");
    cy.contains("Удалить").as("remove");
    cy.contains("Очистить").as("clear");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна:", () => {
    cy.get("@add").should("be.disabled");

    cy.get("@input").type("text").should("have.value", "text");
    cy.get("@add").should("not.be.disabled");

    cy.get("@input").clear();
    cy.get("@add").should("be.disabled");
  });

  it("Корректно добавляет элемент в очередь:", () => {
    cy.clock();
    cy.get("@input").type("1");
    cy.get("@add").click();

    cy.get('[data-cy="circle-0"]')
      .should("contain", "1")
      .should("have.css", "border-color", CHANGING_COLOR)
      .prev()
      .should("have.text", "head")
      .next()
      .next()
      .next() 
      .should("have.text", "tail");
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circle-0"]')
      .should("contain", "1")
      .should("have.css", "border-color", DEFAULT_COLOR);
    cy.get("@input").should("not.have.value");

    cy.get("@input").type("2");
    cy.get("@add").click();

    cy.get('[data-cy="circle-1"]')
      .should("contain", "2")
      .should("have.css", "border-color", CHANGING_COLOR)
      .prev()
      .should("not.have.text", "head")
      .next()
      .next()
      .next()
      .should("have.text", "tail");

    cy.get('[data-cy="circle-0"]')
      .prev()
      .should("have.text", "head")
      .next()
      .next()
      .next()
      .should("not.have.text", "tail");
  });

  it("Корректно удаляет элемента из очереди:", () => {
    cy.clock();

    cy.get("@input").type("1");
    cy.get("@add").click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("@input").type("2");
    cy.get("@add").click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("@remove").click();

    cy.get('[data-cy="circle-0"]')
      .should("contain", "1")
      .should("have.css", "border-color", CHANGING_COLOR);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-0"]')
      .should("contain", "")
      .should("have.css", "border-color", DEFAULT_COLOR)
      .prev()
      .should("not.have.text", "head");
    cy.get('[data-cy="circle-1"]')
      .should("contain", "2")
      .prev()
      .should("have.text", "head")
      .next()
      .next()
      .next()
      .should("have.text", "tail");
  });

  it("Кнопка очистить корректно отрабатывает:", () => {
    cy.clock();

    cy.get("@input").type("1");
    cy.get("@add").click();
    cy.tick(SHORT_DELAY_IN_MS);
    
    cy.get("@input").type("2");
    cy.get("@add").click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("@clear").click();
    cy.get('[data-cy="circle-0"]').should("contain", "");
    cy.get('[data-cy="circle-1"]').should("contain", "");
  });
});
