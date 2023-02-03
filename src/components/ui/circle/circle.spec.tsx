// link.test.js
import { Circle } from "./circle";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { ElementStates } from "../../../types/element-states";

describe("Проверяем при помощи снэпшотов корректную отрисовку элемента", () => {
  it("-> без буквы:", () => {
    render(<Circle letter={""} />);
    const circle = screen.getByTestId("circle");
    expect(circle).toMatchSnapshot();
  });
  it("-> с буквами (Snapshot):", () => {
    render(<Circle letter={"test-text"} />);
    const circle = screen.getByTestId("circle");
    expect(circle).toMatchSnapshot();
  });

  it("-> с head (Snapshot):", () => {
    render(<Circle head={"0"} />);
    const circle = screen.getByTestId("circle");
    expect(circle).toMatchSnapshot();
  });

  it("-> с react-элементом в head:", () => {
    render(<Circle head={<>text</>} />);
    const circle = screen.getByTestId("circle");
    expect(circle).toMatchSnapshot();
  });

  it("-> с tail:", () => {
    render(<Circle tail={"0"} />);
    const circle = screen.getByTestId("circle");
    expect(circle).toMatchSnapshot();
  });

  it("-> с react-элементом в tail:", () => {
    render(<Circle tail={<>text</>} />);
    const circle = screen.getByTestId("circle");
    expect(circle).toMatchSnapshot();
  });

  it("-> с index:", () => {
    render(<Circle index={0} />);
    const circle = screen.getByTestId("circle");
    expect(circle).toMatchSnapshot();
  });

  it("-> с пропом isSmall === true:", () => {
    render(<Circle isSmall={true} />);
    const circle = screen.getByTestId("circle");
    expect(circle).toMatchSnapshot();
  });

  it("-> в состоянии default:", () => {
    render(<Circle state={ElementStates.Default} />);
    const circle = screen.getByTestId("circle");
    expect(circle).toMatchSnapshot();
  });

  it("-> в состоянии changing:", () => {
    render(<Circle state={ElementStates.Changing} />);
    const circle = screen.getByTestId("circle");
    expect(circle).toMatchSnapshot();
  });

  it("-> в состоянии modified:", () => {
    render(<Circle state={ElementStates.Modified} />);
    const circle = screen.getByTestId("circle");
    expect(circle).toMatchSnapshot();
  });
});
