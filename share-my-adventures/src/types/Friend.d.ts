import { PagedData, Result } from "./Common";

// Friend API Types
  export interface FriendView {
    id?: string;
    displayName?: string;
    photo?: string; // Base64 string
  }
  
  export interface GetFriendsQuery {
    PageNumber?: number;
    PageSize?: number;
  }
  
  export type GetFriendsResponse = Result<PagedData<FriendView>>;
  
  export type DeleteFriendResponse = void; // 204 No Content
  
  // FriendRequest API Types
  export interface FriendRequestView {
    id: number;
    displayName?: string;
    photo?: string;
    invitationStatusLookupId: number;
    invitationStatusLookupName?: string;
    canAccept: boolean;
  }
  
  export interface GetFriendRequestsQuery {
    PageNumber?: number;
    PageSize?: number;
  }
  
  export type GetFriendRequestsResponse = Result<PagedData<FriendRequestView>>;
  
  export interface SendInviteCommand {
    userId?: string;
  }
  
  export type SendInviteResponse = Result<number | null>;
  
  export type AcceptFriendRequestResponse = void; // 204 No Content
  
  export type RejectFriendRequestResponse = void; // 204 No Content