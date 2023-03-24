import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import api from '../api';
import useErrorToast from './use-error-toast';

const PROFILE_QUERY_KEYS = ['profile'];

/**
 * Get user profile.
 */
function useProfile() {
  const query = useQuery(
    PROFILE_QUERY_KEYS,
    async () => await api.profile.getProfile(),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  useErrorToast({
    title: 'Could not fetch user profile',
    error:
      query.error && (query.error as AxiosError).response?.status !== 404
        ? query.error
        : undefined,
  });

  return query;
}

export { useProfile };
