export interface Result<T> {
    data?: T | null;
    errors?: string[] | null;
    succeeded: boolean;
  }
  
  export interface PagedData<T> {
    pageNo: number;
    pageSize: number;
    pageCount: number;
    itemCount: number;
    data: T[] | null;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }
  
  export interface ProblemDetails {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
  }