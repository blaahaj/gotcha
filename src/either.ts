import { isFalse, isTrue } from "./util.js";

export type Left<T> = {
  readonly left: T;
  readonly isLeft: () => this is Left<T>;
  readonly isRight: () => this is never;
};

export type Right<T> = {
  readonly right: T;
  readonly isLeft: () => this is never;
  readonly isRight: () => this is Right<T>;
};

export type Either<R, L> = Left<L> | Right<R>;

export const left = <T>(value: T): Left<T> =>
  ({
    tag: "left",
    left: value,
    isLeft: isTrue as Left<T>["isLeft"],
    isRight: isFalse as Left<T>["isRight"],
  }) as Left<T>;

export const right = <T>(value: T): Right<T> =>
  ({
    tag: "right",
    right: value,
    isLeft: isFalse as Right<T>["isLeft"],
    isRight: isTrue as Right<T>["isRight"],
  }) as Right<T>;

export const isLeft = <R, L>(either: Either<R, L>): either is Left<L> =>
  either.isLeft();
export const isRight = <R, L>(either: Either<R, L>): either is Right<R> =>
  either.isRight();

export const tryToEither = <T>(fn: () => T): Either<T, unknown> => {
  try {
    return right(fn());
  } catch (err) {
    return left(err);
  }
};

// promise.then(right, left)
// promise.then(...thenToEither)
export const thenToEither = [right, left<unknown>] as const;
