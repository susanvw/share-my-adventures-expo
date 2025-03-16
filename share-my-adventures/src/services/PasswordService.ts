import ApiClient from './ApiClient';
import {
  SendPasswordReminderCommand,
  SendPasswordReminderResponse,
  ResetPasswordCommand,
  ResetPasswordResponse,
} from '../types/Password';

class PasswordService {
  async sendPasswordReminder(command: SendPasswordReminderCommand): Promise<SendPasswordReminderResponse> {
    return ApiClient.post<SendPasswordReminderResponse>('/Password/Reminder', command);
  }

  async resetPassword(command: ResetPasswordCommand): Promise<ResetPasswordResponse> {
    return ApiClient.patch<ResetPasswordResponse>('/Password/Reset', command);
  }
}

export default new PasswordService();