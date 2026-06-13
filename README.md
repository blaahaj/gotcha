# Gotcha

I can't remember how I chose the name.

It's just the bare bones of FP.

- Either
  - types: `Either`, `Left`, `Right`
  - constructors: `left`, `right`
  - type guards: `isLeft`, `isRight`
  - `toEither`: the `[right, left]` tuple, for use with promises (`promise.then(...toEither)`)
- Option
  - types: `Option`, `Some`, `None`
  - constructors: `some`, `none`
  - type guards: `isSome`, `isNone`
  - singleton: `NONE`
- Error
  - `toError`: if something is not an `Error`, then wrap it in one
  - type `ErrnoException` — like `NodeJS.ErrnoException`, but with stronger typing of `.code`
  - `isErrnoException`: type guard for `ErrnoException`
- Throw
  - `doThrow`: `throw`, but as a function
  - `doTryCatch`: run a function, then turn its return value / thrown error into an `Either`

Imports can be done via `@blaahaj/gotcha` (for everything) or `@blaahaj/gotcha/Either`, etc.
