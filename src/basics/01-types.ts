/**
 * Basic Types in TypeScript
 * This file demonstrates the fundamental types in TypeScript
 */

// Primitive Types
const myString: string = "Hello, TypeScript!";
const myNumber: number = 42;
const myBoolean: boolean = true;
const myNull: null = null;
const myUndefined: undefined = undefined;

// Array Types
const numberArray: number[] = [1, 2, 3, 4, 5];
const stringArray: Array<string> = ["apple", "banana", "cherry"];

// Tuple Types - fixed length array with known types
const myTuple: [string, number, boolean] = ["tuple", 123, true];

// Any Type (avoid when possible)
let myAny: any = "can be anything";
myAny = 123;
myAny = true;

// Unknown Type (safer than any)
let myUnknown: unknown = "something";
if (typeof myUnknown === "string") {
  console.log(myUnknown.toUpperCase());
}

// Void - typically for functions that don't return anything
function logMessage(message: string): void {
  console.log(message);
}

// Never - for functions that never return
function throwError(message: string): never {
  throw new Error(message);
}

// Object Type
const person: { name: string; age: number; email?: string } = {
  name: "John Doe",
  age: 30,
};

// Union Types
let unionType: string | number;
unionType = "hello";
unionType = 42;

// Literal Types
let direction: "north" | "south" | "east" | "west";
direction = "north";

// Type Aliases
type ID = string | number;
type Point = {
  x: number;
  y: number;
};

const userId: ID = "user123";
const coordinate: Point = { x: 10, y: 20 };

// Enums
enum Color {
  Red,
  Green,
  Blue,
}

enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING",
}

const myColor: Color = Color.Red;
const myStatus: Status = Status.Active;

export {
  myString,
  numberArray,
  person,
  logMessage,
  type ID,
  type Point,
  Color,
  Status,
};
