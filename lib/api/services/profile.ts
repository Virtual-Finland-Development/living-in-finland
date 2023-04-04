import { JobApplicantProfile, PersonBasicInformation } from '@/types';
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

export async function getJobApplicantProfile(): Promise<JobApplicantProfile> {
  const { data } = await apiClient.post(
    `${USERS_API_BASE_URL}/productizer/draft/Person/JobApplicantProfile`
  );
  return data;
}

export async function saveJobApplicantProfile(
  payload: JobApplicantProfile
): Promise<JobApplicantProfile> {
  const { data } = await apiClient.post(
    `${USERS_API_BASE_URL}/productizer/draft/Person/JobApplicantProfile/Write`,
    payload
  );
  return data;
}