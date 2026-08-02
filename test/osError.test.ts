import assert from "node:assert";
import { readFile } from "node:fs/promises";
import { constants } from "node:os";
import { describe, it } from "node:test";

import { isLeft, thenToEither } from "../src/either.js";
import { isErrnoException } from "../src/osError.js";

describe("OSError", () => {
  describe("isErrnoException", () => {
    it("handles a non-error", () => assert(!isErrnoException(123)));

    it("handles an error", () => assert(!isErrnoException(new Error("bang!"))));

    it("handles an errno exception", async () => {
      const v = await readFile("/no-such-file").then(...thenToEither);

      assert(isLeft(v));
      const e = v.left;

      assert(isErrnoException(e));
      assert.deepStrictEqual(e.code, "ENOENT");
      assert.deepStrictEqual(e.errno, -Math.abs(constants.errno.ENOENT));
    });
  });
});
