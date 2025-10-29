/**
 * Decorators in TypeScript
 * Note: Decorators are an experimental feature
 * Enable with "experimentalDecorators": true in tsconfig.json
 */

// Class Decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

function logger<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      console.log(`Creating instance of ${constructor.name}`);
    }
  };
}

// Method Decorator
function log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };

  return descriptor;
}

// Property Decorator
function readonly(target: any, propertyKey: string): void {
  Object.defineProperty(target, propertyKey, {
    writable: false,
  });
}

// Accessor Decorator
function configurable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    descriptor.configurable = value;
    return descriptor;
  };
}

// Parameter Decorator
function required(target: Object, propertyKey: string, parameterIndex: number): void {
  // Store metadata about required parameters
  // In a real application, you would use reflect-metadata package
  console.log(`Parameter ${parameterIndex} is required for ${propertyKey}`);
}

// Example Usage
class Example {
  @readonly
  id: number = 1;

  @log
  calculate(x: number, y: number): number {
    return x + y;
  }

  @configurable(false)
  get value(): number {
    return 42;
  }
}

// Decorator Factory
function format(formatString: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);
      return formatString.replace("{0}", result);
    };

    return descriptor;
  };
}

class Formatter {
  @format("Result: {0}")
  getMessage(): string {
    return "Hello, World!";
  }
}

// Performance Measuring Decorator
function measure(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`${propertyKey} took ${end - start}ms to execute`);
    return result;
  };

  return descriptor;
}

// Memoization Decorator
function memoize(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;
  const cache = new Map<string, any>();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("Returning cached result");
      return cache.get(key);
    }
    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @measure
  @memoize
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}

// Validation Decorator
function validate(validationFn: (value: any) => boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      for (const arg of args) {
        if (!validationFn(arg)) {
          throw new Error(`Validation failed for ${propertyKey}`);
        }
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class UserService {
  @validate((value: any) => typeof value === "string" && value.length > 0)
  createUser(name: string): { name: string } {
    return { name };
  }
}

// Retry Decorator
function retry(times: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let lastError: Error = new Error("Unknown error");

      for (let i = 0; i < times; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          lastError = error as Error;
          console.log(`Attempt ${i + 1} failed. Retrying...`);
        }
      }

      throw lastError;
    };

    return descriptor;
  };
}

class ApiService {
  @retry(3)
  async fetchData(url: string): Promise<any> {
    // Simulated API call that might fail
    if (Math.random() > 0.5) {
      throw new Error("Network error");
    }
    return { data: "success" };
  }
}

export {
  sealed,
  logger,
  log,
  readonly,
  configurable,
  format,
  measure,
  memoize,
  validate,
  retry,
  Example,
  Formatter,
  Calculator,
  UserService,
  ApiService,
};
