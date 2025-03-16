import ApiClient from './ApiClient';
import {
  InvitationViewPagedDataResult,
  AcceptInvitationCommand,
  AcceptInvitationResponse,
  RejectInvitationCommand,
  RejectInvitationResponse,
} from '../types/AdventureInvitation';

class AdventureInvitationService {
  async getInvitations(pageNumber?: number, pageSize?: number): Promise<InvitationViewPagedDataResult> {
    return ApiClient.get<InvitationViewPagedDataResult>('/AdventureInvitation', {
      params: { PageNumber: pageNumber, PageSize: pageSize },
    });
  }

  async acceptInvitation(adventureId: number, command: AcceptInvitationCommand): Promise<AcceptInvitationResponse> {
    return ApiClient.patch<AcceptInvitationResponse>(`/AdventureInvitation/${adventureId}/Accept`, command);
  }

  async rejectInvitation(id: number, command: RejectInvitationCommand): Promise<RejectInvitationResponse> {
    return ApiClient.patch<RejectInvitationResponse>(`/AdventureInvitation/${id}/Reject`, command);
  }
}

export default new AdventureInvitationService();