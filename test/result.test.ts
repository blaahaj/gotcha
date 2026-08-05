import assert from "node:assert";
import { describe, it } from "node:test";

import {
  error,
  isError,
  isOK,
  ok,
  type Result,
  thenToResult,
  tryToResult,
} from "../src/result.js";

const err = new Error("123");

describe("Result", () => {
  describe("error", () => {
    const v = error(err);

    it("is error", () => assert(isError(v)));
    it("is not value", () => assert(!isOK(v)));

    it("is error (OO)", () => assert(v.isError()));
    it("is not value (OO)", () => assert(!v.isOK()));

    it("has error", () => assert.deepStrictEqual(v.error, err));
    // @ts-expect-error ErrorResult does not have a .value
    it("does not have value", () => v.value);
  });

  describe("OK", () => {
    const v = ok(123);

    it("is OK", () => assert(isOK(v)));
    it("is not error", () => assert(!isError(v)));

    it("is OK (OO)", () => assert(v.isOK()));
    it("is not error (OO)", () => assert(!v.isError()));

    it("has value", () => assert.deepStrictEqual(v.value, 123));
    // @ts-expect-error OKResult does not have a .error
    it("does not have error", () => v.error);
  });

  describe("type predicates for Result", () => {
    // This code is never actually run, we simply verify that it compiles
    const _fn = (r: Result<string, Error>) => {
      // @ts-expect-error Result does not have a .error
      it("does not have a error", r.error);

      // @ts-expect-error Result does not have a .value
      it("does not have a value", r.value);

      describe("isError (static)", () => {
        if (isError(r)) {
          const _l = r.error;
          // @ts-expect-error ErrorResult does not have a .value
          const _r = r.value;
        } else {
          // @ts-expect-error OKResult does not have a .error
          const _l = r.error;
          const _r = r.value;
        }
      });

      describe("isError (OO)", () => {
        if (r.isError()) {
          const _l = r.error;
          // @ts-expect-error ErrorResult does not have a .value
          const _r = r.value;
        } else {
          // @ts-expect-error OKResult does not have a .error
          const _l = r.error;
          const _r = r.value;
        }
      });

      describe("isOK (static)", () => {
        if (isOK(r)) {
          // @ts-expect-error OKResult does not have a .error
          const _l = r.error;
          const _r = r.value;
        } else {
          const _l = r.error;
          // @ts-expect-error ErrorResult does not have a .value
          const _r = r.value;
        }
      });

      describe("isOK (OO)", () => {
        if (r.isOK()) {
          // @ts-expect-error OKResult does not have a .error
          const _l = r.error;
          const _r = r.value;
        } else {
          const _l = r.error;
          // @ts-expect-error ErrorResult does not have a .value
          const _r = r.value;
        }
      });
    };
  });

  const anError = new Error("bang!");

  describe("tryToResult", () => {
    it("returns", () => {
      const result = tryToResult(() => 123);

      assert(result.isOK());
      assert.deepStrictEqual(result.value, 123);
    });

    it("throws", () => {
      const result = tryToResult(() => {
        throw anError;
      });

      assert(result.isError());
      assert.equal(result.error, anError);
    });
  });

  describe("thenToResult", () => {
    it("converts resolved to OK", async () => {
      const e = await Promise.resolve(123).then(...thenToResult);

      assert(isOK(e));
      assert.deepStrictEqual(e.value, 123);
    });

    it("converts rejected to error", async () => {
      const e = await Promise.reject(err).then(...thenToResult);

      assert(isError(e));
      assert.deepStrictEqual(e.error, err);
    });
  });
});
