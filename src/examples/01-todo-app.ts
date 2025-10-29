/**
 * Practical Example: Todo Application
 * A complete todo application demonstrating TypeScript features
 */

// Types and Interfaces
interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

enum Priority {
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
  Urgent = "URGENT",
}

type TodoFilter = {
  completed?: boolean;
  priority?: Priority;
  tags?: string[];
};

type TodoInput = Omit<Todo, "id" | "createdAt" | "updatedAt">;
type TodoUpdate = Partial<Omit<Todo, "id" | "createdAt" | "updatedAt">>;

// Repository Pattern
class TodoRepository {
  private todos: Map<string, Todo> = new Map();
  private currentId = 0;

  private generateId(): string {
    return `todo-${++this.currentId}`;
  }

  create(input: TodoInput): Todo {
    const todo: Todo = {
      id: this.generateId(),
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.todos.set(todo.id, todo);
    return todo;
  }

  findById(id: string): Todo | undefined {
    return this.todos.get(id);
  }

  findAll(filter?: TodoFilter): Todo[] {
    let todos = Array.from(this.todos.values());

    if (filter) {
      if (filter.completed !== undefined) {
        todos = todos.filter((todo) => todo.completed === filter.completed);
      }

      if (filter.priority) {
        todos = todos.filter((todo) => todo.priority === filter.priority);
      }

      if (filter.tags && filter.tags.length > 0) {
        todos = todos.filter((todo) =>
          filter.tags!.some((tag) => todo.tags?.includes(tag))
        );
      }
    }

    return todos;
  }

  update(id: string, update: TodoUpdate): Todo | undefined {
    const todo = this.todos.get(id);

    if (!todo) {
      return undefined;
    }

    const updated: Todo = {
      ...todo,
      ...update,
      updatedAt: new Date(),
    };

    this.todos.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.todos.delete(id);
  }

  clear(): void {
    this.todos.clear();
  }
}

// Service Layer
class TodoService {
  constructor(private repository: TodoRepository) {}

  createTodo(input: TodoInput): Todo {
    return this.repository.create(input);
  }

  getTodo(id: string): Todo | undefined {
    return this.repository.findById(id);
  }

  getAllTodos(filter?: TodoFilter): Todo[] {
    return this.repository.findAll(filter);
  }

  updateTodo(id: string, update: TodoUpdate): Todo | undefined {
    return this.repository.update(id, update);
  }

  deleteTodo(id: string): boolean {
    return this.repository.delete(id);
  }

  completeTodo(id: string): Todo | undefined {
    return this.repository.update(id, { completed: true });
  }

  incompleteTodo(id: string): Todo | undefined {
    return this.repository.update(id, { completed: false });
  }

  getCompletedTodos(): Todo[] {
    return this.repository.findAll({ completed: true });
  }

  getIncompleteTodos(): Todo[] {
    return this.repository.findAll({ completed: false });
  }

  getTodosByPriority(priority: Priority): Todo[] {
    return this.repository.findAll({ priority });
  }

  searchByTag(tag: string): Todo[] {
    return this.repository.findAll({ tags: [tag] });
  }

  clearAllTodos(): void {
    this.repository.clear();
  }
}

// Usage Example
function runTodoApp(): void {
  const repository = new TodoRepository();
  const service = new TodoService(repository);

  // Create todos
  const todo1 = service.createTodo({
    title: "Learn TypeScript",
    description: "Complete TypeScript tutorial",
    completed: false,
    priority: Priority.High,
    tags: ["learning", "typescript"],
  });

  const todo2 = service.createTodo({
    title: "Build a project",
    description: "Create a full-stack application",
    completed: false,
    priority: Priority.Medium,
    tags: ["project", "typescript"],
  });

  const todo3 = service.createTodo({
    title: "Review code",
    description: "Review pull requests",
    completed: true,
    priority: Priority.Low,
    tags: ["review"],
  });

  // List all todos
  console.log("All todos:", service.getAllTodos());

  // Get incomplete todos
  console.log("Incomplete todos:", service.getIncompleteTodos());

  // Update a todo
  service.updateTodo(todo1.id, {
    description: "Complete advanced TypeScript features",
  });

  // Complete a todo
  service.completeTodo(todo2.id);

  // Get todos by priority
  console.log("High priority todos:", service.getTodosByPriority(Priority.High));

  // Search by tag
  console.log("TypeScript todos:", service.searchByTag("typescript"));

  // Delete a todo
  service.deleteTodo(todo3.id);

  console.log("Final todos:", service.getAllTodos());
}

export { Todo, Priority, TodoFilter, TodoInput, TodoRepository, TodoService, runTodoApp };
