import axios, { AxiosInstance } from "axios";
import {
  WorkSchema,
  Work,
  WorkEdition,
  WorkEditionResponse,
  WorkEditionSchema,
  WorkEditionResponseSchema,
} from "./schemes/work";
import { EditionSchema, Edition } from "./schemes/edition";
import {
  Author,
  AuthorSchema,
  AuthorWorksResponse,
  AuthorWorksResponseSchema,
} from "./schemes/author";
import {
  SearchRequest,
  SearchResponse,
  SearchResponseSchema,
} from "./schemes/search";
export class OpenLibraryClient {
  private client: AxiosInstance;

  /**
   * @param userAgent - A string specifying the User-Agent for API requests.
   * This should include the name of your application and a contact email or phone number.
   * @example
   * const client = new OpenLibraryClient("MyAppName/1.0 (myemail@example.com)");
   */
  constructor(userAgent: string) {
    this.client = axios.create({
      baseURL: "https://openlibrary.org",
      headers: {
        "User-Agent": userAgent,
      },
    });
  }

  private async request<T>(endpoint: string): Promise<T> {
    try {
      const res = await this.client.get<T>(endpoint);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 0;
        const message = error.response?.data?.message ?? "Unknown error";
        throw new Error(`Failed to fetch ${endpoint}: ${status} ${message}`);
      }
      throw new Error(`Failed to fetch ${endpoint}: ${error}`);
    }
  }

  async getWork(id: string): Promise<Work> {
    const data = await this.request<any>(`/works/${id}.json`);
    return WorkSchema.parse(data);
  }

  async getWorkEditions(id: string): Promise<WorkEditionResponse> {
    const data = await this.request<any>(`/works/${id}/editions.json`);
    return WorkEditionResponseSchema.parse(data);
  }

  async getEdition(id: string): Promise<Edition> {
    const data = await this.request<any>(`/books/${id}.json`);
    return EditionSchema.parse(data);
  }

  async getAuthor(id: string): Promise<Author> {
    const data = await this.request<any>(`/authors/${id}.json`);
    return AuthorSchema.parse(data);
  }

  async getAuthorWorks(id: string): Promise<AuthorWorksResponse> {
    const data = await this.request<any>(`/authors/${id}/works.json`);
    return AuthorWorksResponseSchema.parse(data);
  }

  async search(params: SearchRequest): Promise<SearchResponse> {
    const data = await this.request<any>(
      `/search.json?${new URLSearchParams(params as any)}`,
    );
    return SearchResponseSchema.parse(data);
  }
}
