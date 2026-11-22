import type { Mode, PathLike } from "node:fs";
import { type FileHandle, open, readFile } from "node:fs/promises";

import { isErrno } from "./osError.js";
import { isErrorWhich, ok, type Result, thenToResult } from "./result.js";

/**
 * Like `open`, but succeeds with `undefined` if ENOENT occurred.
 */
export const openIfExists = (
  path: PathLike,
  flags?: string | number | undefined,
  mode?: Mode | undefined,
): Promise<Result<FileHandle | undefined>> =>
  open(path, flags, mode)
    .then(...thenToResult)
    .then((r) => (isErrorWhich(isErrno("ENOENT"))(r) ? ok(undefined) : r));

interface ReadFileIfExists {
  (path: string): Promise<Result<Buffer | undefined>>;
  (path: string, encoding: undefined): Promise<Result<Buffer | undefined>>;
  (path: string, encoding: BufferEncoding): Promise<Result<string | undefined>>;
}

/**
 * Like `readFile`, but succeeds with `undefined` if ENOENT occurred.
 */
export const readFileIfExists: ReadFileIfExists = ((
  path: string,
  encoding?: BufferEncoding,
): Promise<Result<string | Buffer | undefined>> =>
  readFile(path, encoding)
    .then(...thenToResult)
    .then((r) =>
      isErrorWhich(isErrno("ENOENT"))(r) ? ok(undefined) : r,
    )) as ReadFileIfExists;
