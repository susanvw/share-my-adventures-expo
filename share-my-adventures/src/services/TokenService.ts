import ApiClient from './ApiClient';
import { RefreshTokenCommand, RefreshTokenResponseResult, RevokeTokenResponse } from '../types/Token';
import AsyncStorage from '@react-native-async-storage/async-storage';

class TokenService {
  async refreshToken(command: RefreshTokenCommand): Promise<RefreshTokenResponseResult> {
    const response = await ApiClient.post<RefreshTokenResponseResult>('/Token/Refresh', command);
    if (response.succeeded && response.data) {
      await AsyncStorage.setItem('jwtToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response;
  }

  async revokeToken(): Promise<RevokeTokenResponse> {
    return ApiClient.put<RevokeTokenResponse>('/Token/Revoke');
  }
}

export default new TokenService();