import React from "react";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import sortinPageStyles from "./sortingPage.module.css";

import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { wait } from "../../utilities/utilities";
import {
  TDirection,
  TInitialStateDisabled,
  TInitialStateLoader,
  TProps,
  TSorting,
  TVizualization,
} from "./utils";

const initialStateDisabled = {
  bubble: false,
  choice: false,
  decreasing: false,
  increasing: false,
  submit: false,
};

const initialStateLoader = {
  decreasing: false,
  increasing: false,
};

export const SortingPage: React.FC<TProps> = ({ inititalArray }) => {
  const [disabled, setDisabled] =
    React.useState<TInitialStateDisabled>(initialStateDisabled);
  const [isLoader, setLoader] =
    React.useState<TInitialStateLoader>(initialStateLoader);
  const [vizualization, setVizualization] = React.useState<TVizualization[]>(
    []
  );
  const [array, setArray] = React.useState<number[]>(() => {
    if (inititalArray) {
      return inititalArray;
    }
    const minRandom = Math.floor(getRandomArbitrary(3, 17));
    const maxRandom = Math.floor(getRandomArbitrary(3, 17));
    return randomArr(minRandom, 100, maxRandom);
  });
  const [sorting, setSorting] = React.useState<TSorting>("bubble");

  function onClickArrayHandler(): void {
    setVizualization([]);
    setDisabled({
      bubble: false,
      choice: false,
      decreasing: false,
      increasing: false,
      submit: false,
    });
    const minRandom = Math.floor(getRandomArbitrary(3, 17));
    const maxRandom = Math.floor(getRandomArbitrary(3, 17));
    const arr = randomArr(minRandom, 100, maxRandom);
    setArray(arr);
    arr.forEach((number) => {
      setVizualization((vizualization) => [
        ...vizualization,
        { color: ElementStates.Default, number: Math.floor(number) },
      ]);
    });
  }

  function modifiedColorColumn(
    index: number,
    ElementStates: ElementStates,
    number: number
  ): void {
    setVizualization((vizualization) => {
      vizualization[index].color = ElementStates;
      vizualization[index].number = number;
      return [...vizualization];
    });
  }

  function defaultColorColumn(
    index: number,
    ElementStates: ElementStates
  ): void {
    setVizualization((vizualization) => {
      vizualization[index].color = ElementStates;
      return [...vizualization];
    });
  }

  function changingColorColumn(
    index: number,
    ElementStates: ElementStates
  ): void {
    setVizualization((vizualization) => {
      vizualization[index].color = ElementStates;
      return [...vizualization];
    });
  }

  async function selectSort(array: number[], flag: TDirection): Promise<void> {
    setLoader({
      increasing: flag === "increasing",
      decreasing: flag === "decreasing",
    });
    setDisabled({
      bubble: true,
      choice: true,
      increasing: true,
      decreasing: true,
      submit: true,
    });

    let min = 0;
    let buff = 0;

    for (let j = 0; j < array.length - 1; j++) {
      min = flag === "increasing" ? Infinity : -Infinity;
      let index = 0;
      changingColorColumn(j, ElementStates.Changing);

      for (let i = j; i < array.length; i++) {
        changingColorColumn(i, ElementStates.Changing);

        await wait(1000);
        if (flag === "increasing" ? array[i] < min : array[i] > min) {
          min = array[i];
          index = i;
        }

        if (i !== j) defaultColorColumn(i, ElementStates.Default);
      }
      defaultColorColumn(j, ElementStates.Default);

      buff = array[j];
      array[j] = min;
      array[index] = buff;

      modifiedColorColumn(j, ElementStates.Modified, min);
    }

    modifiedColorColumn(
      array.length - 1,
      ElementStates.Modified,
      array[array.length - 1]
    );

    setDisabled({
      bubble: false,
      choice: false,
      increasing: false,
      decreasing: false,
      submit: false,
    });
    setLoader({
      increasing: false,
      decreasing: false,
    });
  }

  async function bubbleSort(array: number[], flag: TDirection): Promise<void> {
    setLoader({
      increasing: flag === "increasing",
      decreasing: flag === "decreasing",
    });
    setDisabled({
      bubble: true,
      choice: true,
      increasing: true,
      decreasing: true,
      submit: true,
    });

    let tmp = 0;
    for (let j = 0; j < array.length - 1; j++) {
      for (let i = 0; i < array.length - 1 - j; i++) {
        changingColorColumn(i, ElementStates.Changing);
        changingColorColumn(i + 1, ElementStates.Changing);
        await wait(1000);

        if (
          flag === "increasing"
            ? array[i] > array[i + 1]
            : array[i] < array[i + 1]
        ) {
          tmp = array[i + 1];
          array[i + 1] = array[i];
          array[i] = tmp;
        }

        defaultColorColumn(i, ElementStates.Default);
        if (i + 1 === array.length - 1 - j)
          modifiedColorColumn(
            array.length - 1 - j,
            ElementStates.Modified,
            array[array.length - 1 - j]
          );

        if (j === array.length - 2 && i === array.length - 2 - j) {
          modifiedColorColumn(0, ElementStates.Modified, array[i]);
        }
      }
    }

    setDisabled({
      bubble: false,
      choice: false,
      increasing: false,
      decreasing: false,
      submit: false,
    });
    setLoader({
      increasing: false,
      decreasing: false,
    });
  }

  function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  function randomArr(min: number, max: number, length: number): number[] {
    const numbers = [...Array(length)];
    for (let i = 0; i < numbers.length; i += 1) {
      numbers[i] = Math.floor(getRandomArbitrary(min, max));
    }
    return numbers;
  }

  React.useEffect(() => {
    array.forEach((number) => {
      setVizualization((vizualization) => [
        ...vizualization,
        { color: ElementStates.Default, number: Math.floor(number) },
      ]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortinPageStyles.container}>
        <div className={sortinPageStyles.radioContainer}>
          <RadioInput
            disabled={disabled.choice}
            checked={sorting === "choice"}
            onChange={() => setSorting("choice")}
            label="Выбор"
          ></RadioInput>
          <RadioInput
            disabled={disabled.bubble}
            checked={sorting === "bubble"}
            onChange={() => setSorting("bubble")}
            label="Пузырёк"
          ></RadioInput>
        </div>
        <div className={sortinPageStyles.chooseContainer}>
          <Button
            disabled={disabled.increasing}
            onClick={() => {
              if (sorting === "bubble") bubbleSort(array, "increasing");
              if (sorting === "choice") selectSort(array, "increasing");
            }}
            text="По возрастанию"
            sorting={Direction.Ascending}
            isLoader={isLoader.increasing}
          ></Button>
          <Button
            disabled={disabled.decreasing}
            onClick={() => {
              if (sorting === "bubble") bubbleSort(array, "decreasing");
              if (sorting === "choice") selectSort(array, "decreasing");
            }}
            text="По убыванию"
            sorting={Direction.Descending}
            isLoader={isLoader.decreasing}
          ></Button>
        </div>
        <Button
          disabled={disabled.submit}
          extraClass={sortinPageStyles.submit}
          text="Новый массив"
          onClick={onClickArrayHandler}
        ></Button>
      </div>
      <ul data-testid="list" className={sortinPageStyles.columns}>
        {vizualization.map(({ color, number }, index) => {
          return <Column key={index} state={color} index={number}></Column>;
        })}
      </ul>
    </SolutionLayout>
  );
};
