import { Result } from "./Common";

// Password API Types
export interface SendPasswordReminderCommand {
  username?: string;
  url?: string;
}

export type SendPasswordReminderResponse = Result<string>;

export interface ResetPasswordCommand {
  username?: string;
  password?: string;
  token?: string;
}

export type ResetPasswordResponse = void; // 204 No Content