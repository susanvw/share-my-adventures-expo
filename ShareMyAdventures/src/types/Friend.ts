import { Result, PagedData, ProblemDetails } from './Common';

export interface FriendView {
  id: string;
  displayName: string;
  photo?: string; // Base64 encoded
}

export type FriendViewPagedDataResult = Result<PagedData<FriendView>>;
export type DeleteFriendResponse = Result<void> | ProblemDetails;