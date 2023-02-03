import { ElementStates } from "../../types/element-states";

export type TQueue = {
  letter: string;
  state: ElementStates;
};

export type TLoader = {
  add: boolean;
  del: boolean;
};

export interface IQueue<T> {
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
  
 export class Queue<T> implements IQueue<T> {
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
  