import { SortingPage } from "./sorting-page";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Button } from "../ui/button/button";

jest.setTimeout(15000);
describe("Корректно сортирует:", () => {
  it("-> пустой массив.", function () {
    render(<SortingPage inititalArray={[]} />, { wrapper: BrowserRouter });
    const list = screen.getByTestId("list");
    expect("").toBe(list.innerHTML);
  });

  it("-> массив из одного элемента.", async function () {
    render(<SortingPage inititalArray={[1]} />, { wrapper: BrowserRouter });
    const column = screen.getAllByTestId("column");
    expect(1).toBe(column.length);
    const buttonDescending = screen.getByText("По убыванию");
    const buttonAscending = screen.getByText("По возрастанию");
    fireEvent.click(buttonAscending);
    await waitFor(
      () => {
        const columns = screen.getAllByTestId("index");
        const arrayColumns = columns.map((index) => {
          return Number(index.textContent);
        });
        expect([1]).toEqual(arrayColumns);
      },
      { timeout: 3000 }
    );
    fireEvent.click(buttonDescending);
    await waitFor(
      () => {
        const columns = screen.getAllByTestId("index");
        const arrayColumns = columns.map((index) => {
          return Number(index.textContent);
        });
        expect([1]).toEqual(arrayColumns);
      },
      { timeout: 3000 }
    );
  });

  it("-> массив из нескольких элементов.", async () => {
    render(<SortingPage inititalArray={[2, 1, 3]} />, { wrapper: BrowserRouter });
    const column = screen.getAllByTestId("column");
    expect(3).toBe(column.length);
    const buttonDescending = screen.getByText("По убыванию");
    const buttonAscending = screen.getByText("По возрастанию");
    fireEvent.click(buttonAscending);
    await waitFor(
      () => {
        const columns = screen.getAllByTestId("index");
        const arrayColumns = columns.map((index) => {
          return Number(index.textContent);
        });
        expect([1,2,3]).toEqual(arrayColumns);
      },
      { timeout: 6000 }
    );
    fireEvent.click(buttonDescending);
    await waitFor(
      () => {
        const columns = screen.getAllByTestId("index");
        const arrayColumns = columns.map((index) => {
          return Number(index.textContent);
        });
        expect([3,2,1]).toEqual(arrayColumns);
      },
      { timeout: 6000 }
    );
  });
});
