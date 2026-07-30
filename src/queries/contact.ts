import { useQuery } from '@tanstack/react-query';
import { getContact } from '@/api/contact';
import { queryKeys } from '@/queries/queryKeys';

export function useContactQuery() {
  return useQuery({
    queryKey: queryKeys.contact(),
    queryFn: getContact,
    staleTime: 5 * 60_000,
  });
}
