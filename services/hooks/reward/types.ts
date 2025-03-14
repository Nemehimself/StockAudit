export interface RewardType {
  id?: string;
  title: string;
  pointCost: string;
  rewardValue: string;
  activeFrom: string | Date;
  expires: string | Date;
  description: string;
  currency: string;
}

export interface expiresOptions {
  expires: 'day' | 'hour' | 'week' | 'month';
}
export interface GenerateCodeType {
  points: number;
  expires: string;
  code?: string;
  expiry?: string;
  type?: string;
  campaignId: string;
}

export interface GenerateRewardCodeType {
  rewardId: string;
  expires: string;
  code?: string;
  expiry?: string;
  type?: string;
  campaignId: string;
}

export interface ValidateCodeType {
  code: string;
  campaignId: string;
  type: '1' | '2';
}

export enum RewardMethod {
  'QR',
  'CustomerNumber',
}

export interface CustomerNumberType {
  customerNumber: string;
  points: string;
  type: RewardMethod;
}

export interface CustomerRedeemNumberType {
  customerNumber: string;
  type: RewardMethod;
}

export interface CustomerPointType {
  points: string;
  description: string;
}

export interface PointHistoryType {
  points: number;
  created_at: string;
  description: string;
}

export interface RewardHistoryType {
  points: number;
  created_at: string;
  description: string;
  reward: RewardType;
}
