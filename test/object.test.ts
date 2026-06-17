import assert from "node:assert";
import { describe, it } from "node:test";

import { without } from "../src/object.js";

describe("Object", () => {
  describe("without", () => {
    it("removes values", () => {
      const x = {
        foo: 1,
        bar: "two",
        baz: [3],
      };

      const y = without(x, ["bar"]);
      assert.deepStrictEqual(y, { foo: 1, baz: [3] });

      // @ts-expect-error .bar has been removed so is no longer valid
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      y.bar;
    });

    it("can be called with an array of keys", () => {
      const x = { a: 1, b: 2, c: 3, d: 4 };
      const y = without(x, ["a", "b"]);
      assert.deepStrictEqual(y, { c: 3, d: 4 });
    });

    it("can be called with a spread of keys", () => {
      const x = { a: 1, b: 2, c: 3, d: 4 };
      const y = without(x, "a", "b");
      assert.deepStrictEqual(y, { c: 3, d: 4 });
    });
  });
});
