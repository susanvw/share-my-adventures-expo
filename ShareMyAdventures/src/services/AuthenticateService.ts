import ApiClient from './ApiClient';
import { AuthenticateCommand, AuthenticateResponse } from '../types/Authenticate';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthenticateService {
  async authenticate(command: AuthenticateCommand): Promise<AuthenticateResponse> {
    const response = await ApiClient.post<AuthenticateResponse>('/Authenticate/Authenticate', command);
    if (response.succeeded && response.data) {
      await AsyncStorage.setItem('jwtToken', response.data.jwtToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response;
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.removeItem('refreshToken');
  }
}

export default new AuthenticateService();