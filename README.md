# ts-indexify

> Add index signature to interface

## Why?

Plain interface is not assignable to Record type because [Index signature is missing in type (only on interfaces, not on type alias)](https://github.com/microsoft/TypeScript/issues/15300)

## How?

Convert interface to a type with an index signature using the keys of the interface.

```typescript
/**
Add index signature to interface
*/
export declare type Indexify<O extends object> = {
  [P in keyof O]: O[P];
};

/**
Constructs a index signature to interface
*/
export declare const indexify: <O extends object>(object: O) => Indexify<O>;
```

[Here](/index.test-d.ts) is a comparison with default behavior.

```typescript
type Dict = Record<string, unknown>;

/**
Default behavior
*/
expectAssignable<Dict>(someObject);
expectAssignable<Dict>(someObject as SomeType);
expectNotAssignable<Dict>(someObject as SomeInterface); // Index signature is missing in interface
expectNotAssignable<Dict>(someInstance); // Index signature is missing in class

/**
Indexify
*/
expectAssignable<Dict>(indexify(someObject));
expectAssignable<Dict>(indexify(someObject as SomeType));
expectAssignable<Dict>(indexify(someObject as SomeInterface));
expectAssignable<Dict>(indexify(someInstance));
```

[It does not affect runtime behavior](/index.test.js).

## Install

```sh
npm install ts-indexify
```

## Usage

```typescript
import {indexify, Indexify} from 'ts-indexify';

interface SomeInterface {
  foo: number;
  bar?: string;
  baz: number | undefined;
}

const someObject: SomeInterface = {foo: 123, bar: 'hello', baz: 456};

function fn(object: Record<string, unknown>): void {}

fn(someObject); // error
fn(indexify(someObject)); // work
fn(someObject as Indexify<SomeInterface>); // work
```

## LICENSE

[MIT](/LICENSE)
