import ApiClient from './ApiClient';
import {
  ParticipantViewResult,
  ParticipantViewPagedDataResult,
  InviteParticipantCommand,
  InviteParticipantResponseResult,
} from '../types/Participant';

class ParticipantService {
  async getParticipant(id: string): Promise<ParticipantViewResult> {
    return ApiClient.get<ParticipantViewResult>(`/Participant/${id}`);
  }

  async getParticipants(adventureId?: number, filter?: string, pageNumber?: number, pageSize?: number): Promise<ParticipantViewPagedDataResult> {
    return ApiClient.get<ParticipantViewPagedDataResult>('/Participant', {
      params: { AdventureId: adventureId, Filter: filter, PageNumber: pageNumber, PageSize: pageSize },
    });
  }

  async inviteParticipant(command: InviteParticipantCommand): Promise<InviteParticipantResponseResult> {
    return ApiClient.post<InviteParticipantResponseResult>('/Participant', command);
  }
}

export default new ParticipantService();