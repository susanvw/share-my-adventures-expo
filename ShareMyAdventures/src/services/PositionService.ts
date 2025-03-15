import ApiClient from './ApiClient';
import { PositionViewIReadOnlyListResult, CreatePositionCommand, CreatePositionResponse } from '../types/Position';

class PositionService {
  async createPosition(command: CreatePositionCommand): Promise<CreatePositionResponse> {
    return ApiClient.post<CreatePositionResponse>('/Position', command);
  }

  async getLatestPositions(adventureId: number, fromDate?: string): Promise<PositionViewIReadOnlyListResult> {
    return ApiClient.get<PositionViewIReadOnlyListResult>(`/Position/LatestForAdventure/${adventureId}`, {
      params: { fromDate },
    });
  }
}

export default new PositionService();