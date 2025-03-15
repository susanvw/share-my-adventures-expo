import ApiClient from './ApiClient';
import {
  AdventureViewPagedDataResult,
  AdventureViewResult,
  CreateAdventureCommand,
  CreateAdventureResponse,
  UpdateAdventureCommand,
  UpdateAdventureResponse,
  StartAdventureResponse,
  CompleteAdventureResponse,
  DeleteAdventureResponse,
} from '../types/Adventure';

class AdventureService {
  async getAdventures(pageNumber?: number, pageSize?: number, statusLookupId?: number): Promise<AdventureViewPagedDataResult> {
    return ApiClient.get<AdventureViewPagedDataResult>('/Adventure', {
      params: { PageNumber: pageNumber, PageSize: pageSize, StatusLookupId: statusLookupId },
    });
  }

  async getAdventure(id: number): Promise<AdventureViewResult> {
    return ApiClient.get<AdventureViewResult>(`/Adventure/${id}`);
  }

  async createAdventure(command: CreateAdventureCommand): Promise<CreateAdventureResponse> {
    return ApiClient.post<CreateAdventureResponse>('/Adventure', command);
  }

  async updateAdventure(id: number, command: UpdateAdventureCommand): Promise<UpdateAdventureResponse> {
    return ApiClient.put<UpdateAdventureResponse>(`/Adventure/${id}`, command);
  }

  async startAdventure(id: number): Promise<StartAdventureResponse> {
    return ApiClient.patch<StartAdventureResponse>(`/Adventure/${id}/Start`);
  }

  async completeAdventure(id: number): Promise<CompleteAdventureResponse> {
    return ApiClient.patch<CompleteAdventureResponse>(`/Adventure/${id}/Complete`);
  }

  async deleteAdventure(id: number): Promise<DeleteAdventureResponse> {
    return ApiClient.delete<DeleteAdventureResponse>(`/Adventure/${id}`);
  }
}

export default new AdventureService();