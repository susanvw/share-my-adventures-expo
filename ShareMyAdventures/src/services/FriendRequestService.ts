import ApiClient from './ApiClient';
import {
  FriendRequestViewPagedDataResult,
  SendInviteCommand,
  SendInviteResponse,
  AcceptFriendRequestResponse,
  RejectFriendRequestResponse,
} from '../types/FriendRequest';

class FriendRequestService {
  async getFriendRequests(pageNumber?: number, pageSize?: number): Promise<FriendRequestViewPagedDataResult> {
    return ApiClient.get<FriendRequestViewPagedDataResult>('/FriendRequest', {
      params: { PageNumber: pageNumber, PageSize: pageSize },
    });
  }

  async sendFriendRequest(command: SendInviteCommand): Promise<SendInviteResponse> {
    return ApiClient.post<SendInviteResponse>('/FriendRequest', command);
  }

  async acceptFriendRequest(id: number): Promise<AcceptFriendRequestResponse> {
    return ApiClient.patch<AcceptFriendRequestResponse>(`/FriendRequest/${id}/Accept`);
  }

  async rejectFriendRequest(id: number): Promise<RejectFriendRequestResponse> {
    return ApiClient.patch<RejectFriendRequestResponse>(`/FriendRequest/${id}/Reject`);
  }
}

export default new FriendRequestService();