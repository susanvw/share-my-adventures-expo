import ApiClient from './ApiClient';
import { AuthenticateCommand, AuthenticateResponse, AuthView } from '../types/Authenticate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Result } from '../types/Common';

class AuthenticateService {
  async authenticate(command: AuthenticateCommand): Promise<AuthenticateResponse> {
    try {
      const response = await ApiClient.post<Result<AuthView>>('/authenticate/authenticate', command);
      if (response.succeeded && response.data) {
        await AsyncStorage.setItem('jwtToken', response.data.jwtToken);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        await AsyncStorage.setItem('userId', response.data.userId);
      }
      return response;
    } catch (err) {
      return { succeeded: false, errors: ['Authentication failed'] };
    }
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.removeItem('refreshToken');
  }
}

export default new AuthenticateService();