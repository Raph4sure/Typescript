/**
 * Practical Example: Type-Safe API Client
 * A REST API client with full TypeScript type safety
 */

// API Response Types
type ApiResponse<T> =
  | { success: true; data: T; meta?: ResponseMeta }
  | { success: false; error: ApiError };

interface ResponseMeta {
  page?: number;
  pageSize?: number;
  total?: number;
}

interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// HTTP Methods
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Request Configuration
interface RequestConfig {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}

// API Client Options
interface ApiClientOptions {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// Generic API Client
class ApiClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;

  constructor(options: ApiClientOptions) {
    this.baseURL = options.baseURL;
    this.timeout = options.timeout || 30000;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...options.headers,
    };
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(endpoint, this.baseURL);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url.toString();
  }

  async request<T>(endpoint: string, config: RequestConfig): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint, config.params);
    const headers = { ...this.defaultHeaders, ...config.headers };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method: config.method,
        headers,
        body: config.body ? JSON.stringify(config.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error: ApiError = {
          code: `HTTP_${response.status}`,
          message: response.statusText,
        };
        return { success: false, error };
      }

      const data = (await response.json()) as T;
      return { success: true, data };
    } catch (error) {
      const apiError: ApiError = {
        code: "NETWORK_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
      };
      return { success: false, error: apiError };
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET", params });
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "POST", body });
  }

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "PUT", body });
  }

  async patch<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "PATCH", body });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

// Domain Models
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
}

// API Service with Type-Safe Methods
class UserApiService {
  constructor(private client: ApiClient) {}

  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.client.get<User[]>("/users");
  }

  async getUserById(id: number): Promise<ApiResponse<User>> {
    return this.client.get<User>(`/users/${id}`);
  }

  async createUser(data: CreateUserRequest): Promise<ApiResponse<User>> {
    return this.client.post<User>("/users", data);
  }

  async updateUser(id: number, data: UpdateUserRequest): Promise<ApiResponse<User>> {
    return this.client.patch<User>(`/users/${id}`, data);
  }

  async deleteUser(id: number): Promise<ApiResponse<void>> {
    return this.client.delete<void>(`/users/${id}`);
  }

  async searchUsers(query: string): Promise<ApiResponse<User[]>> {
    return this.client.get<User[]>("/users", { q: query });
  }
}

class PostApiService {
  constructor(private client: ApiClient) {}

  async getPosts(page: number = 1, pageSize: number = 10): Promise<ApiResponse<Post[]>> {
    return this.client.get<Post[]>("/posts", {
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
  }

  async getPostById(id: number): Promise<ApiResponse<Post>> {
    return this.client.get<Post>(`/posts/${id}`);
  }

  async getPostsByAuthor(authorId: number): Promise<ApiResponse<Post[]>> {
    return this.client.get<Post[]>("/posts", { authorId: authorId.toString() });
  }

  async createPost(data: Omit<Post, "id" | "createdAt">): Promise<ApiResponse<Post>> {
    return this.client.post<Post>("/posts", data);
  }

  async updatePost(id: number, data: Partial<Post>): Promise<ApiResponse<Post>> {
    return this.client.patch<Post>(`/posts/${id}`, data);
  }

  async deletePost(id: number): Promise<ApiResponse<void>> {
    return this.client.delete<void>(`/posts/${id}`);
  }
}

// Usage Example
async function demonstrateApiClient(): Promise<void> {
  const client = new ApiClient({
    baseURL: "https://api.example.com",
    timeout: 5000,
    headers: {
      Authorization: "Bearer token123",
    },
  });

  const userService = new UserApiService(client);
  const postService = new PostApiService(client);

  // Get users
  const usersResponse = await userService.getUsers();
  if (usersResponse.success) {
    console.log("Users:", usersResponse.data);
  } else {
    console.error("Error:", usersResponse.error);
  }

  // Create a user
  const createResponse = await userService.createUser({
    name: "John Doe",
    email: "john@example.com",
    password: "secret123",
  });

  if (createResponse.success) {
    const user = createResponse.data;
    console.log("Created user:", user);

    // Update the user
    const updateResponse = await userService.updateUser(user.id, {
      name: "John Smith",
    });

    if (updateResponse.success) {
      console.log("Updated user:", updateResponse.data);
    }
  }

  // Get posts
  const postsResponse = await postService.getPosts(1, 20);
  if (postsResponse.success) {
    console.log("Posts:", postsResponse.data);
  }
}

export {
  ApiClient,
  UserApiService,
  PostApiService,
  demonstrateApiClient,
  type ApiResponse,
  type User,
  type Post,
};
