import assert from "node:assert";
import { describe, it } from "node:test";

import { isLeft, isRight } from "../src/either.js";
import { doThrow, doTryCatch } from "../src/throw.js";

describe("Throw", () => {
  describe("doThrow", () => {
    it("throws the given value", () => {
      const error = new Error("bang!");
      assert.throws(() => doThrow(error), error);
    });
  });

  describe("doTryCatch", () => {
    it("returns", () => {
      const either = doTryCatch(() => 123);

      assert(isRight(either));
      assert.deepStrictEqual(either.right, 123);
    });

    it("throws", () => {
      const error = new Error("bang!");
      const either = doTryCatch(() => {
        throw error;
      });

      assert(isLeft(either));
      assert.equal(either.left, error);
    });
  });
});
