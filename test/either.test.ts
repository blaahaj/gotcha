import assert from "node:assert";
import { describe, it } from "node:test";

import {
  type Either,
  isLeft,
  isRight,
  left,
  right,
  thenToEither,
  tryToEither,
} from "../src/either.js";

describe("Either", () => {
  describe("left", () => {
    const v = left(123);

    it("is left", () => assert(isLeft(v)));
    it("is not right", () => assert(!isRight(v)));

    it("is left (OO)", () => assert(v.isLeft()));
    it("is not right (OO)", () => assert(!v.isRight()));

    it("has left", () => assert.deepStrictEqual(v.left, 123));
    // @ts-expect-error Left does not have a .right
    it("does not have right", () => v.right);
  });

  describe("right", () => {
    const v = right(123);

    it("is right", () => assert(isRight(v)));
    it("is not left", () => assert(!isLeft(v)));

    it("is right (OO)", () => assert(v.isRight()));
    it("is not left (OO)", () => assert(!v.isLeft()));

    it("has right", () => assert.deepStrictEqual(v.right, 123));
    // @ts-expect-error Right does not have a .left
    it("does not have left", () => v.left);
  });

  describe("type predicates for Either", () => {
    // This code is never actually run, we simply verify that it compiles
    const _fn = (e: Either<string, Error>) => {
      // @ts-expect-error Either does not have a .left
      it("does not have a left", e.left);

      // @ts-expect-error Either does not have a .right
      it("does not have a right", e.right);

      describe("isLeft (static)", () => {
        if (isLeft(e)) {
          const _l = e.left;
          // @ts-expect-error Left does not have a .right
          const _r = e.right;
        } else {
          // @ts-expect-error Right does not have a .left
          const _l = e.left;
          const _r = e.right;
        }
      });

      describe("isLeft (OO)", () => {
        if (e.isLeft()) {
          const _l = e.left;
          // @ts-expect-error Left does not have a .right
          const _r = e.right;
        } else {
          // @ts-expect-error Right does not have a .left
          const _l = e.left;
          const _r = e.right;
        }
      });

      describe("isRight (static)", () => {
        if (isRight(e)) {
          // @ts-expect-error Right does not have a .left
          const _l = e.left;
          const _r = e.right;
        } else {
          const _l = e.left;
          // @ts-expect-error Left does not have a .right
          const _r = e.right;
        }
      });

      describe("isRight (OO)", () => {
        if (e.isRight()) {
          // @ts-expect-error Right does not have a .left
          const _l = e.left;
          const _r = e.right;
        } else {
          const _l = e.left;
          // @ts-expect-error Left does not have a .right
          const _r = e.right;
        }
      });
    };
  });

  const anError = new Error("bang!");

  describe("tryToEither", () => {
    it("returns", () => {
      const either = tryToEither(() => 123);

      assert(either.isRight());
      assert.deepStrictEqual(either.right, 123);
    });

    it("throws", () => {
      const either = tryToEither(() => {
        throw anError;
      });

      assert(either.isLeft());
      assert.equal(either.left, anError);
    });
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
