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
export interface authDataType {
  accessToken: string;
  name?: string;
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
    onSuccess: data => {
      localStorage.setItem('username', data.name ?? '');
    },
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

export const useSSO = () => {
  const create = async (ssoId: string) => {
    const request = api.post(`auth/sso-login/`, { ssoId });
    const response = await request;
    return response['data'] as authDataType;
  };

  const mutation = useMutation({
    mutationFn: create,
    onSuccess: data => {
      localStorage.setItem('username', data.name ?? '');
    },
  });

  return mutation;
};
