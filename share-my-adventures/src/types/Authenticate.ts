import { Result } from './Common';

export interface AuthenticateCommand {
  username: string;
  password: string;
}

export interface AuthView {
  userId: string;
  jwtToken: string;
  refreshToken: string;
  roleNames: string[];
  jwtExpiryTime: string; // ISO date
}

export type AuthenticateResponse = Result<AuthView>;