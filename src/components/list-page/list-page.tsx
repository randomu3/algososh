import React from "react";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { wait } from "../../utilities/utilities";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import listStyles from "./list.module.css";
import { LinkedList, TListLetters, TStateLoader } from "./utils";

const randomArray = () => {
  return [...Array(5)].map((e) => Math.floor(Math.random() * 100).toString());
};

const array: string[] = randomArray();
const LinkedListArray: TListLetters[] = array.map((letter) => ({
  letter: letter,
  state: ElementStates.Default,
}));

const list = new LinkedList(array);
const initialStateLoader: TStateLoader = {
  append: false,
  prepend: false,
  delHead: false,
  delTail: false,
  addIndex: false,
  delIndex: false,
};

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({
    text: "",
    index: "",
  });

  const [disabled, setDisabled] = React.useState(false);
  const [isLoader, setLoader] =
    React.useState<TStateLoader>(initialStateLoader);
  const [vizualization, setVizualization] = React.useState<TListLetters[]>();

  async function loader() {
    setVizualization([...LinkedListArray]);
    await wait(500);
  }

  async function handleAppend() {
    setDisabled(true);
    setLoader({ ...isLoader, append: true });
    list.append(values.text);
    LinkedListArray[LinkedListArray.length - 1].value = {
      letter: values.text,
      state: ElementStates.Changing,
      action: "addLetter",
    };
    await loader();
    LinkedListArray[LinkedListArray.length - 1].value = undefined; // ??
    LinkedListArray.push({
      letter: values.text,
      state: ElementStates.Modified,
    });
    await loader();
    LinkedListArray[LinkedListArray.length - 1].state = ElementStates.Default;
    setValues((prevState) => ({ ...prevState, text: "" }));
    await loader();
    setLoader({ ...isLoader, append: false });
    setDisabled(false);
  }

  async function handlePrepend() {
    setDisabled(true);
    setLoader({ ...isLoader, prepend: true });
    list.prepend(values.text);
    LinkedListArray[0].value = {
      letter: values.text,
      state: ElementStates.Changing,
      action: "addLetter",
    };
    await loader();
    LinkedListArray[0].value = undefined; // ??
    LinkedListArray.unshift({
      letter: values.text,
      state: ElementStates.Modified,
    });
    await loader();
    LinkedListArray[0].state = ElementStates.Default;
    setValues((prevState) => ({ ...prevState, text: "" }));
    await loader();
    setLoader({ ...isLoader, prepend: false });
    setDisabled(false);
  }

  async function handleDelHead() {
    setDisabled(true);
    setLoader({ ...isLoader, delHead: true });
    list.delHead();
    LinkedListArray[0] = {
      ...LinkedListArray[0],
      letter: "",
      value: {
        letter: LinkedListArray[0].letter,
        state: ElementStates.Changing,
        action: "removeLetter",
      },
    };
    await loader();
    LinkedListArray.shift();
    await loader();
    setValues((prevState) => ({ ...prevState, text: "" }));
    setLoader({ ...isLoader, delHead: false });
    setDisabled(false);
  }

  async function handleDelTail() {
    setDisabled(true);
    setLoader({ ...isLoader, delTail: true });
    const lastElement = LinkedListArray.length - 1;
    list.delTail();
    LinkedListArray[lastElement] = {
      ...LinkedListArray[lastElement],
      letter: "",
      value: {
        letter: LinkedListArray[lastElement].letter,
        state: ElementStates.Changing,
        action: "removeLetter",
      },
    };
    await loader();
    LinkedListArray.pop();
    setValues((prevState) => ({ ...prevState, text: "" }));
    await loader();
    setLoader({ ...isLoader, delTail: false });
    setDisabled(false);
  }

  async function handleAddIndex() {
    setLoader({ ...isLoader, addIndex: true });
    setDisabled(true);
    list.addIndex(values.text, parseInt(values.index));
    for (let i = 0; i <= parseInt(values.index); i++) {
      LinkedListArray[i] = {
        ...LinkedListArray[i],
        state: ElementStates.Changing,
        value: {
          letter: values.text,
          state: ElementStates.Changing,
          action: "addLetter",
        },
      };
      await loader();
      LinkedListArray[i] = {
        ...LinkedListArray[i],
        value: undefined,
      };
      setVizualization([...LinkedListArray]);
    }
    LinkedListArray[parseInt(values.index)] = {
      ...LinkedListArray[parseInt(values.index)],
      state: ElementStates.Default,
      value: undefined,
    };
    LinkedListArray.splice(parseInt(values.index), 0, {
      letter: values.text,
      state: ElementStates.Modified,
    });
    await loader();
    for (let i = 0; i <= parseInt(values.index); i++) {
      LinkedListArray[i] = {
        ...LinkedListArray[i],
        state: ElementStates.Default,
      };
    }
    setValues(() => ({ text: "", index: "" }));
    await loader();
    setLoader({ ...isLoader, addIndex: false });
    setDisabled(false);
  }

  async function handleDelIndex() {
    setDisabled(true);
    setLoader({ ...isLoader, delIndex: true });
    list.delIndex(parseInt(values.index));
    for (let i = 0; i <= parseInt(values.index); i++) {
      LinkedListArray[i] = {
        ...LinkedListArray[i],
        state: ElementStates.Changing,
      };
      await loader();
    }
    LinkedListArray[parseInt(values.index)] = {
      ...LinkedListArray[parseInt(values.index)],
      letter: "",
      state: ElementStates.Default,
      value: {
        letter: LinkedListArray[parseInt(values.index)].letter,
        state: ElementStates.Changing,
        action: "removeLetter",
      },
    };
    await loader();
    LinkedListArray.splice(parseInt(values.index), 1);
    for (let i = 0; i < parseInt(values.index); i++) {
      LinkedListArray[i] = {
        ...LinkedListArray[i],
        state: ElementStates.Default,
      };
    }
    setValues(() => ({ text: "", index: "" }));
    await loader();
    setLoader({ ...isLoader, delIndex: false });
    setDisabled(false);
  }

  React.useEffect(() => {
    setVizualization([...LinkedListArray]);
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <div className={listStyles.container}>
        <Input
          extraClass={listStyles.inputLetter}
          type={"text"}
          maxLength={4}
          isLimitText={true}
          placeholder={"Введите значение"}
          value={values.text}
          onChange={handleChange}
          name={"text"}
        />
        <Button
          text={"Добавить в head"}
          onClick={handlePrepend}
          isLoader={isLoader.prepend}
          disabled={disabled || LinkedListArray.length >= 10 || !values.text}
        />
        <Button
          text={"Добавить в tail"}
          onClick={handleAppend}
          isLoader={isLoader.append}
          disabled={disabled || LinkedListArray.length >= 10 || !values.text}
        />
        <Button
          text={"Удалить из head"}
          onClick={handleDelHead}
          isLoader={isLoader.delHead}
          disabled={disabled || LinkedListArray.length <= 1}
        />
        <Button
          text={"Удалить из tail"}
          onClick={handleDelTail}
          isLoader={isLoader.delTail}
          disabled={disabled || LinkedListArray.length <= 1}
        />
      </div>
      <div className={listStyles.container}>
        <Input
          extraClass={listStyles.inputLetter}
          type={"number"}
          placeholder={"Введите индекс"}
          value={values.index}
          onChange={handleChange}
          name={"index"}
        />
        <Button
          extraClass={listStyles.buttonLetter}
          text={"Добавить по индексу"}
          onClick={handleAddIndex}
          isLoader={isLoader.addIndex}
          disabled={
            disabled ||
            !values.index ||
            parseInt(values.index) > LinkedListArray.length - 1 ||
            parseInt(values.index) < 0
          }
        />
        <Button
          extraClass={listStyles.buttonLetter}
          text={"Удалить по индексу"}
          onClick={handleDelIndex}
          isLoader={isLoader.delIndex}
          disabled={
            disabled ||
            !values.index ||
            parseInt(values.index) > LinkedListArray.length - 1 ||
            parseInt(values.index) < 0
          }
        />
      </div>

      <div data-cy="container" className={listStyles.listContainerLetter}>
        {vizualization?.map((letter, index) => {
          return (
            <li key={index} className={listStyles.listLetter}>
              {letter.value && (
                <Circle
                  extraClass={`${listStyles[`${letter.value.action}`]}`}
                  letter={letter.value.letter}
                  state={letter.value.state}
                  index={index}
                  isSmall
                />
              )}
              <Circle
                letter={letter?.letter}
                state={letter?.state}
                index={index}
              />
              {index !== vizualization?.length - 1 && <ArrowIcon />}
            </li>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
