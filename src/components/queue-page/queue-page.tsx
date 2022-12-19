import React from "react";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { wait } from "../../utilities/utilities";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import queueStyles from "./queuePage.module.css";
import { IQueue, Queue, TLoader, TQueue } from "./utils";

const initialStateQueue: TQueue[] = [...Array(7)].map((e) => ({
  letter: "",
  state: ElementStates.Default,
}));

const initialStateLoader: TLoader = {
  add: false,
  del: false,
};

export const QueuePage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({
    text: "",
  });

  const [isLoader, setLoader] = React.useState<TLoader>(initialStateLoader);
  const [queue, setQueue] = React.useState<IQueue<TQueue>>(
    new Queue<TQueue>(7)
  );
  const [vizualization, setVizualization] = React.useState<(TQueue | null)[]>(
    []
  );

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
    queue.enqueue({ letter: values.text, state: ElementStates.Changing });
    const newTail = queue.getTail();
    setValues({ text: "" });
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
              value={values.text}
              onChange={handleChange}
              name={"text"}
            ></Input>
            <Button
              disabled={!values.text || queue.isFull()}
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
