import assert from "node:assert";
import { readFile } from "node:fs/promises";
import { constants } from "node:os";
import { describe, it } from "node:test";

import { isLeft, thenToEither } from "../src/either.js";
import { isErrnoException, toError } from "../src/error.js";

describe("Error", () => {
  describe("toError", () => {
    it("passes an error unchanged", () => {
      const input = new Error("bang!");
      const output = toError(input);
      assert.strictEqual(output, input);
    });

    it("wraps a non-error as an error", () => {
      const input = "bang!";
      const output = toError(input);
      assert(output instanceof Error);
      assert.strictEqual(output.cause, input);
    });
  });

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
