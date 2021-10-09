import {expectAssignable, expectNotAssignable} from 'tsd';

import {indexify} from './index.js';

interface SomeInterface {
  foo: number;
  bar?: string;
  baz: number | undefined;
}

type SomeType = {
  foo: number;
  bar?: string;
  baz: number | undefined;
};

class SomeClass {
  foo!: number;
  bar?: string;
  baz: number | undefined;

  constructor({foo, bar, baz}: SomeInterface) {
    this.foo = foo;
    this.bar = bar;
    this.baz = baz;
  }
}

const someObject = {foo: 123, bar: 'hello', baz: 456};
const someInstance: SomeClass = new SomeClass(someObject);

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
