import ApiClient from './ApiClient';
import { SearchViewPagedDataResult } from '../types/Search';

class SearchService {
  async search(filter?: string, pageNumber?: number, pageSize?: number): Promise<SearchViewPagedDataResult> {
    return ApiClient.get<SearchViewPagedDataResult>('/Search/Search', {
      params: { Filter: filter, PageNumber: pageNumber, PageSize: pageSize },
    });
  }
}

export default new SearchService();