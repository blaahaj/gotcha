import { describe, it } from "node:test";
import { without } from "../src/object.js";
import assert from "node:assert";

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

      // @ts-expect-error
      y.bar;
    });

    // it("marks the result as readonly", () => {
    //   const x = { foo: 1 };
    //   x.foo;
    //   x.foo = 2;

    //   const y = without(x, []);

    //   y.foo;
    //   // @ts-expect-error
    //   y.foo = 2;
    // });

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

type T = { a: 1; b: 2; c: 3 };

type X = {
  readonly [k in keyof T as "a" extends k ? k : never]: T[k];
} & {
  [k in keyof T as "b" extends k ? k : never]?: T[k];
} & {
  [k in keyof T as "c" extends k ? k : never]: T[k];
};

type Z = {
  [k in keyof X]: X[k];
};
