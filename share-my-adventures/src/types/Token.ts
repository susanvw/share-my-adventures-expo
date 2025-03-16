import { Result } from './Common';

export interface RefreshTokenCommand {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpires?: string; // ISO date
}

export type RefreshTokenResponseResult = Result<RefreshTokenResponse>;
export type RevokeTokenResponse = Result<void>;