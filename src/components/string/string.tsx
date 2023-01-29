import React from "react";
import { useForm } from "../../hooks/useForm";
import { wait } from "../../utilities/utilities";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import stringStyles from "./string.module.css";

enum EColors {
  Default = "",
  Changing = "changing",
  Modified = "modified",
}

type TVizualization = {
  value: string;
  color: EColors;
};

export const StringComponent: React.FC = () => {
  const [isLoader, setLoader] = React.useState(false);
  const { values, setValues } = useForm({
    text: "",
  });
  const [vizualization, setVizualization] = React.useState<TVizualization[]>(
    []
  );

  async function onClickHandler(): Promise<void> {
    setLoader(true);
    const array: TVizualization[] = values.text.split("").map((letter) => ({
      value: letter,
      color: EColors.Default,
    }));

    for (let i = 0; i <= array.length / 2; i++) {
      array[i].color = EColors.Changing;
      array[array.length - i - 1].color = EColors.Changing;

      setVizualization([...array]);
      let tmp = array[i];
      array[i] = array[array.length - i - 1];
      array[array.length - i - 1] = tmp;
      await wait(1000);

      array[i].color = EColors.Modified;
      array[array.length - i - 1].color = EColors.Modified;
    }

    setVizualization([...array]);
    setLoader(false);
  }

  function onChangeHandler(e: React.FormEvent<HTMLInputElement>): void {
    const value = e.currentTarget.value;
    if (value.length <= 11) {
      setValues({ text: value });
    }
  }
  

  return (
    <SolutionLayout title="Строка">
      <div className={stringStyles.container}>
        <div className={stringStyles.input}>
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
        <p className={stringStyles.subtitle}>Максимум — 11 символов</p>
      </div>
      <div className={stringStyles.vizualization}>
        {vizualization.map(({ value, color }, index) => (
          <Circle
            extraClass={stringStyles[color]}
            key={index}
            letter={value}
            index={index}
          ></Circle>
        ))}
      </div>
    </SolutionLayout>
  );
};
