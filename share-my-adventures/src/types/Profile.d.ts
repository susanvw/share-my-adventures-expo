import { Result } from "./Common";

// Profile API Types
export type FollowMeResponse = void; // 204 No Content
  
export interface ProfileView {
  id?: string;
  displayName?: string;
  email?: string;
  username?: string;
  photo?: string; // Base64 string
  followMe: boolean;
  trailColor?: string;
}

export type GetProfileResponse = Result<ProfileView>;

export interface UpdateProfileCommand {
  userId?: string;
  displayName?: string;
  trailColor?: string;
  followMe: boolean;
}

export type UpdateProfileResponse = void; // 204 No Content

export interface UploadAvatarCommand {
  userId?: string;
  photo?: string;
}

export type UploadAvatarResponse = void; // 204 No Content

export interface ToggleTrackingCommand {
  userId?: string;
}

export type ToggleTrackingResponse = void; // 204 No Content