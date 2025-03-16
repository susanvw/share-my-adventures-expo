import ApiClient from './ApiClient';
import { FriendViewPagedDataResult, DeleteFriendResponse } from '../types/Friend';

class FriendService {
  async getFriends(pageNumber?: number, pageSize?: number): Promise<FriendViewPagedDataResult> {
    return ApiClient.get<FriendViewPagedDataResult>('/Friend', {
      params: { PageNumber: pageNumber, PageSize: pageSize },
    });
  }

  async deleteFriend(id: number): Promise<DeleteFriendResponse> {
    return ApiClient.delete<DeleteFriendResponse>(`/Friend/${id}`);
  }
}

export default new FriendService();