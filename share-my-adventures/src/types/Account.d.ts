import { Result, ProblemDetails } from './Common';

export interface RegisterAccountCommand {
  email: string;
  password: string;
  displayName?: string | null;
  callbackUrl?: string;
}

export interface ConfirmEmailCommand {
  email: string;
  token: string;
}

export type RegisterAccountResponse = Result<string>;
export type ConfirmEmailResponse = void | ProblemDetails;
export type DeleteAccountResponse = void | ProblemDetails;
