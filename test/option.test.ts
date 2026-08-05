import assert from "node:assert";
import { describe, it } from "node:test";

import { isNone, isSome, none, type Option, some } from "../src/option.js";

describe("Option", () => {
  describe("some", () => {
    const v = some(123);

    it("is some", () => assert(isSome(v)));
    it("is not none", () => assert(!isNone(v)));
    it("is some (OO)", () => assert(v.isSome()));
    it("is not none (OO)", () => assert(!v.isNone()));
    it("has value", () => assert.deepStrictEqual(v.value, 123));
  });

  describe("none", () => {
    const v = none();

    it("is none", () => assert(isNone(v)));
    it("is not some", () => assert(!isSome(v)));
    it("is none (OO)", () => assert(v.isNone()));
    it("is not some (OO)", () => assert(!v.isSome()));
    // @ts-expect-error None does not have a value
    it("has value", () => v.value);
  });

  describe("type predicates for Option", () => {
    // This code is never actually run, we simply verify that it compiles
    const _fn = (e: Option<string>) => {
      // @ts-expect-error Either does not have a .value
      it("does not have a left", e.value);

      describe("isSome (static)", () => {
        if (isSome(e)) {
          const _v = e.value;
        } else {
          // @ts-expect-error None does not have a .value
          const _v = e.value;
        }
      });

      describe("isNone (OO)", () => {
        if (e.isNone()) {
          // @ts-expect-error None does not have a .value
          const _v = e.value;
        } else {
          const _v = e.value;
        }
      });

      describe("isSome (static)", () => {
        if (isSome(e)) {
          const _v = e.value;
        } else {
          // @ts-expect-error Left does not have a .value
          const _v = e.value;
        }
      });

      describe("isNone (OO)", () => {
        if (e.isNone()) {
          // @ts-expect-error Right does not have a .value
          const _v = e.value;
        } else {
          const _v = e.value;
        }
      });
    };
  });
});
