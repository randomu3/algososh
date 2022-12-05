import React from "react";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import sortinPageStyles from "./sortingPage.module.css";

import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { wait } from "../../utilities/utilities";

type TVizualization = {
  color: ElementStates;
  number: number;
};
type TSorting = "bubble" | "choice";
type TDirection = "decreasing" | "increasing";

type TInitialStateDisabled = {
  decreasing: boolean;
  increasing: boolean;
  submit: boolean;
};

type TInitialStateLoader = {
  decreasing: boolean;
  increasing: boolean;
};

const initialStateDisabled = {
  decreasing: true,
  increasing: true,
  submit: false,
};

const initialStateLoader = {
  decreasing: false,
  increasing: false,
};

export const SortingPage: React.FC = () => {
  const [disabled, setDisabled] = React.useState<TInitialStateDisabled>(
    initialStateDisabled
  );
  const [isLoader, setLoader] = React.useState<TInitialStateLoader>(
    initialStateLoader
  );
  const [vizualization, setVizualization] = React.useState<TVizualization[]>(
    []
  );
  const [array, setArray] = React.useState<number[]>([]);
  const [sorting, setSorting] = React.useState<TSorting>("bubble");
  const [direction, setDirection] = React.useState<TDirection>("decreasing");

  function onClickArrayHandler(): void {
    setVizualization([]);
    setDisabled({
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

  function onClickSelectSortHandler(): void {
    selectSort(array, direction);
  }

  async function selectSort(array: number[], flag: TDirection): Promise<void> {
    setLoader({
      increasing: flag === "decreasing",
      decreasing: flag === "increasing",
    });
    setDisabled({
      increasing: flag === "increasing",
      decreasing: flag === "decreasing",
      submit: true,
    });

    for (let j = 0; j < array.length - 1; j++) {
      let max = flag === "increasing" ? -Infinity : Infinity;
      let index = 0;

      setVizualization((vizualization) => {
        vizualization[j].color = ElementStates.Changing;
        return vizualization;
      });
      setVizualization([...vizualization]);

      await wait(500);

      for (let i = 0; i < array.length - j; i++) {
        setVizualization((vizualization) => {
          vizualization[i].color = ElementStates.Changing;
          return vizualization;
        });
        setVizualization([...vizualization]);

        if (flag === "increasing" ? array[i] > max : array[i] < max) {
          max = array[i];
          index = i;
        }
        await wait(500);
      }
      let tmp = array[array.length - 1 - j];
      array[array.length - 1 - j] = max;
      array[index] = tmp;
    }
    
    console.log(array);

    setDisabled({
      increasing: false,
      decreasing: false,
      submit: false,
    });
    setLoader({
      increasing: false,
      decreasing: false,
    });
  }
  async function bubbleSort(
    array: number[],
    flag: TDirection
  ): Promise<number[]> {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (flag === "increasing" ? array[i] < array[j] : array[i] > array[j]) {
          let tmp = array[i];
          array[i] = array[j];
          array[j] = tmp;
        }
      }
    }
    return array;
  }
  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  function randomArr(min: number, max: number, length: number) {
    const numbers = [...Array(length)];
    for (let i = 0; i < numbers.length; i += 1) {
      numbers[i] = Math.floor(getRandomArbitrary(min, max));
    }
    return numbers;
  }
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortinPageStyles.container}>
        <div className={sortinPageStyles.radioContainer}>
          <RadioInput
            checked={sorting === "choice"}
            onChange={() => setSorting("choice")}
            label="Выбор"
          ></RadioInput>
          <RadioInput
            checked={sorting === "bubble"}
            onChange={() => setSorting("bubble")}
            label="Пузырёк"
          ></RadioInput>
        </div>
        <div className={sortinPageStyles.chooseContainer}>
          <Button
            disabled={disabled.increasing}
            onClick={() => {
              setDirection("increasing");
              onClickSelectSortHandler();
            }}
            text="По возрастанию"
            sorting={Direction.Ascending}
            isLoader={isLoader.increasing}
          ></Button>
          <Button
            disabled={disabled.decreasing}
            onClick={() => {
              setDirection("decreasing");
              onClickSelectSortHandler();
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
      <ul className={sortinPageStyles.columns}>
        {vizualization.map(({ color, number }, index) => {
          return <Column key={index} state={color} index={number}></Column>;
        })}
      </ul>
    </SolutionLayout>
  );
};
