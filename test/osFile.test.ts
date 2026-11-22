import assert from "node:assert";
import { afterEach, describe, it } from "node:test";

import { openIfExists, readFileIfExists } from "../src/osFile.js";

describe("OSFile", () => {
  describe("readFileIfExists", () => {
    it("reads OK with an encoding", async () => {
      const r = await readFileIfExists("package.json", "utf-8");
      assert(r.isOK());
      assert.equal(typeof r.value, "string");
    });

    it("reads OK with no encoding", async () => {
      const r = await readFileIfExists("package.json");
      assert(r.isOK());
      assert(r.value instanceof Buffer);
    });

    it("gets ENOENT", async () => {
      const r = await readFileIfExists("./no-such-file");
      assert(r.isOK());
      assert.equal(r.value, undefined);
    });

    it("gets another error", async () => {
      const r = await readFileIfExists(".");
      assert(r.isError());
    });
  });

  describe("openIfExists", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let f: any = undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    afterEach(() => (f as any)?.value?.close());

    it("opens OK", async () => {
      f = await openIfExists("package.json");
      assert(f?.isOK());
    });

    it("gets ENOENT", async () => {
      f = await openIfExists("./no-such-file");
      assert(f?.isOK());
      assert.equal(f.value, undefined);
    });

    it("gets another error", async () => {
      f = await openIfExists("x".repeat(100000));
      assert(f.isError());
      assert.equal("ENAMETOOLONG", f.error.code);
    });
  });
});
