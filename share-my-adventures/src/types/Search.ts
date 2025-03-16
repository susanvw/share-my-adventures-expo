import { Result, PagedData } from './Common';

export interface SearchView {
  id: string;
  displayName: string;
  email: string;
  photo?: string; // Base64 encoded
}

export type SearchViewPagedDataResult = Result<PagedData<SearchView>>;