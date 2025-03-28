import api, { setBearerToken } from '@/services/api';
import { getCookieValue } from '@/services/getCookieValue';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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
