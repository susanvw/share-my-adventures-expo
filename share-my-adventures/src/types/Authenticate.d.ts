import { Result } from "./Common";

  // Authenticate API Types
  export interface AuthenticateCommand {
    username?: string;
    password?: string;
  }
  
  export interface AuthView {
    userId?: string;
    jwtToken?: string;
    refreshToken?: string;
    roleNames?: string[];
    jwtExpiryTime: string; // ISO date string
  }
  
  export type AuthenticateResponse = Result<AuthView>;