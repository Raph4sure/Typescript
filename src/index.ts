/**
 * TypeScript Mastery - Main Entry Point
 * This file serves as the entry point for running examples
 */

import { runTodoApp } from "./examples/01-todo-app";

console.log("=== TypeScript Mastery Examples ===\n");

// Run Todo App Example
console.log("--- Todo Application Example ---");
runTodoApp();

// Note: API client example is commented out as it requires a real API
// Uncomment to run if you have an API endpoint
// import { demonstrateApiClient } from "./examples/02-api-client";
// console.log("\n--- API Client Example ---");
// demonstrateApiClient().catch(console.error);

console.log("\n=== Examples completed ===");
