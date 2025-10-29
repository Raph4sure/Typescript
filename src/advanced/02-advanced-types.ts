/**
 * Advanced TypeScript Types
 * This file demonstrates advanced type patterns and techniques
 */

// Conditional Types with Distributive Property
type Diff<T, U> = T extends U ? never : T;
type Filter<T, U> = T extends U ? T : never;

type T1 = Diff<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Filter<"a" | "b" | "c", "a" | "b">; // "a" | "b"

// Infer Keyword
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

function add(a: number, b: number): number {
  return a + b;
}

type AddReturn = MyReturnType<typeof add>; // number
type AddParams = MyParameters<typeof add>; // [number, number]

// Recursive Types
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const data: Json = {
  name: "John",
  age: 30,
  hobbies: ["reading", "coding"],
  address: {
    street: "123 Main St",
    city: "New York",
  },
};

// Recursive Utility Types
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Template Literal Types
type Direction = "up" | "down" | "left" | "right";
type MoveFunction = `move${Capitalize<Direction>}`;
// "moveUp" | "moveDown" | "moveLeft" | "moveRight"

// String Manipulation Types (using built-in TypeScript utility types)
type HelloWorld = "hello world";
type HELLO_WORLD = Uppercase<HelloWorld>; // "HELLO WORLD"
type hello_world = Lowercase<"HELLO WORLD">; // "hello world"
type HelloCapitalized = Capitalize<"hello">; // "Hello"
type HelloUncapitalized = Uncapitalize<"Hello">; // "hello"

// Branded Types (Nominal Typing)
type Brand<K, T> = K & { __brand: T };

type UserId = Brand<number, "UserId">;
type ProductId = Brand<number, "ProductId">;

function getUserById(id: UserId): void {
  console.log(`Fetching user ${id}`);
}

function getProductById(id: ProductId): void {
  console.log(`Fetching product ${id}`);
}

// Function to create branded types
function createUserId(id: number): UserId {
  return id as UserId;
}

const userId = createUserId(123);
// getUserById(456); // Error: number is not assignable to UserId

// Mapped Types with Key Remapping
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number; }

// Mapped Types with Filtering
type RemoveKindField<T> = {
  [K in keyof T as Exclude<K, "kind">]: T[K];
};

interface Circle {
  kind: "circle";
  radius: number;
}

type CircleWithoutKind = RemoveKindField<Circle>;
// { radius: number }

// Variadic Tuple Types
type Concat<T extends any[], U extends any[]> = [...T, ...U];

type Result1 = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]

// Named Tuples
type Point = [x: number, y: number];
type Point3D = [x: number, y: number, z: number];

// Tuple with Rest Elements
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];

// Type-Level Programming
type Length<T extends any[]> = T["length"];
type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;
type Tail<T extends any[]> = T extends [any, ...infer T] ? T : never;

type MyArray = [1, 2, 3, 4];
type ArrayLength = Length<MyArray>; // 4
type FirstElement = Head<MyArray>; // 1
type RestElements = Tail<MyArray>; // [2, 3, 4]

// Const Assertions
const config = {
  endpoint: "https://api.example.com",
  timeout: 5000,
} as const;

// config.endpoint = "new"; // Error: Cannot assign to 'endpoint' because it is a read-only property

type Config = typeof config;
// { readonly endpoint: "https://api.example.com"; readonly timeout: 5000; }

// Type Challenges
type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;

type P1 = MyAwaited<Promise<string>>; // string
type P2 = MyAwaited<Promise<Promise<number>>>; // number

// Readonly Arrays
type MyReadonlyArray<T> = readonly T[];

function processNumbers(numbers: MyReadonlyArray<number>): number {
  // numbers.push(1); // Error: Property 'push' does not exist
  return numbers.reduce((sum, n) => sum + n, 0);
}

// Type-safe Event Emitter
type EventMap = Record<string, any>;

type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;

interface Emitter<T extends EventMap> {
  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
  emit<K extends EventKey<T>>(eventName: K, params: T[K]): void;
}

// Builder Pattern with Type Safety
type Builder<T> = {
  [K in keyof T]-?: (value: T[K]) => Builder<T>;
} & {
  build(): T;
};

function createBuilder<T>(): Builder<T> {
  const obj: any = {};

  const builder: any = {};

  for (const key of Object.keys(obj)) {
    builder[key] = (value: any) => {
      obj[key] = value;
      return builder;
    };
  }

  builder.build = () => obj;

  return builder;
}

// Phantom Types
type Meters = { _brand: "meters" };
type Feet = { _brand: "feet" };

type Distance<Unit> = number & Unit;

function meters(value: number): Distance<Meters> {
  return value as Distance<Meters>;
}

function feet(value: number): Distance<Feet> {
  return value as Distance<Feet>;
}

function addDistances<Unit>(a: Distance<Unit>, b: Distance<Unit>): Distance<Unit> {
  return (a + b) as Distance<Unit>;
}

const d1 = meters(10);
const d2 = meters(20);
const sum = addDistances(d1, d2); // OK
// const invalid = addDistances(d1, feet(20)); // Error: different units

// Type Narrowing with Discriminated Unions
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "square":
      return shape.size * shape.size;
    case "rectangle":
      return shape.width * shape.height;
    case "circle":
      return Math.PI * shape.radius ** 2;
  }
}

// Exhaustiveness Checking
function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

function areaWithExhaustiveness(shape: Shape): number {
  switch (shape.kind) {
    case "square":
      return shape.size * shape.size;
    case "rectangle":
      return shape.width * shape.height;
    case "circle":
      return Math.PI * shape.radius ** 2;
    default:
      return assertNever(shape); // Ensures all cases are handled
  }
}

export {
  type Json,
  type DeepReadonly,
  type DeepPartial,
  type Getters,
  type Concat,
  type MyAwaited,
  createUserId,
  area,
  assertNever,
  meters,
  feet,
  addDistances,
  processNumbers,
};
