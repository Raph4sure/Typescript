/**
 * Interfaces in TypeScript
 * This file demonstrates how to define and use interfaces
 */

// Basic Interface
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

// Optional Properties
interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
}

// Readonly Properties
interface Config {
  readonly apiKey: string;
  readonly endpoint: string;
  timeout?: number;
}

const config: Config = {
  apiKey: "abc123",
  endpoint: "https://api.example.com",
};

// config.apiKey = "new-key"; // Error: Cannot assign to 'apiKey' because it is a read-only property

// Function Types in Interfaces
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calculator: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

// Index Signatures
interface StringMap {
  [key: string]: string;
}

const translations: StringMap = {
  hello: "hola",
  goodbye: "adiós",
};

// Extending Interfaces
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: string;
  department: string;
}

const employee: Employee = {
  name: "Bob",
  age: 30,
  employeeId: "EMP001",
  department: "Engineering",
};

// Multiple Interface Inheritance
interface Printable {
  print(): void;
}

interface Loggable {
  log(): void;
}

interface Document extends Printable, Loggable {
  title: string;
  content: string;
}

// Interface vs Type Alias
// Interfaces can be reopened and extended
interface Animal {
  name: string;
}

interface Animal {
  age: number;
}

const dog: Animal = {
  name: "Rex",
  age: 5,
};

// Implementing Interfaces in Classes
interface Shape {
  area(): number;
  perimeter(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle implements Shape {
  constructor(
    private width: number,
    private height: number
  ) {}

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// Hybrid Types
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function createCounter(): Counter {
  const counter = function (start: number) {
    return `Starting from ${start}`;
  } as Counter;

  counter.interval = 1;
  counter.reset = function () {
    console.log("Counter reset");
  };

  return counter;
}

export {
  type User,
  type Product,
  type Config,
  type Calculator,
  type Employee,
  type Shape,
  Circle,
  Rectangle,
  createCounter,
};
