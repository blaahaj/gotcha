import assert from "node:assert";
import { describe, it } from "node:test";

import { isLeft, isRight, left, right, thenToEither } from "../src/either.js";

describe("Either", () => {
  describe("left", () => {
    const v = left(123);

    it("is left", () => assert(isLeft(v)));
    it("is not right", () => assert(!isRight(v)));

    it("has left", () => assert.deepStrictEqual(v.left, 123));
    // @ts-expect-error Left does not have a .right
    it("does not have right", () => v.right);
  });

  describe("right", () => {
    const v = right(123);

    it("is right", () => assert(isRight(v)));
    it("is not left", () => assert(!isLeft(v)));

    it("has right", () => assert.deepStrictEqual(v.right, 123));
    // @ts-expect-error Right does not have a .left
    it("does not have left", () => v.left);
  });

  describe("thenToEither", () => {
    it("converts resolved to right", async () => {
      const e = await Promise.resolve(123).then(...thenToEither);

      assert(isRight(e));
      assert.deepStrictEqual(e.right, 123);
    });

    it("converts rejected to left", async () => {
      const e = await Promise.reject(123).then(...thenToEither);

      assert(isLeft(e));
      assert.deepStrictEqual(e.left, 123);
    });
  });
});
