import { Result } from './Common';

export interface SendPasswordReminderCommand {
  username: string;
  url?: string;
}

export interface ResetPasswordCommand {
  username: string;
  password: string;
  token: string;
}

export type SendPasswordReminderResponse = Result<string>;
export type ResetPasswordResponse = Result<void>;