
import ApiClient from './ApiClient';
import { RegisterAccountCommand, RegisterAccountResponse, ConfirmEmailCommand, ConfirmEmailResponse, DeleteAccountResponse } from '../types/Account';

class AccountService {
  async registerAccount(command: RegisterAccountCommand): Promise<RegisterAccountResponse> {
    try {
      return await ApiClient.post<RegisterAccountResponse>('/Account', command);
    } catch (error) {
      // Mock fallback for localhost testing
      return new Promise((resolve) => {
        setTimeout(() => {
          if (command.password.length < 6) {
            resolve({ succeeded: false, errors: ['Password must be at least 6 characters'] });
          } else {
            resolve({ succeeded:true,  data: 'User Created'});
          }
        }, 500);
      });
    }
  }

  async confirmEmail(command: ConfirmEmailCommand): Promise<ConfirmEmailResponse> {
    return ApiClient.patch<ConfirmEmailResponse>('/Account/Confirm', command);
  }

  async deleteAccount(userId: string): Promise<DeleteAccountResponse> {
    return ApiClient.delete<DeleteAccountResponse>(`/Account/${userId}`);
  }
}

export default new AccountService();