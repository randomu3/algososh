import { StringComponent } from "./string";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

jest.setTimeout(10000);
describe("Корректно разворачивает строку:", () => {
  it("-> пустую строку.", async function () {
    const emptyString = ""; // пустая строка
    render(<StringComponent />, { wrapper: BrowserRouter }); //
    const input = screen.getByPlaceholderText("Введите текст");
    const button = screen.getByText("Развернуть");
    expect(emptyString).toBe(input.textContent);
    fireEvent.click(button);
    await waitFor(
      () => {
        const collectionQueryLetters = screen.queryAllByTestId("circle-letter");
        expect([]).toStrictEqual(collectionQueryLetters);
      },
      { timeout: 5000 }
    );
  });
  it("-> с чётным количеством символов.", async function () {
    const evenString = "Жека"; // четно
    render(<StringComponent />, { wrapper: BrowserRouter }); //
    const input = screen.getByPlaceholderText("Введите текст");
    fireEvent.change(input, { target: { value: evenString } });
    fireEvent.click(screen.getByText("Развернуть"));
    await waitFor(
      () => {
        const collectionQueryLetters = screen.queryAllByTestId("circle-letter");
        const arrayStringLetters = collectionQueryLetters.map((letter) => {
          return letter.textContent;
        });
        expect(arrayStringLetters.join("")).toBe(
          evenString.split("").reverse().join("")
        );
      },
      { timeout: 5000 }
    );
  });

  it("-> с нечетным количеством символов.", async function () {
    const oddString = "Кошка"; // нечетно
    render(<StringComponent />, { wrapper: BrowserRouter }); //
    const input = screen.getByPlaceholderText("Введите текст");
    fireEvent.change(input, { target: { value: oddString } });
    fireEvent.click(screen.getByText("Развернуть"));
    await waitFor(
      () => {
        const collectionQueryLetters = screen.queryAllByTestId("circle-letter");
        const arrayStringLetters = collectionQueryLetters.map((letter) => {
          return letter.textContent;
        });
        expect(arrayStringLetters.join("")).toBe(
          oddString.split("").reverse().join("")
        );
      },
      { timeout: 5000 }
    );
  });

  it("-> с одним символом.", async function () {
    const letter = "К";
    render(<StringComponent />, { wrapper: BrowserRouter }); //
    const input = screen.getByPlaceholderText("Введите текст");
    fireEvent.change(input, { target: { value: letter } });
    fireEvent.click(screen.getByText("Развернуть"));
    await waitFor(
      () => {
        const collectionQueryLetters = screen.queryAllByTestId("circle-letter");
        const arrayStringLetters = collectionQueryLetters.map((letter) => {
          return letter.textContent;
        });
        expect(arrayStringLetters.join("")).toBe(letter);
      },
      { timeout: 5000 }
    );
  });
});
