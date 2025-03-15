import { Result, PagedData, ProblemDetails } from './Common';

export interface FriendRequestView {
  id: number;
  displayName: string;
  photo?: string;
  invitationStatusLookupId: number;
  invitationStatusLookupName: string;
  canAccept: boolean;
}

export interface SendInviteCommand {
  userId: string;
}

export type FriendRequestViewPagedDataResult = Result<PagedData<FriendRequestView>>;
export type SendInviteResponse = Result<number | null>;
export type AcceptFriendRequestResponse = Result<void> | ProblemDetails;
export type RejectFriendRequestResponse = Result<void> | ProblemDetails;