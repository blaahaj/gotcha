import { constants } from "node:os";

export type ErrnoExceptionCode = keyof typeof constants.errno;

// NodeJS.ErrnoException adds four properties to Error, but they're all optional.
// Our copy declares `code` and `errno` to be mandatory, and types them against `constants.errno`.
export type ErrnoException = NodeJS.ErrnoException & {
  code: string;
  errno: number;
};

export type OSErrnoException = ErrnoException & {
  code: ErrnoExceptionCode;
};

export const isErrnoException = (e: Error): e is ErrnoException =>
  e instanceof Error &&
  "code" in e &&
  typeof e.code === "string" &&
  "errno" in e &&
  typeof e.errno === "number";

export const isOSErrnoException = (e: Error): e is OSErrnoException =>
  isErrnoException(e) && e.code in constants.errno;

export const isErrno =
  <T extends keyof typeof constants.errno | string>(errno: T) =>
  (error: unknown): error is ErrnoException & { code: T } =>
    error instanceof Error && isErrnoException(error) && error.code === errno;
