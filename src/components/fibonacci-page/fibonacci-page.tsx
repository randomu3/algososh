import React from "react";
import { wait } from "../../utilities/utilities";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import fibonacciStyles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [isLoader, setLoader] = React.useState(false);
  const [text, setText] = React.useState("");
  const [vizualization, setVizualization] = React.useState<number[]>([]);

  async function onClickHandler(): Promise<void> {
    setLoader(true);
    let f1 = 0,
      f2 = 1,
      cf = 0;
    for (let i = 1; i <= Number(text); i++) {
      // eslint-disable-next-line
      setVizualization((vizualization) => [...vizualization, f2]);
      cf = f1 + f2;
      f1 = f2;
      f2 = cf;
      await wait(500);
      if (i === Number(text)) {
        // eslint-disable-next-line
        setVizualization((vizualization) => [...vizualization, f2]);
      }
    }
    setLoader(false);
  }

  function onChangeHandler(e: React.FormEvent<HTMLInputElement>): void {
    const value = e.currentTarget.value;
    if (Number(value) <= 19) {
      setText(value);
    }
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={fibonacciStyles.container}>
        <div className={fibonacciStyles.input}>
          <Input value={text} onChange={onChangeHandler}></Input>
          <Button
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
