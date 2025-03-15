import { Result } from './Common';

export interface PositionView {
  id: number;
  userId: string;
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

export type PositionViewIReadOnlyListResult = Result<PositionView[]>;
export type CreatePositionResponse = Result<number | null>;