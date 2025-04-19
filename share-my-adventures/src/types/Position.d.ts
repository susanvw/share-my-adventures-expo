import { Result } from "./Common";

 // Position API Types
  export interface CreatePositionCommand {
    latitude: number;
    longitude: number;
    speed?: number;
    heading?: number;
    altitude?: number;
    timeStamp?: string;
    uuid?: string;
    odometer?: number;
    activityType?: string;
    batteryLevel?: number;
    isMoving: boolean;
    userId?: string;
  }
  
  export type CreatePositionResponse = Result<number | null>;
  
  export interface PositionView {
    id: number;
    userId?: string;
    latitude: number;
    longitude: number;
    speed?: number;
    heading?: number;
    altitude?: number;
    timeStamp?: string;
    uuid?: string;
    location?: string;
    odometer?: number;
    activityType?: string;
    batteryLevel?: number;
    isMoving: boolean;
  }
  
  export interface GetLatestPositionsQuery {
    fromDate?: string; // ISO date string
  }
  
  export type GetLatestPositionsResponse = Result<PositionView[]>;