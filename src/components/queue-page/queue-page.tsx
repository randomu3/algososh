import React from "react";
import { ElementStates } from "../../types/element-states";
import { wait } from "../../utilities/utilities";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import queueStyles from "./queuePage.module.css";

type TVizualization = {
  value?: string;
  color?: ElementStates;
  head?: string;
  tail?: string;
  use: boolean;
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

const initialStateVizualization: TVizualization[] = new Array(7)
  .fill(null)
  .map(() => {
    return { color: ElementStates.Default, use: false };
  });

export const QueuePage: React.FC = () => {
  const [disabled, setDisabled] = React.useState<TInitialStateDisabled>(
    initialStateDisabled
  );
  const [text, setText] = React.useState("");
  const [isLoader, setLoader] = React.useState<TIinitalStateLoader>(
    initialStateLoader
  );
  const [vizualization, setVizualization] = React.useState<TVizualization[]>(
    initialStateVizualization
  );

  function onChangeHandler(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    if (value.length <= 4) {
      setText(value);
    }
  } // validation

  async function onClickAddHandler(): Promise<void> {
    for (let i = 0; i < vizualization.length - 1; i++) {
      setVizualization((vizualization) => {
        [...vizualization, (vizualization[i].tail = "")];
        return [...vizualization];
      });
      if (
        vizualization[i].head === "head" &&
        vizualization[i].tail === "tail" &&
        !vizualization[i].value
      ) {
        setLoader({ ...isLoader, add: true });
        setVizualization((vizualization) => {
          [...vizualization, (vizualization[i].color = ElementStates.Changing)];
          return [...vizualization];
        });
        await wait(500);
        setVizualization((vizualization) => {
          [
            ...vizualization,
            (vizualization[i].tail = "tail"),
            (vizualization[i].value = text),
            (vizualization[i].color = ElementStates.Default),
            (vizualization[i].use = true),
          ];
          return [...vizualization];
        });
        setLoader({ ...isLoader, add: false });
        break;
      }
      if (
        vizualization[i].value &&
        i < vizualization.length - 1 &&
        !vizualization[i + 1].value &&
        vizualization[i + 1].use === false
      ) {
        setLoader({ ...isLoader, add: true });
        setVizualization((vizualization) => {
          [
            ...vizualization,
            (vizualization[i + 1].color = ElementStates.Changing),
          ];
          return [...vizualization];
        });
        await wait(500);
        setVizualization((vizualization) => {
          [
            ...vizualization,
            ((vizualization[i + 1].value = text),
            (vizualization[i + 1].tail = "tail"),
            (vizualization[i + 1].use = true),
            (vizualization[i + 1].color = ElementStates.Default)),
          ];
          return [...vizualization];
        });
        setLoader({ ...isLoader, add: false });
        break;
      }
    }
    if (!vizualization[0].value && !vizualization[0].use) {
      setLoader({ ...isLoader, add: true });
      setVizualization((vizualization) => {
        [...vizualization, (vizualization[0].color = ElementStates.Changing)];
        return [...vizualization];
      });
      await wait(500);
      setVizualization((vizualization) => {
        [
          ...vizualization,
          ((vizualization[0].value = text),
          (vizualization[0].tail = "tail"),
          (vizualization[0].use = true),
          (vizualization[0].color = ElementStates.Default)),
        ];
        return [...vizualization];
      });
      setLoader({ ...isLoader, add: false });
    }

    if (vizualization[vizualization.length - 1].use) {
      setDisabled({
        add: true,
        del: false,
        clear: false,
      });
    }
  }

  React.useEffect(() => {
    let value = 0;
    vizualization.forEach((e) => {
      if (e.use) {
        if (e.value) {
          value++;
        }
        return setDisabled({ ...disabled, del: false, clear: false });
      }
    });
    for (let i = 0; i < vizualization.length; i++) {
      if (
        vizualization[i].tail &&
        vizualization[i].use &&
        !vizualization[i].value
      ) {
        vizualization[i].head = "head";
      }
      if (vizualization[i].value && i !== vizualization.length) {
        vizualization[i].head = "head";
        break;
      }
    }
    if (value === 0) {
      return setDisabled({...disabled, del: true})
    }
    return () => {
      [...vizualization];
    };
  }, [vizualization]);

  React.useEffect(() => {
    text.length
      ? setDisabled({ ...disabled, add: false })
      : setDisabled({ ...disabled, add: true });
    return () => {
      setDisabled({ ...disabled });
    };
  }, [text]);

  async function onClickDelHandler(): Promise<void> {
    for (let i = 0; i < vizualization.length; i++) {
      if (vizualization[i].value) {
        setLoader({ ...isLoader, del: true });
        setVizualization((vizualization) => {
          [...vizualization, (vizualization[i].color = ElementStates.Changing)];
          return [...vizualization];
        });
        await wait(500);
        setVizualization((vizualization) => {
          [
            ...vizualization,
            delete vizualization[i].value,
            delete vizualization[i].head,
            (vizualization[i].color = ElementStates.Default),
          ];
          return [...vizualization];
        });

        if (i === vizualization.length - 1) {
          setVizualization((vizualization) => {
            [
              ...vizualization,
              (vizualization[vizualization.length - 1].head = "head"),
              (vizualization[vizualization.length - 1].tail = ""),
            ];
            return [...vizualization];
          });
        }
        setLoader({ ...isLoader, del: false });
        break;
      }
    }
  }

  async function onClickClearHandler() {
    vizualization.forEach((e, index) => {
      setVizualization((vizualization) => {
        [
          ...vizualization,
          delete vizualization[index].value,
          (vizualization[index].use = false),
          (vizualization[index].head = ""),
          (vizualization[index].tail = ""),
        ];
        return [...vizualization];
      });
    });
    setDisabled({ add: false, del: true, clear: true });
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={queueStyles.container}>
        <div className={queueStyles.form}>
          <div className={queueStyles.subForm}>
            <Input
              extraClass={queueStyles.input}
              value={text}
              onChange={onChangeHandler}
            ></Input>
            <Button
              disabled={disabled.add}
              extraClass={queueStyles.button}
              isLoader={isLoader.add}
              onClick={onClickAddHandler}
              text="Добавить"
            ></Button>
            <Button
              disabled={disabled.del}
              extraClass={queueStyles.button}
              isLoader={isLoader.del}
              onClick={onClickDelHandler}
              text="Удалить"
            ></Button>
          </div>
          <Button
            disabled={disabled.clear}
            isLoader={isLoader.clear}
            extraClass={queueStyles.button}
            onClick={onClickClearHandler}
            text="Очистить"
          ></Button>
        </div>
        <p className={queueStyles.subtitle}>Максимум — 4 символа</p>
      </div>
      <div className={queueStyles.circles}>
        {vizualization.map(({ color, head, value, tail }, index) => {
          return (
            <Circle
              tail={tail}
              key={index}
              state={color}
              head={head}
              index={index}
              letter={value}
            ></Circle>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
