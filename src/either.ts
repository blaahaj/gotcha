export type Left<T> = {
  readonly tag: "left";
  readonly left: T;
};

export type Right<T> = {
  readonly tag: "right";
  readonly right: T;
};

export type Either<T, E> = Left<E> | Right<T>;

export const left = <E>(value: E): Left<E> => ({
  tag: "left",
  left: value,
});

export const right = <T>(value: T): Right<T> => ({
  tag: "right",
  right: value,
});

export const isLeft = <E>(thing: Either<unknown, E>): thing is Left<E> =>
  thing.tag === "left";

export const isRight = <T>(thing: Either<T, unknown>): thing is Right<T> =>
  thing.tag === "right";

// promise.then(right, left)
// promise.then(...thenToEither)
export const thenToEither = [right, left<unknown>] as const;
