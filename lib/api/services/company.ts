import jwt_decode from 'jwt-decode';
import type {
  BenecifialOwners,
  NonListedCompany,
  SignatoryRights,
} from '@/types';
import { LOCAL_STORAGE_AUTH_KEY } from '@/lib/constants';
import { JSONLocalStorage } from '@/lib/utils/JSONStorage';
import apiClient from '../api-client';
import { PRH_MOCK_BASE_URL, TESTBED_API_BASE_URL } from '../endpoints';

interface CompanyResponse {
  nationalIdentifier: string;
  data: NonListedCompany;
}

function getUserIdentifier() {
  const token = JSONLocalStorage?.get(LOCAL_STORAGE_AUTH_KEY).idToken;

  if (!token) {
    throw new Error('No token.');
  }

  const { sub }: { sub: string | undefined } = jwt_decode(token);
  return sub;
}

export async function getCompanies(): Promise<CompanyResponse[]> {
  try {
    const userId = getUserIdentifier();
    const { data } = await apiClient.get(
      `${PRH_MOCK_BASE_URL}/users/${userId}/companies`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLatestModifiedCompany(): Promise<CompanyResponse> {
  try {
    const userId = getUserIdentifier();
    const { data } = await apiClient.get(
      `${PRH_MOCK_BASE_URL}/users/${userId}/companies:last-modified`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCompany(
  nationalIdentifier: string
): Promise<NonListedCompany> {
  const { data } = await apiClient.post(
    `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/Establishment`,
    { nationalIdentifier },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return data;
}

export async function createCompanyDirectlyToPRH(
  company: NonListedCompany
): Promise<string> {
  try {
    const userId = getUserIdentifier();
    const { data } = await apiClient.post(
      `${PRH_MOCK_BASE_URL}/users/${userId}/companies`,
      company
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function saveCompanyDirectlyToPRH(
  nationalIdentifier: string,
  payload: Partial<NonListedCompany>
) {
  try {
    const userId = getUserIdentifier();
    const { data } = await apiClient.patch(
      `${PRH_MOCK_BASE_URL}/users/${userId}/companies/${nationalIdentifier}`,
      payload
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function saveCompany(
  payload: Partial<NonListedCompany>
): Promise<NonListedCompany> {
  const { data } = await apiClient.post(
    `${TESTBED_API_BASE_URL}/testbed/productizer/non-listed-company/establishment`,
    payload
  );
  return data;
}

export async function getBeneficialOwners(
  nationalIdentifier: string
): Promise<BenecifialOwners> {
  const { data } = await apiClient.post(
    `${TESTBED_API_BASE_URL}/testbed/productizer/non-listed-company/beneficial-owners`,
    { nationalIdentifier },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return data;
}

export async function saveBeneficialOwners(
  nationalIdentifier: string,
  beneficialOwners: Partial<BenecifialOwners>
): Promise<BenecifialOwners> {
  const { data } = await apiClient.post(
    `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/BeneficialOwners/Write`,
    { nationalIdentifier, data: beneficialOwners }
  );
  return data;
}

export async function getSignatoryRights(
  nationalIdentifier: string
): Promise<SignatoryRights> {
  const { data } = await apiClient.post(
    `${TESTBED_API_BASE_URL}/testbed/productizer/non-listed-company/signatory-rights`,
    { nationalIdentifier },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return data;
}

export async function saveSignatoryRights(
  nationalIdentifier: string,
  signatoryRights: Partial<SignatoryRights>
): Promise<SignatoryRights> {
  const { data } = await apiClient.post(
    `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights/Write`,
    { nationalIdentifier, data: signatoryRights }
  );
  return data;
}
