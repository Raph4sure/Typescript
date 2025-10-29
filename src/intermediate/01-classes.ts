/**
 * Classes in TypeScript
 * This file demonstrates object-oriented programming with classes
 */

// Basic Class
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hello, my name is ${this.name} and I'm ${this.age} years old.`;
  }
}

// Access Modifiers
class BankAccount {
  public accountNumber: string;
  private balance: number;
  protected accountType: string;

  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.accountType = "Savings";
  }

  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  public withdraw(amount: number): boolean {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  public getBalance(): number {
    return this.balance;
  }
}

// Readonly Properties
class Book {
  readonly isbn: string;
  title: string;
  author: string;

  constructor(isbn: string, title: string, author: string) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
  }
}

// Parameter Properties
class User {
  constructor(
    public id: number,
    public username: string,
    private password: string
  ) {}

  authenticate(password: string): boolean {
    return this.password === password;
  }
}

// Inheritance
class Animal {
  constructor(public name: string) {}

  move(distance: number): void {
    console.log(`${this.name} moved ${distance} meters.`);
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  bark(): void {
    console.log("Woof! Woof!");
  }

  // Overriding methods
  move(distance: number): void {
    console.log("Running...");
    super.move(distance);
  }
}

// Abstract Classes
abstract class Shape {
  constructor(public name: string) {}

  abstract area(): number;
  abstract perimeter(): number;

  describe(): string {
    return `This is a ${this.name} with area ${this.area()} and perimeter ${this.perimeter()}`;
  }
}

class Circle extends Shape {
  constructor(public radius: number) {
    super("Circle");
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Square extends Shape {
  constructor(public side: number) {
    super("Square");
  }

  area(): number {
    return this.side ** 2;
  }

  perimeter(): number {
    return 4 * this.side;
  }
}

// Static Members
class MathUtils {
  static PI: number = 3.14159;

  static calculateCircleArea(radius: number): number {
    return this.PI * radius ** 2;
  }

  static max(...numbers: number[]): number {
    return Math.max(...numbers);
  }
}

// Getters and Setters
class Temperature {
  private _celsius: number = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Temperature cannot be below absolute zero");
    }
    this._celsius = value;
  }

  get fahrenheit(): number {
    return (this._celsius * 9) / 5 + 32;
  }

  set fahrenheit(value: number) {
    this.celsius = ((value - 32) * 5) / 9;
  }
}

// Singleton Pattern
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connectionString: string;

  private constructor() {
    this.connectionString = "mongodb://localhost:27017";
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  connect(): void {
    console.log(`Connecting to ${this.connectionString}`);
  }
}

export {
  Person,
  BankAccount,
  Book,
  User,
  Animal,
  Dog,
  Shape,
  Circle,
  Square,
  MathUtils,
  Temperature,
  DatabaseConnection,
};
