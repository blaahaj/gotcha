# Gotcha

I can't remember how I chose the name.

It's just the bare bones of FP.

- Either
  - types: `Either`, `Left`, `Right`
  - constructors: `left`, `right`
  - type guards: `isLeft`, `isRight`, `.isLeft()`, `.isRight()`
  - `try`/`catch` on some function: `tryToEither`
  - `promise.then(...thenToEither)`: turn a resolve/reject into an Either
- Option
  - types: `Option`, `Some`, `None`
  - constructors: `some`, `none`
  - type guards: `isSome`, `isNone`, `.isSome()`, `.isNone()`
  - singleton: `NONE`
- OSError
  - type `ErrnoException` — like `NodeJS.ErrnoException`, but with stronger typing of `.code`
  - `isErrnoException`: type guard for `ErrnoException`
- Result
  - types: `Result`, `OKResult`, `ErrorResult`
  - constructors: `ok`, `error`
  - type guards: `isOK`, `isError`, `.isOK()`, `.isError()`
  - `try`/`catch` on some function: `tryToResult`
  - `promise.then(...thenToResult)`: turn a resolve/reject into a Result
- Throw
  - `toError`: if something is not an `Error`, then wrap it in one
  - `doThrow`: `throw`, but as a function

Imports are via `@blaahaj/gotcha/Either`, etc.
