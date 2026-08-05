const MESSAGE = "(error created by toError)";

export const toError = (e: unknown): Error =>
  e instanceof Error ? e : new Error(MESSAGE, { cause: e });

export const doThrow = (error: unknown): never => {
  throw error;
};
