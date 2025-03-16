import { Result, ProblemDetails } from './Common';

export interface RegisterAccountCommand {
  username: string;
  password: string;
  callbackUrl?: string;
}

export interface ConfirmEmailCommand {
  email: string;
  token: string;
}

export type RegisterAccountResponse = Result<string>;
export type ConfirmEmailResponse = Result<void> | ProblemDetails;
export type DeleteAccountResponse = Result<void> | ProblemDetails;