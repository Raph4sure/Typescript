# TypeScript Mastery

A comprehensive guide to mastering TypeScript with practical examples, covering everything from basics to advanced concepts.

## 📚 Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Topics Covered](#topics-covered)
- [Running Examples](#running-examples)
- [Learning Path](#learning-path)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Build

```bash
npm run build
```

### Run Examples

```bash
npm start
```

## 📁 Project Structure

```
typescript-mastery/
├── src/
│   ├── basics/
│   │   ├── 01-types.ts           # Fundamental TypeScript types
│   │   ├── 02-functions.ts       # Function types and patterns
│   │   └── 03-interfaces.ts      # Interfaces and type contracts
│   ├── intermediate/
│   │   ├── 01-classes.ts         # Object-oriented programming
│   │   ├── 02-generics.ts        # Generic types and functions
│   │   └── 03-type-manipulation.ts # Advanced type manipulation
│   ├── advanced/
│   │   ├── 01-decorators.ts      # Decorators and metadata
│   │   └── 02-advanced-types.ts  # Advanced type patterns
│   ├── examples/
│   │   ├── 01-todo-app.ts        # Complete todo application
│   │   └── 02-api-client.ts      # Type-safe API client
│   └── index.ts                   # Main entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 📖 Topics Covered

### Basics

- **Types** (`basics/01-types.ts`)
  - Primitive types (string, number, boolean)
  - Arrays and tuples
  - Union and literal types
  - Type aliases and enums
  - Any, unknown, void, and never

- **Functions** (`basics/02-functions.ts`)
  - Function declarations and expressions
  - Arrow functions
  - Optional and default parameters
  - Rest parameters and function overloads
  - Generic functions
  - Async/await patterns

- **Interfaces** (`basics/03-interfaces.ts`)
  - Basic interfaces
  - Optional and readonly properties
  - Function types in interfaces
  - Index signatures
  - Interface inheritance
  - Implementing interfaces in classes

### Intermediate

- **Classes** (`intermediate/01-classes.ts`)
  - Class basics and constructors
  - Access modifiers (public, private, protected)
  - Readonly properties and parameter properties
  - Inheritance and method overriding
  - Abstract classes
  - Static members
  - Getters and setters
  - Design patterns (Singleton)

- **Generics** (`intermediate/02-generics.ts`)
  - Generic functions and classes
  - Generic constraints
  - Multiple type parameters
  - Generic interfaces and type aliases
  - Generic utility types
  - Type-safe data structures

- **Type Manipulation** (`intermediate/03-type-manipulation.ts`)
  - Mapped types
  - Conditional types
  - Template literal types
  - Indexed access types
  - keyof and typeof operators
  - Utility types (Partial, Pick, Omit, Record, etc.)
  - Type guards and type predicates
  - Discriminated unions

### Advanced

- **Decorators** (`advanced/01-decorators.ts`)
  - Class decorators
  - Method decorators
  - Property decorators
  - Parameter decorators
  - Decorator factories
  - Common patterns (logging, validation, memoization)

- **Advanced Types** (`advanced/02-advanced-types.ts`)
  - Recursive types
  - Branded types (nominal typing)
  - Mapped types with key remapping
  - Variadic tuple types
  - Type-level programming
  - Const assertions
  - Phantom types
  - Exhaustiveness checking

### Practical Examples

- **Todo Application** (`examples/01-todo-app.ts`)
  - Complete CRUD operations
  - Repository pattern
  - Service layer architecture
  - Type-safe filtering and querying

- **API Client** (`examples/02-api-client.ts`)
  - Generic REST API client
  - Type-safe HTTP methods
  - Error handling with discriminated unions
  - Domain-specific API services

## 🎯 Learning Path

### Beginner (Week 1-2)
1. Start with `basics/01-types.ts` - Learn fundamental types
2. Move to `basics/02-functions.ts` - Master function types
3. Study `basics/03-interfaces.ts` - Understand type contracts

### Intermediate (Week 3-4)
4. Explore `intermediate/01-classes.ts` - Object-oriented TypeScript
5. Master `intermediate/02-generics.ts` - Generic programming
6. Study `intermediate/03-type-manipulation.ts` - Advanced type features

### Advanced (Week 5-6)
7. Learn `advanced/01-decorators.ts` - Metaprogramming with decorators
8. Master `advanced/02-advanced-types.ts` - Type-level programming

### Practice (Week 7-8)
9. Build the todo app from `examples/01-todo-app.ts`
10. Create an API client using `examples/02-api-client.ts`

## 💡 Tips for Learning

1. **Type Everything**: Don't rely on type inference too much when learning
2. **Read Compiler Errors**: TypeScript errors are educational
3. **Experiment**: Modify the examples and see what breaks
4. **Build Projects**: Apply concepts to real-world projects
5. **Use Strict Mode**: Always use strict TypeScript settings

## 🔧 Configuration

The project uses strict TypeScript configuration (`tsconfig.json`):

- Strict type checking enabled
- No implicit any
- Strict null checks
- All type checking features enabled

## 📝 Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled examples
- `npm run dev` - Run TypeScript files directly with ts-node
- `npm run clean` - Remove compiled files

## 🤝 Contributing

Feel free to add more examples or improve existing ones!

## 📄 License

MIT

## 🎓 Resources

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

---

Happy Learning! 🚀