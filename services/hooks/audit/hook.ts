import api, { setBearerToken } from '@/services/api';
import { getCookieValue } from '@/services/getCookieValue';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export interface SpareCapacity {
  yearlyMaxCapacity: number;
  'Average Cover Value': number;
  yearlySpareCapacity: number;
  currentYearlyTurnOver: number;
  'Maximum No. Of Sittings Per Day': number;
  'Total weeks open per year(max 52)': number;
  'Total No of seats in the restaurant': number;
  'Total No of Days open per week (max 7)': number;
  'How many hours do you open in a day? (max 24)': number;
  'Number of Customers Served Per Hour (Average)?': number;
}
export interface AuditType {
  created_at: string;
  audit: {
    type: string;
    spareCapacity: SpareCapacity;
  };
}

export const useCreateAudit = () => {
  const router = useRouter();
  const create = async (audit: { audit: Record<string, number | string> }) => {
    const token = getCookieValue('token');
    if (!token) {
      router.push('/stockaudit');
      return;
    }
    setBearerToken(token);
    const request = api.post(`audit/`, audit);
    const response = await request;
    return response['data'];
  };

  const mutation = useMutation({
    mutationFn: create,
  });

  return mutation;
};

export const useGetAudits = () => {
  const router = useRouter();
  const fetch = async (): Promise<AuditType[] | undefined> => {
    const token = getCookieValue('token');
    if (!token) {
      router.push('/stockaudit');
      return;
    }
    setBearerToken(token);
    const request = api.get(`audit/find-all`);
    const response = await request;
    return response['data'];
  };

  const query = useQuery({
    queryFn: fetch,
    queryKey: ['all-audits'],
    staleTime: 1000,
    refetchOnMount: true,
  });

  return query;
};
