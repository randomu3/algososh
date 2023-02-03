import { ElementStates } from "../../types/element-states";

export type TLoader = {
  push: boolean;
  pop: boolean;
};

export type TStack = {
  letter: string;
  state: ElementStates;
};

export interface IStack<T> {
  push: (letter: T) => void;
  pop: () => void;
  peak: () => void;
  clear: () => void;
  getStack: () => T[];
  getLength: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (letter: T) => {
    this.container.push(letter);
  };
  pop = () => {
    this.container.pop();
  };
  peak = () => {
    return this.container[this.getLength() - 1];
  };
  clear = () => {
    this.container = [];
  };
  getStack = () => {
    return this.container;
  };
  getLength = () => this.container.length;
}
