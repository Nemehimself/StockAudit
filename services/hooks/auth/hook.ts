import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';

export enum SignupSource {
  MCOM = 'mcom',
  STOCK_AUDIT = 'stock_audit',
}

interface authType {
  email: string;
  password: string;
}

interface signupType {
  fullName: string;
  email: string;
  phoneNumber: string;
  location?: string;
  referralCode?: string;
  signupSource: SignupSource;
  password: string;
  password2: string;
}

interface signupCustomerType {
  fullName: string;
  email: string;
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

export const useAuth = () => {
  const create = async ({ email, password }: authType) => {
    const request = api.post(`auth/`, { email, password });
    const response = await request;
    return response['data'] as authDataType;
  };

  const mutation = useMutation({
    mutationFn: ({ email, password }: authType) => create({ email, password }),
  });

  return mutation;
};

export const useSignup = () => {
  const create = async (user: signupType) => {
    const request = api.post(`user/`, { ...user });
    const response = await request;
    return response['data'];
  };

  const mutation = useMutation({
    mutationFn: (user: signupType) => create({ ...user }),
  });

  return mutation;
};

export const useAuthCustomer = () => {
  const create = async ({ email, password, campaignId }: authCustomerType) => {
    const request = api.post(`auth/customer`, { email, password, campaignId });
    const response = await request;
    return response['data'] as authDataType;
  };

  const mutation = useMutation({
    mutationFn: ({ email, password, campaignId }: authCustomerType) =>
      create({ email, password, campaignId }),
  });

  return mutation;
};

export const useAuthStaff = () => {
  const create = async ({ email, password }: authType) => {
    const request = api.post(`auth/staff`, { email, password });
    const response = await request;
    return response['data'] as authDataType;
  };

  const mutation = useMutation({
    mutationFn: ({ email, password }: authType) => create({ email, password }),
  });

  return mutation;
};

export const useSignupCustomer = () => {
  const create = async (customer: signupCustomerType) => {
    const campaignId = localStorage.getItem('campaignId');
    const request = api.post(`customer/`, { ...customer, campaignId });
    const response = await request;
    return response['data'];
  };

  const mutation = useMutation({
    mutationFn: (customer: signupCustomerType) => create({ ...customer }),
  });

  return mutation;
};
