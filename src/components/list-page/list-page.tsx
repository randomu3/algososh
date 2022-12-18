import React from "react";
import { ElementStates } from "../../types/element-states";
import { wait } from "../../utilities/utilities";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import listStyles from "./list.module.css";

export interface ILinkedList<T> {
  append: (item: T) => void;
  prepend: (item: T) => void;
  delHead: () => void;
  delTail: () => void;
  addIndex: (item: T, index: number) => void;
  delIndex: (index: number) => void;
}

type TListLetters = {
  letter: string;
  state: ElementStates;
  value?: { // ??
    letter: string;
    state: ElementStates;
    action: "addLetter" | "removeLetter";
  };
};

class ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  constructor(value: T, next?: ListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

class LinkedList<T> implements ILinkedList<T> {
  private size: number;
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;

  constructor(array?: T[]) {
    this.size = 0;
    this.head = null;
    this.tail = null;
    array?.forEach((e) => this.append(e));
  }

  append = (letter: T) => {
    const node = new ListNode(letter);

    if (!this.tail || !this.head) {
      this.tail = node;
      this.head = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
    this.size++;
  };

  prepend = (letter: T) => {
    const node = new ListNode(letter, this.head);
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    this.size++;
  };

  delHead = () => {
    if (this.head) {
      this.head = this.head.next;
      this.size--;
    }
  };

  delTail = () => {
    if (!this.head?.next) {
      this.head = null;
    } else {
      let current = this.head;
      while (current.next?.next) {
        current = current.next;
      }
      current.next = null;
    }

    this.size--;
  };

  addIndex = (letter: T, index: number) => {
    if (index < 0 || index > this.size) {
      return;
    }

    const node = new ListNode(letter);

    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let current = this.head;
      let currentIndex = 0;

      while (currentIndex < index) {
        currentIndex++;

        if (current?.next && currentIndex !== index) {
          current = current?.next;
        }
      }

      if (current) {
        node.next = current.next;
        current.next = node;
      }
    }

    this.size++;
  };

  delIndex = (index: number) => {
    if (index >= 0 && index < this.size && this.head) {
      let current = this.head;
      let previous = current;
      let currIndex = 0;

      if (index === 0) {
        this.head = current.next;
      } else {
        while (currIndex < index) {
          currIndex++;

          if (current.next) {
            previous = current;
            current = current.next;
          }
        }

        previous.next = current.next;
      }

      this.size--;
    }
  };
}

const randomArray = () => {
  return [...Array(5)].map((e) => Math.floor(Math.random() * 100).toString());
};

const array:string[] = randomArray();
const LinkedListArray: TListLetters[] = array.map(letter => ({
  letter: letter,
  state: ElementStates.Default,
}));

type TStateLoader = {
  append: boolean;
  prepend: boolean;
  delHead: boolean;
  delTail: boolean;
  addIndex: boolean;
  delIndex: boolean;
};

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
  const [text, setText] = React.useState<string>("");
  const [disabled, setDisabled] = React.useState(false);
  const [isLoader, setLoader] = React.useState<TStateLoader>(
    initialStateLoader
  );
  const [index, setIndex] = React.useState<string>("");
  const [vizualization, setVizualization] = React.useState<TListLetters[]>();

  function handleChangeIndex (e: React.FormEvent<HTMLInputElement>) {
    setIndex(e.currentTarget.value);
  };

  function handleChangeText (e: React.FormEvent<HTMLInputElement>) {
    setText(e.currentTarget.value);
  };

  async function loader () {
    setVizualization([...LinkedListArray]);
    await wait(500);
  };

  async function handleAppend () {
    setDisabled(true);
    setLoader({ ...isLoader, append: true });
    list.append(text);
    LinkedListArray[LinkedListArray.length - 1].value = {
      letter: text,
      state: ElementStates.Changing,
      action: "addLetter",
    };
    await loader();
    LinkedListArray[LinkedListArray.length - 1].value = undefined; // ??
    LinkedListArray.push({
      letter: text,
      state: ElementStates.Modified,
    });
    await loader();
    LinkedListArray[LinkedListArray.length - 1].state = ElementStates.Default;
    setText("");
    await loader();
    setLoader({ ...isLoader, append: false });
    setDisabled(false);
  };

  async function handlePrepend () {
    setDisabled(true);
    setLoader({ ...isLoader, prepend: true });
    list.prepend(text);
    LinkedListArray[0].value = {
      letter: text,
      state: ElementStates.Changing,
      action: "addLetter",
    };
    await loader();
    LinkedListArray[0].value = undefined; // ??
    LinkedListArray.unshift({
      letter: text,
      state: ElementStates.Modified,
    });
    await loader();
    LinkedListArray[0].state = ElementStates.Default;
    setText("");
    await loader();
    setLoader({ ...isLoader, prepend: false });
    setDisabled(false);
  };

  async function handleDelHead () {
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
    setText("");
    setLoader({ ...isLoader, delHead: false });
    setDisabled(false);
  };

  async function handleDelTail () {
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
    setText("");
    await loader();
    setLoader({ ...isLoader, delTail: false });
    setDisabled(false);
  };

  async function handleAddIndex () {
    setLoader({ ...isLoader, addIndex: true });
    setDisabled(true);
    list.addIndex(text, parseInt(index));
    for (let i = 0; i <= parseInt(index); i++) {
      LinkedListArray[i] = {
        ...LinkedListArray[i],
        state: ElementStates.Changing,
        value: {
          letter: text,
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
    LinkedListArray[parseInt(index)] = {
      ...LinkedListArray[parseInt(index)],
      state: ElementStates.Default,
      value: undefined,
    };
    LinkedListArray.splice(parseInt(index), 0, {
      letter: text,
      state: ElementStates.Modified,
    });
    await loader();
    for (let i = 0; i <= parseInt(index); i++) {
      LinkedListArray[i] = {
        ...LinkedListArray[i],
        state: ElementStates.Default,
      };
    }
    setText("");
    setIndex("");
    await loader();
    setLoader({ ...isLoader, addIndex: false });
    setDisabled(false);
  };

  async function handleDelIndex () {
    setDisabled(true);
    setLoader({ ...isLoader, delIndex: true });
    list.delIndex(parseInt(index));
    for (let i = 0; i <= parseInt(index); i++) {
      LinkedListArray[i] = {
        ...LinkedListArray[i],
        state: ElementStates.Changing,
      };
      await loader();
    }
    LinkedListArray[parseInt(index)] = {
      ...LinkedListArray[parseInt(index)],
      letter: "",
      state: ElementStates.Default,
      value: {
        letter: LinkedListArray[parseInt(index)].letter,
        state: ElementStates.Changing,
        action: "removeLetter",
      },
    };
    await loader();
    LinkedListArray.splice(parseInt(index), 1);
    for (let i = 0; i < parseInt(index); i++) {
      LinkedListArray[i] = {
        ...LinkedListArray[i],
        state: ElementStates.Default,
      };
    }
    setText("");
    setIndex("");
    await loader();
    setLoader({ ...isLoader, delIndex: false });
    setDisabled(false);
  };

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
        value={text}
        onChange={(e) => handleChangeText(e)}
      />
      <Button
        text={"Добавить в head"}
        onClick={handlePrepend}
        isLoader={isLoader.prepend}
        disabled={disabled || LinkedListArray.length >= 10 || !text}
      />
      <Button
        text={"Добавить в tail"}
        onClick={handleAppend}
        isLoader={isLoader.append}
        disabled={disabled || LinkedListArray.length >= 10 || !text}
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
        value={index}
        onChange={(e) => handleChangeIndex(e)}
      />
      <Button
        extraClass={listStyles.buttonLetter}
        text={"Добавить по индексу"}
        onClick={handleAddIndex}
        isLoader={isLoader.addIndex}
        disabled={
          disabled ||
          !text ||
          !parseInt(index) ||
          LinkedListArray.length >= 10 ||
          parseInt(index) > LinkedListArray.length - 1
        }
      />
      <Button
        extraClass={listStyles.buttonLetter}
        text={"Удалить по индексу"}
        onClick={handleDelIndex}
        isLoader={isLoader.delIndex}
        disabled={
          disabled ||
          !text ||
          parseInt(index) > LinkedListArray.length - 1 ||
          parseInt(index) < 0
        }
      />
    </div>

    <div className={listStyles.listContainerLetter}>
      {vizualization?.map((letter, index) => {
        return (
          <li key={index} className={listStyles.listLetter}>
            {letter.value && (
              <Circle
                extraClass={`${listStyles[`${letter.value.action}`]}`}
                letter={letter.value.letter}
                state={letter.value.state}
                isSmall
              />
            )}
            <Circle letter={letter?.letter} state={letter?.state} index={index} />
            {index !== vizualization?.length - 1 && <ArrowIcon />}
          </li>
        );
      })}
    </div>
    </SolutionLayout>
  );
};
