import ApiClient from './ApiClient';
import {
  ProfileViewResult,
  UpdateProfileCommand,
  UpdateProfileResponse,
  UploadAvatarCommand,
  UploadAvatarResponse,
  ToggleTrackingCommand,
  ToggleTrackingResponse,
  FollowMeResponse,
} from '../types/Profile';

class ProfileService {
  async getProfile(userId: string): Promise<ProfileViewResult> {
    return ApiClient.get<ProfileViewResult>(`/Profile/${userId}`);
  }

  async updateProfile(userId: string, command: UpdateProfileCommand): Promise<UpdateProfileResponse> {
    return ApiClient.put<UpdateProfileResponse>(`/Profile/${userId}`, command);
  }

  async uploadAvatar(userId: string, command: UploadAvatarCommand): Promise<UploadAvatarResponse> {
    return ApiClient.patch<UploadAvatarResponse>(`/Profile/${userId}/Patch`, command);
  }

  async toggleTracking(userId: string, command: ToggleTrackingCommand): Promise<ToggleTrackingResponse> {
    return ApiClient.patch<ToggleTrackingResponse>(`/Profile/${userId}/ToggleTracking`, command);
  }

  async followMe(): Promise<FollowMeResponse> {
    return ApiClient.patch<FollowMeResponse>('/Profile/FollowMe');
  }
}

export default new ProfileService();