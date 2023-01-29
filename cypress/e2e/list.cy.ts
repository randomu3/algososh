/// <reference types="cypress" />
import { SHORT_DELAY_IN_MS, DELAY_IN_MS, LONG_DELAY_IN_MS } from "../../src/constants/delays";
import {
  CHANGING_COLOR,
  DEFAULT_COLOR,
  MODIFIED_COLOR,
} from "../../src/constants/colors";

describe("Приложение корректно запускает страницу Связный список:", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
    cy.contains("Добавить в head").as("addHead");
    cy.contains("Добавить в tail").as("addTail");
    cy.contains("Удалить из head").as("removeHead");
    cy.contains("Удалить из tail").as("removeTail");
    cy.contains("Добавить по индексу").as("addByIndex");
    cy.contains("Удалить по индексу").as("removeByIndex");
    cy.get("input").first().as("inputNumber");
    cy.get("input").last().as("inputIndex");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна:", () => {
    cy.get("@addHead").should("be.disabled");
    cy.get("@addTail").should("be.disabled");
    cy.get("@addByIndex").should("be.disabled");
    cy.get("@removeByIndex").should("be.disabled");
    cy.get("@removeHead").should("not.be.disabled");
    cy.get("@removeTail").should("not.be.disabled");
  });

  it("Проверка корректности дефолтного списка:", () => {
    cy.get('[data-cy="container"]').children().should("have.length", 5);
    cy.get('[data-cy="circle-0"]')
      .invoke("text")
      .should((text) => expect(text).not.to.eq(""));
    cy.get('[data-cy="circle-1"]')
      .invoke("text")
      .should((text) => expect(text).not.to.eq(""));
    cy.get('[data-cy="circle-2"]')
      .invoke("text")
      .should((text) => expect(text).not.to.eq(""));
    cy.get('[data-cy="circle-3"]')
      .invoke("text")
      .should((text) => expect(text).not.to.eq(""));
    cy.get('[data-cy="circle-4"]')
      .invoke("text")
      .should((text) => expect(text).not.to.eq(""));
  });

  it("Проверка добавления элемента в head:", () => {
    cy.clock();
    cy.get("@inputNumber").type("text");
    cy.get("@addHead").click();

    cy.get('[data-cy="circle-0"]')
      .should("contain", "text")
      .should("have.css", "border-color", CHANGING_COLOR);
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circle-0"]')
      .should("contain", "text")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circle-0"]').should(
      "have.css",
      "border-color",
      DEFAULT_COLOR
    );
    cy.get("@inputNumber").should("have.value", "");
  });

  it("Проверка добавления элемента в tail:", () => {
    cy.clock();
    cy.get("@inputNumber").type("text");
    cy.get("@addTail").click();

    cy.get('[data-cy="circle-4"]')
      .should("contain", "text")
      .should("have.css", "border-color", CHANGING_COLOR);
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circle-5"]')
      .should("contain", "text")
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circle-5"]').should(
      "have.css",
      "border-color",
      DEFAULT_COLOR
    );
    cy.get("@inputNumber").should("have.value", "");
  });

  it("Проверка удаления элемента из head:", () => {
    cy.clock();
    let firstSuspect = "";
    let secondWhosBeFirst = "";
    cy.get('[data-cy="circle-0"]').should(
      ($text) => (firstSuspect = $text.text())
    );
    cy.get('[data-cy="circle-1"]').should(
      ($text) => (secondWhosBeFirst = $text.text())
    );
    cy.get("@removeHead").click();

    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-0"]')
      .should("have.css", "border-color", CHANGING_COLOR)
      .invoke("text")
      .should((text) => expect(text).to.eq(firstSuspect));

    cy.get('[data-cy="circle-0"]')
      .should("contain", secondWhosBeFirst)
      .should("have.css", "border-color", DEFAULT_COLOR);
    cy.tick(SHORT_DELAY_IN_MS);
  });

  it("Проверка удаления элемента из tail:", () => {
    cy.clock();
    let lastSuspect = "";

    cy.get('[data-cy="circle-4"]').should(
      ($text) => (lastSuspect = $text.text())
    );
    cy.get("@removeTail").click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circle-4"]')
      .should("have.css", "border-color", CHANGING_COLOR)
      .invoke("text")
      .should((text) => expect(text).to.eq(lastSuspect));

    cy.tick(SHORT_DELAY_IN_MS);
  });

  it("Проверка добавления элемента по индексу:", () => {
    let suspectTextFirst = "";
    let suspectTextSecond = "";

    cy.get('[data-cy="circle-0"]').should(($text) => (suspectTextFirst = $text.text()));
    cy.get('[data-cy="circle-1"]').should(($text) => (suspectTextSecond = $text.text()));
    cy.clock();

    cy.get("@inputNumber").type("text");
    cy.get("@inputIndex").type("1");

    cy.get("@addByIndex").click();

    cy.get('[data-cy="circle-0"]')
      .last()
      .should("contain", suspectTextFirst)
      .should("have.css", "border-color", CHANGING_COLOR);

    cy.get('[data-cy="circle-0"]')
      .first()
      .should("contain", "text")
      .should("have.css", "border-color", CHANGING_COLOR);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circle-1"]')
      .first()
      .should("contain", "text")
      .should("have.css", "border-color", CHANGING_COLOR);

    cy.get('[data-cy="circle-1"]')
      .last()
      .should("contain", suspectTextSecond)
      .should("have.css", "border-color", CHANGING_COLOR);

    cy.get('[data-cy="circle-1"]')
      .last()
      .first()
      .invoke("text")
      .should((text) => expect(text).to.eq(suspectTextSecond));

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circle-1')
      .should("contain", "text")
      .should("have.css", "border-color", MODIFIED_COLOR);

    cy.get('[data-cy="circle-2')
      .should("contain", suspectTextSecond)
      .should("have.css", "border-color", DEFAULT_COLOR);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circle-0"]').should("have.css", "border-color", DEFAULT_COLOR);
    cy.get('[data-cy="circle-1"]').should("have.css", "border-color", DEFAULT_COLOR);
    cy.get('[data-cy="circle-2"]').should("have.css", "border-color", DEFAULT_COLOR);
    cy.get("@inputNumber").should("have.value", "");
  });

  it("Проверка удаления элемента по индексу:", () => {
    let suspectText = "";

    cy.get('[data-cy="circle-1"]').should(($text) => (suspectText = $text.text()));

    cy.clock();

    cy.get("@inputIndex").type("1");
    cy.get("@removeByIndex").click();

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circle-0"]').should(
      "have.css",
      "border-color",
      CHANGING_COLOR
    );

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circle-1"]').should(
      "have.css",
      "border-color",
      CHANGING_COLOR
    );

    cy.tick(LONG_DELAY_IN_MS);

    cy.get('[data-cy="circle-1"]')
    .last()
    .should("contain", "")
    .should("have.css", "border-color", DEFAULT_COLOR);

    cy.get('[data-cy="circle-1"]')
    .first()
    .should("contain", suspectText)
    .should("have.css", "border-color", CHANGING_COLOR);

    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle-0"]').should(
      "have.css",
      "border-color",
      DEFAULT_COLOR
    );
    cy.get('[data-cy="circle-1"]').should(
      "have.css",
      "border-color",
      DEFAULT_COLOR
    );
    cy.get('[data-cy="circle-2"]').should(
      "have.css",
      "border-color",
      DEFAULT_COLOR
    );
    cy.get("@inputIndex").should("have.value", "");
  });
});
