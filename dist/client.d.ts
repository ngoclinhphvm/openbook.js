import { Work, WorkEditionResponse } from "./schemes/work";
import { Edition } from "./schemes/edition";
import { Author, AuthorWorksResponse } from "./schemes/author";
import { SearchRequest, SearchResponse } from "./schemes/search";
export declare class OpenLibraryClient {
    private client;
    /**
     * @param userAgent - A string specifying the User-Agent for API requests.
     * This should include the name of your application and a contact email.
     * @example
     * const client = new OpenLibraryClient("MyAppName/1.0 (myemail@example.com)");
     */
    constructor(userAgent: string);
    private request;
    getWork(id: string): Promise<Work>;
    getWorkEditions(id: string): Promise<WorkEditionResponse>;
    getEdition(id: string): Promise<Edition>;
    getAuthor(id: string): Promise<Author>;
    getAuthorWorks(id: string): Promise<AuthorWorksResponse>;
    search(params: SearchRequest): Promise<SearchResponse>;
}
