"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenLibraryClient = void 0;
const axios_1 = __importDefault(require("axios"));
const work_1 = require("./schemes/work");
const edition_1 = require("./schemes/edition");
const author_1 = require("./schemes/author");
const search_1 = require("./schemes/search");
class OpenLibraryClient {
    /**
     * @param userAgent - A string specifying the User-Agent for API requests.
     * This should include the name of your application and a contact email.
     * @example
     * const client = new OpenLibraryClient("MyAppName/1.0 (myemail@example.com)");
     */
    constructor(userAgent) {
        this.client = axios_1.default.create({
            baseURL: "https://openlibrary.org",
            headers: {
                "User-Agent": userAgent,
            },
        });
    }
    async request(endpoint) {
        try {
            const res = await this.client.get(endpoint);
            return res.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                const status = error.response?.status ?? 0;
                const message = error.response?.data?.message ?? "Unknown error";
                throw new Error(`Failed to fetch ${endpoint}: ${status} ${message}`);
            }
            throw new Error(`Failed to fetch ${endpoint}: ${error}`);
        }
    }
    async getWork(id) {
        const data = await this.request(`/works/${id}.json`);
        return work_1.WorkSchema.parse(data);
    }
    async getWorkEditions(id) {
        const data = await this.request(`/works/${id}/editions.json`);
        return work_1.WorkEditionResponseSchema.parse(data);
    }
    async getEdition(id) {
        const data = await this.request(`/books/${id}.json`);
        return edition_1.EditionSchema.parse(data);
    }
    async getAuthor(id) {
        const data = await this.request(`/authors/${id}.json`);
        return author_1.AuthorSchema.parse(data);
    }
    async getAuthorWorks(id) {
        const data = await this.request(`/authors/${id}/works.json`);
        return author_1.AuthorWorksResponseSchema.parse(data);
    }
    async search(params) {
        const data = await this.request(`/search.json?${new URLSearchParams(params)}`);
        return search_1.SearchResponseSchema.parse(data);
    }
}
exports.OpenLibraryClient = OpenLibraryClient;
