import { ElementStates } from "../../types/element-states";

export type TVizualization = {
  color: ElementStates;
  number: number;
};

export type TSorting = "bubble" | "choice";
export type TDirection = "decreasing" | "increasing" | "";

export type TInitialStateDisabled = {
  bubble: boolean;
  choice: boolean;
  decreasing: boolean;
  increasing: boolean;
  submit: boolean;
};

export type TInitialStateLoader = {
  decreasing: boolean;
  increasing: boolean;
};

export type TProps = {
  inititalArray?: number[]
}