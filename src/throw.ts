import { type Either, left, right } from "./either.js";

export const doThrow = (error: unknown): never => {
  throw error;
};

export const doTryCatch = <T>(fn: () => T): Either<T, unknown> => {
  try {
    return right(fn());
  } catch (error) {
    return left(error);
  }
};
