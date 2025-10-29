/**
 * Generics in TypeScript
 * This file demonstrates the power of generic types
 */

// Generic Functions
function identity<T>(arg: T): T {
  return arg;
}

const stringResult = identity<string>("hello");
const numberResult = identity<number>(42);
const inferredResult = identity("inferred"); // Type inference

// Generic with Arrays
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

function getLastElement<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

// Multiple Type Parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const stringNumberPair = pair<string, number>("age", 25);

// Generic Interfaces
interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "hello" };
const numberBox: Box<number> = { value: 42 };

// Generic Classes
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// Generic Constraints
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(`Length: ${arg.length}`);
  return arg;
}

logLength("hello"); // string has length
logLength([1, 2, 3]); // array has length
// logLength(123); // Error: number doesn't have length

// Using Type Parameters in Generic Constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30 };
const name = getProperty(person, "name"); // OK
// const invalid = getProperty(person, "invalid"); // Error

// Generic Type Aliases
type Result<T> = { success: true; data: T } | { success: false; error: string };

function processData<T>(data: T): Result<T> {
  if (data) {
    return { success: true, data };
  }
  return { success: false, error: "No data provided" };
}

// Generic with Default Types
interface Response<T = string> {
  status: number;
  data: T;
}

const textResponse: Response = { status: 200, data: "Success" };
const jsonResponse: Response<{ id: number }> = {
  status: 200,
  data: { id: 1 },
};

// Generic Factory Pattern
interface Product {
  id: number;
  name: string;
}

class GenericRepository<T extends { id: number }> {
  private items: Map<number, T> = new Map();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  get(id: number): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }

  delete(id: number): boolean {
    return this.items.delete(id);
  }

  update(id: number, item: Partial<T>): T | undefined {
    const existing = this.items.get(id);
    if (existing) {
      const updated = { ...existing, ...item };
      this.items.set(id, updated);
      return updated;
    }
    return undefined;
  }
}

// Generic Utility Type
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

// Promise with Generics
async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}` });
    }, 1000);
  });
}

// Generic Array Methods
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  const result: U[] = [];
  for (const item of arr) {
    result.push(fn(item));
  }
  return result;
}

function filter<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  const result: T[] = [];
  for (const item of arr) {
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
}

// Generic Event Emitter
class EventEmitter<Events extends Record<string, any>> {
  private listeners: {
    [K in keyof Events]?: Array<(data: Events[K]) => void>;
  } = {};

  on<K extends keyof Events>(event: K, listener: (data: Events[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(data));
    }
  }
}

type AppEvents = {
  userLogin: { userId: number; timestamp: Date };
  userLogout: { userId: number };
  error: { message: string };
};

const emitter = new EventEmitter<AppEvents>();

export {
  identity,
  getFirstElement,
  pair,
  Stack,
  logLength,
  getProperty,
  processData,
  GenericRepository,
  fetchUser,
  map,
  filter,
  EventEmitter,
  type Result,
  type Optional,
};
