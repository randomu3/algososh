import { ElementStates } from "../../types/element-states";

export type TStateLoader = {
  append: boolean;
  prepend: boolean;
  delHead: boolean;
  delTail: boolean;
  addIndex: boolean;
  delIndex: boolean;
};

export type TListLetters = {
  letter: string;
  state: ElementStates;
  value?: {
    letter: string;
    state: ElementStates;
    action: "addLetter" | "removeLetter";
  };
};

interface ILinkedList<T> {
  append: (item: T) => void;
  prepend: (item: T) => void;
  delHead: () => void;
  delTail: () => void;
  addIndex: (item: T, index: number) => void;
  delIndex: (index: number) => void;
}

class ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  constructor(value: T, next?: ListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
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
