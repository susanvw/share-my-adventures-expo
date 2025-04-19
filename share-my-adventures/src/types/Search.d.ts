import { PagedData, Result } from "./Common";

 // Search API Types
  export interface SearchView {
    id?: string;
    displayName?: string;
    email?: string;
    photo?: string; // Base64 string
  }
  
  export interface SearchQuery {
    Filter?: string;
    PageNumber?: number;
    PageSize?: number;
  }
  
  export type SearchResponse = Result<PagedData<SearchView>>;