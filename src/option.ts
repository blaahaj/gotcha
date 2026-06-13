export type Some<T> = {
  readonly tag: "some";
  readonly value: T;
};

export type None = {
  readonly tag: "none";
};

export type Option<T> = None | Some<T>;

export const NONE: None = { tag: "none" };
export const none = () => NONE;

export const some = <T>(value: T): Some<T> => ({
  tag: "some",
  value,
});

export const isNone = (thing: Option<unknown>): thing is None =>
  thing.tag === "none";

export const isSome = <T>(thing: Option<T>): thing is Some<T> =>
  thing.tag === "some";
