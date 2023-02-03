// link.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Button } from "./button";

describe("Проверяем при помощи снэпшотов корректную отрисовку:", () => {
  it("-> Кнопки с текстом", () => {
    render(<Button text={"text"} />);
    const button = screen.getByRole("button");
    expect(button).toMatchSnapshot();
  });

  it("-> Кнопки без текста", () => {
    render(<Button text={""} />);
    const button = screen.getByRole("button");
    expect(button).toMatchSnapshot();
  });

  it("-> Заблокированной кнопки", () => {
    render(<Button disabled />);
    const button = screen.getByRole<HTMLButtonElement>("button");
    expect(button).toMatchSnapshot();
  });

  it("-> Кнопки с индикацией загрузки", () => {
    render(<Button isLoader={true} />);
    const button = screen.getByRole("button");
    expect(button).toMatchSnapshot();
  });

  it("-> Вызова колбека при клике на кнопку", () => {
    const mockFn = jest.fn();
    render(<Button onClick={mockFn}/>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalled();
  });
});
