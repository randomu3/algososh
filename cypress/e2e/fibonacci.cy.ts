/// <reference types="cypress" />
import { getCircle } from "../utils/ultils";

describe("Приложение корректно запускает страницу Фибоначчи:", () => {
  beforeEach(() => {
    cy.visit("fibonacci");
    cy.get("button.text_type_button.text").as("startButton");
    cy.get("input.text.text_type_input").as("input");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна:", () => {
    cy.get("@startButton").should("be.disabled");
    cy.get("@input").type("4").should("have.value", "4");
    cy.get("@startButton").should("not.be.disabled");
    cy.get("@input").clear();
    cy.get("@startButton").should("be.disabled");
  });

  it("Алгоритм генерируется корректно:", () => {
    cy.clock();
    cy.get("@input").type("19");
    cy.get("@input").should("have.value", 19);
    cy.get("@startButton").click();
    cy.get("@startButton").should("be.disabled");
    cy.tick(500);
    cy.get(getCircle(0)).should("contain", "1");
    cy.tick(500);
    cy.get(getCircle(1)).should("contain", "1");
    cy.tick(500);
    cy.get(getCircle(2)).should("contain", "2");
    cy.tick(500);
    cy.get(getCircle(3)).should("contain", "3");
    cy.tick(500);
    cy.get(getCircle(4)).should("contain", "5");
    cy.tick(500);
    cy.get(getCircle(5)).should("contain", "8");
    cy.tick(500);
    cy.get(getCircle(6)).should("contain", "13");
    cy.tick(500);
    cy.get(getCircle(7)).should("contain", "21");
    cy.tick(500);
    cy.get(getCircle(8)).should("contain", "34");
    cy.tick(500);
    cy.get(getCircle(9)).should("contain", "55");
    cy.tick(500);
    cy.get(getCircle(10)).should("contain", "89");
    cy.tick(500);
    cy.get(getCircle(11)).should("contain", "144");
    cy.tick(500);
    cy.get(getCircle(12)).should("contain", "233");
    cy.tick(500);
    cy.get(getCircle(13)).should("contain", "377");
    cy.tick(500);
    cy.get(getCircle(14)).should("contain", "610");
    cy.tick(500);
    cy.get(getCircle(15)).should("contain", "987");
    cy.tick(500);
    cy.get(getCircle(16)).should("contain", "1597");
    cy.tick(500);
    cy.get(getCircle(17)).should("contain", "2584");
    cy.tick(500);
    cy.get(getCircle(18)).should("contain", "4181");
    cy.tick(500);
    cy.get(getCircle(19)).should("contain", "6765");
    cy.tick(500);
    cy.get("@startButton").should("be.disabled");
  });
});
