import React from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";

import stackStyles from "./stackPage.module.css";
import { wait } from "../../utilities/utilities";
import { Stack, TLoader, TStack } from "./utils";
import { useForm } from "../../hooks/useForm";

const initialStateStack = new Stack<TStack>();
const InitialStateLoader: TLoader = {
  push: false,
  pop: false,
};

export const StackPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({
    text: "",
  });

  const [isLoader, setLoader] = React.useState<TLoader>(InitialStateLoader);
  const [stack, setStack] = React.useState<Stack<TStack>>(initialStateStack);
  const [vizualization, setVizualization] = React.useState<TStack[]>([]);

  async function loader(stack: Stack<TStack>): Promise<void> {
    setStack(stack);
    setVizualization([...stack.getStack()]);
    await wait(500);
  }

  function clear(): void {
    stack.clear();
    setStack(stack);
    setVizualization([]);
  }

  async function push(): Promise<void> {
    setLoader({ ...isLoader, push: true });
    stack.push({ letter: values.text, state: ElementStates.Changing });
    setValues({ text: "" });
    await loader(stack);
    stack.peak().state = ElementStates.Default;
    setLoader({ ...isLoader, push: false });
  }

  async function pop(): Promise<void> {
    setLoader({ ...isLoader, pop: true });
    stack.peak().state = ElementStates.Changing;
    await loader(stack);
    stack.pop();
    await loader(stack);
    setLoader({ ...isLoader, pop: false });
  }

  return (
    <SolutionLayout title="Стек">
      <div className={stackStyles.container}>
        <div className={stackStyles.form}>
          <div className={stackStyles.subForm}>
            <Input
              extraClass={stackStyles.input}
              value={values.text}
              name={"text"}
              maxLength={4}
              onChange={handleChange}
            ></Input>
            <Button
              disabled={!values.text}
              extraClass={stackStyles.button}
              isLoader={isLoader.push}
              onClick={() => push()}
              text="Добавить"
            ></Button>
            <Button
              disabled={!stack.getLength()}
              extraClass={stackStyles.button}
              isLoader={isLoader.pop}
              onClick={() => pop()}
              text="Удалить"
            ></Button>
          </div>
          <Button
            disabled={!stack.getLength()}
            extraClass={stackStyles.button}
            onClick={() => clear()}
            text="Очистить"
          ></Button>
        </div>
        <p className={stackStyles.subtitle}>Максимум — 4 символа</p>
      </div>
      <div className={stackStyles.circles}>
        {vizualization.map((letter, index) => {
          return (
            <Circle
              key={index}
              state={letter.state}
              index={index}
              head={index === stack.getLength() - 1 ? "top" : ""}
              letter={letter.letter}
            ></Circle>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
