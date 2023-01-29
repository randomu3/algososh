/// <reference types="cypress" />

describe("Приложение корректно запускает страницу Фибоначчи:", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна:", () => {
    cy.get("button.text_type_button.text").should("be.disabled");
    cy.get("input.text.text_type_input").type("4").should("have.value", "4");
    cy.get("button.text_type_button.text").should("not.be.disabled");
    cy.get("input.text.text_type_input").clear();
    cy.get("button.text_type_button.text").should("be.disabled");
  });

  it("Алгоритм генерируется корректно:", () => {
    cy.clock();
    cy.get("input.text.text_type_input").type("19");
    cy.get("input.text.text_type_input").should("have.value", 19);
    cy.get("button.text_type_button.text").click();
    cy.get("button.text_type_button.text").should("be.disabled");
    cy.tick(500);
    cy.get('[data-cy="circle-0"]').should("contain", "1");
    cy.tick(500);
    cy.get('[data-cy="circle-1"]').should("contain", "1");
    cy.tick(500);
    cy.get('[data-cy="circle-2"]').should("contain", "2");
    cy.tick(500);
    cy.get('[data-cy="circle-3"]').should("contain", "3");
    cy.tick(500);
    cy.get('[data-cy="circle-4"]').should("contain", "5");
    cy.tick(500);
    cy.get('[data-cy="circle-5"]').should("contain", "8");
    cy.tick(500);
    cy.get('[data-cy="circle-6"]').should("contain", "13");
    cy.tick(500);
    cy.get('[data-cy="circle-7"]').should("contain", "21");
    cy.tick(500);
    cy.get('[data-cy="circle-8"]').should("contain", "34");
    cy.tick(500);
    cy.get('[data-cy="circle-9"]').should("contain", "55");
    cy.tick(500);
    cy.get('[data-cy="circle-10"]').should("contain", "89");
    cy.tick(500);
    cy.get('[data-cy="circle-11"]').should("contain", "144");
    cy.tick(500);
    cy.get('[data-cy="circle-12"]').should("contain", "233");
    cy.tick(500);
    cy.get('[data-cy="circle-13"]').should("contain", "377");
    cy.tick(500);
    cy.get('[data-cy="circle-14"]').should("contain", "610");
    cy.tick(500);
    cy.get('[data-cy="circle-15"]').should("contain", "987");
    cy.tick(500);
    cy.get('[data-cy="circle-16"]').should("contain", "1597");
    cy.tick(500);
    cy.get('[data-cy="circle-17"]').should("contain", "2584");
    cy.tick(500);
    cy.get('[data-cy="circle-18"]').should("contain", "4181");
    cy.tick(500);
    cy.get('[data-cy="circle-19"]').should("contain", "6765");
    cy.tick(500);
    cy.get("button.text_type_button.text").should("be.disabled");
  });
});
