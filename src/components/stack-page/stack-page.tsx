import React, { useCallback } from "react";
import { consumers } from "stream";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";

import stackStyles from "./stackPage.module.css";
import { wait } from "../../utilities/utilities";

type TVizualization = {
  value?: string;
  color: ElementStates;
  top?: string;
};

type TInitialStateDisabled = {
  add: boolean;
  del: boolean;
  clear: boolean;
};

type TIinitalStateLoader = {
  add: boolean;
  del: boolean;
  clear: boolean;
};

const initialStateDisabled: TInitialStateDisabled = {
  add: false,
  del: true,
  clear: true,
};

const initialStateLoader: TIinitalStateLoader = {
  add: false,
  del: false,
  clear: false,
};

export const StackPage: React.FC = () => {
  const [disabled, setDisabled] = React.useState<TInitialStateDisabled>(
    initialStateDisabled
  );
  const [text, setText] = React.useState("");
  const [isLoader, setLoader] = React.useState<TIinitalStateLoader>(
    initialStateLoader
  );
  const [vizualization, setVizualization] = React.useState<TVizualization[]>(
    []
  );

  function onChangeHandler(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    if (value.length <= 4) {
      setText(value);
    }
  }

  function clearVizualizationTop(array: TVizualization[], flag?: "del"): void {
    if (!flag) {
      for (let i = 0; i < array.length; i++) {
        setVizualization((vizualization) => {
          [...vizualization, (vizualization[i].top = "")];
          return vizualization;
        });
      }
    }

    if (flag === "del") {
      setVizualization((vizualization) => {
        debugger;
        if (vizualization.length) {
          [
            ...vizualization,
            (vizualization[
              array.length > 1 ? array.length - 2 : array.length - 1
            ].top = "top"),
          ];
        }
        return vizualization;
      });
    }
  }

  async function onClickAddHandler(): Promise<void> {
    if (!text.length) return;
    setText("");

    if (vizualization.length)
      setDisabled({ ...disabled, del: false, clear: false });
    if (vizualization.length > 2) setDisabled({ ...disabled, add: true });

    setDisabled({
      add: true,
      del: true,
      clear: true,
    });
    setLoader({
      add: true,
      del: false,
      clear: false,
    });

    setVizualization([
      ...vizualization,
      { value: text, color: ElementStates.Changing, top: "top" },
    ]);

    clearVizualizationTop(vizualization);

    await wait(500);

    setVizualization([
      ...vizualization,
      { value: text, color: ElementStates.Default, top: "top" },
    ]);

    setLoader({
      add: false,
      del: false,
      clear: false,
    });
    setDisabled({
      add: !(vizualization.length < 3),
      del: false,
      clear: false,
    });
  }

  async function onClickDelHandler(): Promise<void> {
    setLoader({
      add: false,
      del: true,
      clear: false,
    });
    setDisabled({
      add: true,
      del: true,
      clear: true,
    });

    setVizualization((vizualization) => {
      [
        ...vizualization,
        (vizualization[vizualization.length - 1].color =
          ElementStates.Changing),
      ];
      return vizualization;
    });
    setVizualization([...vizualization]);

    await wait(500);

    setVizualization([...vizualization].slice(0, -1));
    clearVizualizationTop(vizualization, "del");

    if (disabled.add === true) setDisabled({ ...disabled, add: false });
    if (vizualization.length === 1) setDisabled({ ...disabled, del: false });

    setLoader({
      add: false,
      del: false,
      clear: false,
    });
    setDisabled({
      add: false,
      del: false,
      clear: false,
    });
    if (vizualization.length === 1)
      setDisabled({ add: false, del: true, clear: true });
  }

  function onClickClearHandler() {
    setVizualization([]);
    setDisabled({ ...disabled, add: false, del: true, clear: true });
  }

  return (
    <SolutionLayout title="Стек">
      <div className={stackStyles.container}>
        <div className={stackStyles.form}>
          <div className={stackStyles.subForm}>
            <Input
              extraClass={stackStyles.input}
              value={text}
              onChange={onChangeHandler}
            ></Input>
            <Button
              disabled={disabled.add}
              extraClass={stackStyles.button}
              isLoader={isLoader.add}
              onClick={onClickAddHandler}
              text="Добавить"
            ></Button>
            <Button
              disabled={disabled.del}
              extraClass={stackStyles.button}
              isLoader={isLoader.del}
              onClick={onClickDelHandler}
              text="Удалить"
            ></Button>
          </div>
          <Button
            disabled={disabled.clear}
            isLoader={isLoader.clear}
            extraClass={stackStyles.button}
            onClick={onClickClearHandler}
            text="Очистить"
          ></Button>
        </div>
        <p className={stackStyles.subtitle}>Максимум — 4 символа</p>
      </div>
      <div className={stackStyles.circles}>
        {vizualization.map(({ color, top, value }, index) => {
          return (
            <Circle
              key={index}
              state={color}
              head={top}
              index={index}
              letter={value}
            ></Circle>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
