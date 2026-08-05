import assert from "node:assert";
import { describe, it } from "node:test";

import { doThrow, toError } from "../src/throw.js";

const anError = new Error("bang!");

describe("Throw", () => {
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

  describe("doThrow", () => {
    it("throws the given value", () => {
      assert.throws(() => doThrow(anError), anError);
    });
  });
});
