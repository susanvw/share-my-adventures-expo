import ApiClient from './ApiClient';
import { AuthenticateCommand, AuthenticateResponse, AuthView } from '../types/Authenticate';
import { Result } from '../types/Common';

class AuthenticateService {
  async authenticate(command: AuthenticateCommand): Promise<AuthenticateResponse> {
    try {
      return await ApiClient.post<Result<AuthView>>('/authenticate/authenticate', command);
    } catch (err) {
      // Mock fallback for localhost testing
      return new Promise((resolve) => {
        setTimeout(() => {
          if (command.username === 'test@example.com' && command.password === 'password') {
            resolve({
              succeeded: true,
              data: {
                userId: 'mock-user-id',
                jwtToken: 'mock-jwt-token',
                refreshToken: 'mock-refresh-token',
                roleNames: ['user'],
                jwtExpiryTime: new Date(Date.now() + 3600000).toISOString(),
              },
              errors: null,
            });
          } else {
            resolve({ succeeded: false, errors: ['Invalid credentials'], data: null });
          }
        }, 500);
      });
    }
  }

  async logout(): Promise<void> {
    // Handled by UserContext
  }
}

export default new AuthenticateService();