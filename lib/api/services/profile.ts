import { ProfileBasicInformation } from '@/types';
import apiClient from '../api-client';
import { USERS_API_BASE_URL } from '../endpoints';

export async function getProfile(): Promise<ProfileBasicInformation> {
  const { data } = await apiClient.post(
    `${USERS_API_BASE_URL}/productizer/draft/Person/BasicInformation`
  );
  return data;
}

export async function saveProfile(
  payload: ProfileBasicInformation
): Promise<ProfileBasicInformation> {
  const { data } = await apiClient.post(
    `${USERS_API_BASE_URL}/productizer/draft/Person/BasicInformation/Write`,
    payload
  );
  return data;
}
