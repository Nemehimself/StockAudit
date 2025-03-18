export enum SignupSource {
  MCOM = 'mcom',
  STOCK_AUDIT = 'stock_audit',
}

export interface authType {
  email: string;
  password: string;
}

export interface signupType {
  fullName: string;
  email: string;
  phoneNumber: string;
  location?: string;
  referralCode?: string;
  signupSource: SignupSource;
  password: string;
  password2: string;
}

export interface authDataType {
  accessToken: string;
}

export interface authCustomerType extends authType {
  campaignId: string;
}

export interface errorType {
  response: { data: { status: number; error: string } };
}
