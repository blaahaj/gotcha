type AnyKey = string | symbol | number;
type AnyObject = { [k in AnyKey]: unknown };

export const without = <T extends AnyObject, K extends keyof T>(
  value: Readonly<T>,
  ...keys: (K | readonly K[])[]
): {
  [key in keyof T as key extends K ? never : key]: T[key];
} => {
  const copy = { ...value };

  for (const key of keys.flat()) {
    delete copy[key];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return copy as any;
};
