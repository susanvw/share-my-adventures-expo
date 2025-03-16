import { Result, PagedData } from './Common';

export interface ParticipantView {
  id: string;
  userName: string;
  displayName: string;
  photo?: string;
  followMe: boolean;
  trailColor?: string;
}

export interface ParticipantAccessView {
  id: string;
  userName: string;
  displayName: string;
  photo?: string;
  accessLevelLookupId: number;
  accessLevelLookupName: string;
}

export interface InviteParticipantCommand {
  adventureId: number;
  userId?: string;
  accessLevelLookupId: number;
}

export interface InviteParticipantResponse {
  id?: number;
}

export type ParticipantViewResult = Result<ParticipantView>;
export type ParticipantViewPagedDataResult = Result<PagedData<ParticipantView>>;
export type InviteParticipantResponseResult = Result<InviteParticipantResponse>;