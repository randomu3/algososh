import React from "react";
import { ElementStates } from "../../types/element-states";
import { wait } from "../../utilities/utilities";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import queueStyles from "./queuePage.module.css";

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;

  getHead: () => T | null;
  getHeadIndex: () => number;
  getTail: () => T | null;
  getTailIndex: () => number;
  getQueue: () => (T | null)[];

  isEmpty: () => boolean;
  isFull: () => boolean;
}

class Queue<T> implements IQueue<T> {
  // array
  private container: (T | null)[] = [];
  // size n length
  private readonly size: number = 0;
  private length: number = 0;

  private head = 0;
  private tail = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  isEmpty = () => this.length === 0;
  isFull = () => this.length >= this.size;

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    if (!this.isEmpty()) {
      this.tail = (this.tail + 1) % this.size;
    }
    this.container[this.tail % this.size] = item;
    this.length++;
  };
  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head % this.size] = null;
    this.head = (this.head + 1) % this.size;
    this.length--;
  };

  getHead = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head];
  };
  getHeadIndex = () => {
    return this.head;
  };

  getTail = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.tail];
  };
  getTailIndex = () => {
    return this.tail;
  };

  getQueue = () => {
    return this.container;
  };
}

type TQueue = {
  letter: string;
  state: ElementStates;
};

type TLoader = {
  add: boolean;
  del: boolean;
};

const initialStateQueue: TQueue[] = [...Array(7)].map((e) => ({
    letter: "",
    state: ElementStates.Default,
}))

const initialStateLoader: TLoader = {
  add: false,
  del: false,
};

export const QueuePage: React.FC = () => {
  const [text, setText] = React.useState<string>("");
  const [isLoader, setLoader] = React.useState<TLoader>(initialStateLoader);
  const [queue, setQueue] = React.useState<IQueue<TQueue>>(
    new Queue<TQueue>(7)
  );
  const [vizualization, setVizualization] = React.useState<(TQueue | null)[]>(
    []
  );

  function onChangeHandler(e: React.FormEvent<HTMLInputElement>): void {
    setText(e.currentTarget.value);
  }

  async function loader(queue: IQueue<TQueue>) {
    setQueue(queue);
    setVizualization([...queue.getQueue()]);
    await wait(500);
  }

  function clear(): void {
    setQueue(new Queue<TQueue>(7));
    setVizualization(initialStateQueue);
  }

  async function enqueue(): Promise<void> {
    setLoader({ ...isLoader, add: true });
    queue.enqueue({ letter: text, state: ElementStates.Changing });
    const newTail = queue.getTail();
    setText("");
    await loader(queue);
    if (newTail) newTail.state = ElementStates.Default;
    loader(queue);
    setLoader({ ...isLoader, add: false });
  }

  async function dequeue(): Promise<void> {
    setLoader({ ...isLoader, del: true });
    const head = queue.getHead();
    if (head) {
      head.state = ElementStates.Changing;
    }
    await loader(queue);
    queue.dequeue();
    loader(queue);
    if (queue.isEmpty()) {
      clear();
    }
    setLoader({ ...isLoader, del: false });
  }

  React.useEffect(() => {
    setVizualization(initialStateQueue);
  }, []);

  return (
    <SolutionLayout title="Очередь">
      <div className={queueStyles.container}>
        <div className={queueStyles.form}>
          <div className={queueStyles.subForm}>
            <Input
              extraClass={queueStyles.input}
              maxLength={4}
              value={text}
              onChange={(e) => onChangeHandler(e)}
            ></Input>
            <Button
              disabled={!text || queue.isFull()}
              extraClass={queueStyles.button}
              isLoader={isLoader.add}
              onClick={() => enqueue()}
              text="Добавить"
            ></Button>
            <Button
              disabled={queue.isEmpty()}
              extraClass={queueStyles.button}
              isLoader={isLoader.del}
              onClick={() => dequeue()}
              text="Удалить"
            ></Button>
          </div>
          <Button
            disabled={queue.isEmpty()}
            extraClass={queueStyles.button}
            onClick={() => clear()}
            text="Очистить"
          ></Button>
        </div>
        <p className={queueStyles.subtitle}>Максимум — 4 символа</p>
      </div>
      <div className={queueStyles.circles}>
        {vizualization.map((item, index) => {
          return (
            <Circle
              letter={item ? item.letter : ""}
              state={item ? item.state : ElementStates.Default}
              index={index}
              key={index}
              head={
                index === queue.getHeadIndex() && !queue.isEmpty() ? "head" : ""
              }
              tail={
                index === queue.getTailIndex() && !queue.isEmpty() ? "tail" : ""
              }
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
