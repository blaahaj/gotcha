import { isFalse, isTrue } from "./util.js";

export type Some<T> = {
  readonly value: T;
  readonly isSome: () => this is Some<T>;
  readonly isNone: () => this is never;
};

export type None = {
  readonly isSome: () => this is never;
  readonly isNone: () => this is None;
};

export type Option<T> = None | Some<T>;

export const NONE: None = {
  isSome: isFalse as None["isSome"],
  isNone: isTrue as None["isNone"],
};

export const none = () => NONE;

export const some = <T>(value: T): Some<T> => ({
  value,
  isSome: isTrue as Some<T>["isSome"],
  isNone: isFalse as Some<T>["isNone"],
});

export const isNone = (thing: Option<unknown>): thing is None => thing.isNone();

export const isSome = <T>(thing: Option<T>): thing is Some<T> => thing.isSome();
