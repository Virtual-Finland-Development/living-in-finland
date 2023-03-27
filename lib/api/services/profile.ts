import { JobApplicationProfile, PersonBasicInformation } from '@/types';
import apiClient from '../api-client';
import { USERS_API_BASE_URL } from '../endpoints';

export async function getPersonBasicInfo(): Promise<PersonBasicInformation> {
  const { data } = await apiClient.post(
    `${USERS_API_BASE_URL}/productizer/draft/Person/BasicInformation`
  );
  return data;
}

export async function savePersonBasicInfo(
  payload: PersonBasicInformation
): Promise<PersonBasicInformation> {
  const { data } = await apiClient.post(
    `${USERS_API_BASE_URL}/productizer/draft/Person/BasicInformation/Write`,
    payload
  );
  return data;
}

export async function getJobApplicationProfile(): Promise<JobApplicationProfile> {
  const { data } = await apiClient.post(
    `${USERS_API_BASE_URL}/productizer/draft/Person/JobApplicationProfile`
  );
  return data;
}

export async function saveJobApplicationProfile(
  payload: JobApplicationProfile
): Promise<JobApplicationProfile> {
  const { data } = await apiClient.post(
    `${USERS_API_BASE_URL}/productizer/draft/Person/JobApplicationProfile/Write`,
    payload
  );
  return data;
}
