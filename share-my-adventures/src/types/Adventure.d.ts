import { PagedData, ProblemDetails, Result } from './Common';

// Adventure API Types
export interface CreateAdventureCommand {
  name?: string;
  typeLookupId: number;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  meetupLocationId?: number;
  destinationLocationId?: number;
}

export type CreateAdventureResponse = Result<number | null>;

export interface AdventureView {
  id: number;
  name?: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  meetUp?: string;
  meetUpLatitude?: number;
  meetUpLongitude?: number;
  finalDestination?: string;
  finalDestinationLatitude?: number;
  finalDestinationLongitude?: number;
  statusLookupId: number;
  statusLookupName?: string;
  typeLookupId: number;
  typeLookupName?: string;
  participants?: ParticipantAccessView[];
}

export interface ParticipantAccessView {
  id?: string;
  userName?: string;
  displayName?: string;
  photo?: string;
  accessLevelLookupId: number;
  accessLevelLookupName?: string;
}

export interface GetAdventuresQuery {
  PageNumber?: number;
  PageSize?: number;
  StatusLookupId?: number;
}

export type GetAdventuresResponse = Result<PagedData<AdventureView>>;

export type StartAdventureResponse = void | ProblemDetails; // 204 No Content

export type CompleteAdventureResponse = void | ProblemDetails; // 204 No Content

export interface UpdateAdventureCommand {
  id: number;
  name?: string;
  typeLookupId: number;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  meetupLocationId?: number;
  destinationLocationId?: number;
}

export type UpdateAdventureResponse = void; // 204 No Content

export type DeleteAdventureResponse = void; // 204 No Content

export type GetAdventureResponse = Result<AdventureView>;

// AdventureInvitation API Types
export interface InvitationView {
  id: number;
  name?: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  meetUp?: string;
  meetUpLatitude?: number;
  meetUpLongitude?: number;
  destination?: string;
  destinationLatitude?: number;
  destinationLongitude?: number;
  statusLookupNameId: number;
  statusLookupName?: string;
  typeLookupId: number;
  typeLookupName?: string;
  accessLevelLookupName?: string;
  email?: string;
  accessLevelLookupId: number;
}

export interface GetInvitationsQuery {
  PageNumber?: number;
  PageSize?: number;
}

export type GetInvitationsResponse = Result<PagedData<InvitationView>>;

export interface AcceptInvitationCommand {
  adventureId: number;
  email?: string;
}

export type AcceptInvitationResponse = void; // 204 No Content

export interface RejectInvitationCommand {
  adventureId: number;
  id: number;
}

export type RejectInvitationResponse = void; // 204 No Content
