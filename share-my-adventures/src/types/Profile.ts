import { Result, ProblemDetails } from './Common';

export interface ProfileView {
  id: string;
  displayName: string;
  email: string;
  username: string;
  photo?: string; // Base64 encoded
  followMe: boolean;
  trailColor?: string;
}

export interface UpdateProfileCommand {
  userId: string;
  displayName: string;
  trailColor?: string;
  followMe: boolean;
}

export interface UploadAvatarCommand {
  userId: string;
  photo?: string;
}

export interface ToggleTrackingCommand {
  userId: string;
}

export type ProfileViewResult = Result<ProfileView>;
export type UpdateProfileResponse = Result<void> | ProblemDetails;
export type UploadAvatarResponse = Result<void> | ProblemDetails;
export type ToggleTrackingResponse = Result<void> | ProblemDetails;
export type FollowMeResponse = Result<void> | ProblemDetails;