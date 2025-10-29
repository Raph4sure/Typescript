/**
 * Functions in TypeScript
 * This file demonstrates different ways to define and use functions
 */

// Basic Function Declaration
function add(a: number, b: number): number {
  return a + b;
}

// Function Expression
const subtract = function (a: number, b: number): number {
  return a - b;
};

// Arrow Functions
const multiply = (a: number, b: number): number => a * b;

// Optional Parameters
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}

// Default Parameters
function createUser(name: string, age: number = 18): { name: string; age: number } {
  return { name, age };
}

// Rest Parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// Function Overloads
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;
function format(value: string | number | boolean): string {
  if (typeof value === "string") {
    return `String: ${value}`;
  } else if (typeof value === "number") {
    return `Number: ${value}`;
  } else {
    return `Boolean: ${value}`;
  }
}

// Generic Functions
function identity<T>(arg: T): T {
  return arg;
}

function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Function Types
type MathOperation = (a: number, b: number) => number;

const divide: MathOperation = (a, b) => {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
};

// Callback Functions
function processArray<T, R>(arr: T[], callback: (item: T) => R): R[] {
  return arr.map(callback);
}

// Higher Order Functions
function createMultiplier(multiplier: number): (num: number) => number {
  return (num: number) => num * multiplier;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

// Async Functions
async function fetchData(url: string): Promise<string> {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), 1000);
  });
}

// Type Guards in Functions
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: string | number): string {
  if (isString(value)) {
    return value.toUpperCase();
  }
  return value.toString();
}

export {
  add,
  subtract,
  multiply,
  greet,
  createUser,
  sum,
  format,
  identity,
  getFirstElement,
  divide,
  processArray,
  createMultiplier,
  fetchData,
  isString,
  processValue,
};
