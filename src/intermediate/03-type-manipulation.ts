/**
 * Type Manipulation in TypeScript
 * This file demonstrates advanced type manipulation techniques
 */

// Mapped Types
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

type MyOptional<T> = {
  [K in keyof T]?: T[K];
};

type MyNullable<T> = {
  [K in keyof T]: T[K] | null;
};

interface User {
  id: number;
  name: string;
  email: string;
}

type ReadonlyUser = MyReadonly<User>;
type OptionalUser = MyOptional<User>;
type NullableUser = MyNullable<User>;

// Conditional Types
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Conditional Types with Inference
type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends Promise<infer U>
    ? U
    : T;

type T1 = Unpacked<string[]>; // string
type T2 = Unpacked<Promise<number>>; // number
type T3 = Unpacked<boolean>; // boolean

// Distributive Conditional Types
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>; // string[] | number[]

// Template Literal Types
type EventName = "click" | "scroll" | "mousemove";
type EventHandler = `on${Capitalize<EventName>}`;
// Result: "onClick" | "onScroll" | "onMousemove"

// Indexed Access Types
type Person = {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
};

type PersonName = Person["name"]; // string
type PersonAddress = Person["address"]; // { street: string; city: string; }
type AddressCity = Person["address"]["city"]; // string

// keyof Type Operator
type PersonKeys = keyof Person; // "name" | "age" | "address"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// typeof Type Operator
const config = {
  host: "localhost",
  port: 3000,
  debug: true,
};

type Config = typeof config;
// { host: string; port: number; debug: boolean; }

// ReturnType Utility
function createUser(name: string, age: number) {
  return { name, age, createdAt: new Date() };
}

type UserReturn = ReturnType<typeof createUser>;
// { name: string; age: number; createdAt: Date; }

// Parameters Utility
type CreateUserParams = Parameters<typeof createUser>;
// [name: string, age: number]

// Utility Types Examples
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

// Partial - makes all properties optional
type PartialTodo = Partial<Todo>;

// Required - makes all properties required
type RequiredTodo = Required<PartialTodo>;

// Pick - picks specific properties
type TodoPreview = Pick<Todo, "title" | "completed">;

// Omit - omits specific properties
type TodoInfo = Omit<Todo, "createdAt">;

// Record - creates object type with specific keys
type PageInfo = Record<"home" | "about" | "contact", { title: string; url: string }>;

// Exclude - excludes types from union
type T4 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"

// Extract - extracts types from union
type T5 = Extract<"a" | "b" | "c", "a" | "f">; // "a"

// NonNullable - removes null and undefined
type T6 = NonNullable<string | number | null | undefined>; // string | number

// Custom Utility Types
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// Type Guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

// Discriminated Unions
type Success<T> = {
  status: "success";
  data: T;
};

type Error = {
  status: "error";
  error: string;
};

type Result<T> = Success<T> | Error;

function handleResult<T>(result: Result<T>): void {
  if (result.status === "success") {
    console.log(result.data);
  } else {
    console.error(result.error);
  }
}

// Type Predicates
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}

// Assertion Functions
function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value must be a string");
  }
}

// Type Narrowing
function processValue(value: string | number | boolean) {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return value ? "true" : "false";
  }
}

export {
  type MyReadonly,
  type MyOptional,
  type MyNullable,
  type Unpacked,
  type DeepPartial,
  type DeepReadonly,
  type Result,
  isString,
  isNumber,
  isArray,
  handleResult,
  isFish,
  assert,
  assertIsString,
  processValue,
};
