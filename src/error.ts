import { constants } from "node:os";

export type ErrnoExceptionCode = keyof typeof constants.errno;

// NodeJS.ErrnoException adds four properties to Error, but they're all optional.
// Our copy declares `code` and `errno` to be mandatory, and types them against `constants.errno`.
export type ErrnoException = NodeJS.ErrnoException & {
  code: ErrnoExceptionCode;
  errno: number;
};

const MESSAGE = "(error created by toError)";

export const toError = (e: unknown): Error =>
  e instanceof Error ? e : new Error(MESSAGE, { cause: e });

export const isErrnoException = (e: unknown): e is ErrnoException =>
  e instanceof Error &&
  "code" in e &&
  typeof e.code === "string" &&
  e.code in constants.errno &&
  "errno" in e &&
  typeof e.errno === "number" &&
  e.errno === -Math.abs(constants.errno[e.code as ErrnoExceptionCode]);
