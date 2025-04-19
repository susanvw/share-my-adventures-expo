import { Result } from "./Common";

  // Token API Types
  export interface RefreshTokenCommand {
    accessToken?: string;
    refreshToken?: string;
  }
  
  export interface RefreshTokenResponse {
    accessToken?: string;
    refreshToken?: string;
    refreshTokenExpires?: string; // ISO date string
  }
  
  export type RefreshTokenResult = Result<RefreshTokenResponse>;
  
  export type RevokeTokenResponse = void; // 200 OK, no content specified