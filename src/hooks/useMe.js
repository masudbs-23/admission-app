import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await api.get('/api/users/me');
      return res.data;
    },
    staleTime: 60 * 1000,
  });
};


