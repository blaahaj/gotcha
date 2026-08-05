import { toError } from "./throw.js";
import { isFalse, isTrue } from "./util.js";

export type ErrorResult<E extends Error = Error> = {
  readonly error: Error;
  readonly isError: () => this is ErrorResult<E>;
  readonly isOK: () => this is never;
};

export type OKResult<T> = {
  readonly value: T;
  readonly isError: () => this is never;
  readonly isOK: () => this is OKResult<T>;
};

export type Result<T, E extends Error = Error> = ErrorResult<E> | OKResult<T>;

export const error = <E extends Error = Error>(value: E): ErrorResult<E> =>
  ({
    tag: "error",
    error: value,
    isError: isTrue as ErrorResult["isError"],
    isOK: isFalse as ErrorResult["isOK"],
  }) as ErrorResult;

export const ok = <T>(value: T): OKResult<T> =>
  ({
    tag: "value",
    value,
    isError: isFalse as OKResult<T>["isError"],
    isOK: isTrue as OKResult<T>["isOK"],
  }) as OKResult<T>;

export const isError = <T, E extends Error = Error>(
  result: Result<T, E>,
): result is ErrorResult<E> => result.isError();
export const isOK = <T, E extends Error = Error>(
  result: Result<T, E>,
): result is OKResult<T> => result.isOK();

export const tryToResult = <T>(fn: () => T): Result<T, Error> => {
  try {
    return ok(fn());
  } catch (err) {
    return error(toError(err));
  }
};

// promise.then(ok, error)
// promise.then(...thenToResult)
export const thenToResult = [
  ok,
  (err: unknown) => error(toError(err)),
] as const;
