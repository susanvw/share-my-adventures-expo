import { Result, PagedData, ProblemDetails } from './Common';

export interface InvitationView {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  meetUp?: string;
  meetUpLatitude?: number;
  meetUpLongitude?: number;
  destination?: string;
  destinationLatitude?: number;
  destinationLongitude?: number;
  statusLookupNameId: number;
  statusLookupName: string;
  typeLookupId: number;
  typeLookupName: string;
  accessLevelLookupName: string;
  email?: string;
  accessLevelLookupId: number;
}

export interface AcceptInvitationCommand {
  adventureId: number;
  email?: string;
}

export interface RejectInvitationCommand {
  adventureId: number;
  id: number;
}

export type InvitationViewPagedDataResult = Result<PagedData<InvitationView>>;
export type AcceptInvitationResponse = Result<void> | ProblemDetails;
export type RejectInvitationResponse = Result<void> | ProblemDetails;