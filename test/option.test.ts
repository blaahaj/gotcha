import { describe, it } from "node:test";
import { some, none, isSome, isNone } from "../src/option.js";
import assert from "node:assert";

describe("Option", () => {
  describe("some", () => {
    const v = some(123);

    it("is some", () => assert(isSome(v)));
    it("is not none", () => assert(!isNone(v)));
    it("has value", () => assert.deepStrictEqual(v.value, 123));
  });

  describe("none", () => {
    const v = none();

    it("is none", () => assert(isNone(v)));
    it("is not some", () => assert(!isSome(v)));
    // @ts-expect-error
    it("has value", () => v.value);
  });
});
