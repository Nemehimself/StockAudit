export interface RewardType {
  id?: string;
  title: string;
  pointCost: string;
  rewardValue: string;
  activeFrom: string;
  expires: string;
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
}

export interface CustomerNumberType {
  customerNumber: string;
  points: string;
}

export interface CustomerRedeemNumberType {
  customerNumber: string;
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
