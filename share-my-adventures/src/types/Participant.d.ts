import { PagedData, Result } from "./Common";

// Participant API Types
  export interface ParticipantView {
    id?: string;
    userName?: string;
    displayName?: string;
    photo?: string;
    followMe: boolean;
    trailColor?: string;
  }
  
  export type GetParticipantResponse = Result<ParticipantView>;
  
  export interface GetParticipantsQuery {
    AdventureId?: number;
    Filter?: string;
    PageNumber?: number;
    PageSize?: number;
  }
  
  export type GetParticipantsResponse = Result<PagedData<ParticipantView>>;
  
  export interface InviteParticipantCommand {
    adventureId: number;
    userId?: string;
    accessLevelLookupId: number;
  }
  
  export interface InviteParticipantResponse {
    id?: number;
  }
  
  export type InviteParticipantResult = Result<InviteParticipantResponse>;