/// <reference types="cypress" />

describe("Приложение корректно работает с маршрутами:", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("должна открываться страница по умолчанию", function () {
    cy.contains("МБОУ АЛГОСОШ");
  });

  it("должна открыться страница Строка после нажатия кнопки продолжить", function () {
    cy.get("a[href*=recursion]").click();
    cy.contains("Строка");
  });
  it("должна открыться страница Последовательность Фибоначчи после нажатия кнопки продолжить", function () {
    cy.get("a[href*=fibonacci]").click();
    cy.contains("Последовательность Фибоначчи");
  });
  it("должна открыться страница Сортировка массива после нажатия кнопки продолжить", function () {
    cy.get("a[href*=sorting]").click();
    cy.contains("Сортировка");
  });
  it("должна открыться страница Стек после нажатия кнопки продолжить", function () {
    cy.get("a[href*=stack]").click();
    cy.contains("Стек");
  });
  it("должна открыться страница Очередь после нажатия кнопки продолжить", function () {
    cy.get("a[href*=queue]").click();
    cy.contains("Очередь");
  });
  it("должна открыться страница Связный список после нажатия кнопки продолжить", function () {
    cy.get("a[href*=list]").click();
    cy.contains("Связный список");
  });
});
