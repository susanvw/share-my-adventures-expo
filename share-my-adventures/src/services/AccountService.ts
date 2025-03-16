import ApiClient from './ApiClient';
import { RegisterAccountCommand, RegisterAccountResponse, ConfirmEmailCommand, ConfirmEmailResponse, DeleteAccountResponse } from '../types/Account';

class AccountService {
  async registerAccount(command: RegisterAccountCommand): Promise<RegisterAccountResponse> {
    return ApiClient.post<RegisterAccountResponse>('/Account', command);
  }

  async confirmEmail(command: ConfirmEmailCommand): Promise<ConfirmEmailResponse> {
    return ApiClient.patch<ConfirmEmailResponse>('/Account/Confirm', command);
  }

  async deleteAccount(userId: string): Promise<DeleteAccountResponse> {
    return ApiClient.delete<DeleteAccountResponse>(`/Account/${userId}`);
  }
}

export default new AccountService();