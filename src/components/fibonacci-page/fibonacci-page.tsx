import React from "react";
import { useForm } from "../../hooks/useForm";
import { wait } from "../../utilities/utilities";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import fibonacciStyles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [isLoader, setLoader] = React.useState(false);
  const { values, handleChange, setValues } = useForm({
    text: "",
  });
  const [vizualization, setVizualization] = React.useState<number[]>([]);

  async function onClickHandler(): Promise<void> {
    setLoader(true);
    setValues(() => {
      return { text: "" };
    });
    let f1 = 0,
      f2 = 1,
      cf = 0;
    for (let i = 1; i <= Number(values.text); i++) {
      // eslint-disable-next-line
      setVizualization((vizualization) => [...vizualization, f2]);
      cf = f1 + f2;
      f1 = f2;
      f2 = cf;
      await wait(500);
      if (i === Number(values.text)) {
        // eslint-disable-next-line
        setVizualization((vizualization) => [...vizualization, f2]);
      }
    }
    setLoader(false);
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.currentTarget.value;
    if (Number(value) <= 19) {
      handleChange(e);
    }
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={fibonacciStyles.container}>
        <div className={fibonacciStyles.input}>
          <Input
            name={"text"}
            value={values.text}
            onChange={onChangeHandler}
          ></Input>
          <Button
            disabled={!values.text}
            isLoader={isLoader}
            onClick={onClickHandler}
            text="Развернуть"
          ></Button>
        </div>
        <p className={fibonacciStyles.subtitle}>Максимальное число — 19</p>
      </div>
      <div className={fibonacciStyles.vizualization}>
        {vizualization.map((number, index) => (
          <Circle key={index} index={index} letter={number.toString()}></Circle>
        ))}
      </div>
    </SolutionLayout>
  );
};
