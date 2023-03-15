import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import type {
  BenecifialOwners,
  NonListedCompany,
  SignatoryRights,
} from '@/types';
import apiClient from '../api-client';
import { PRH_MOCK_BASE_URL } from '../endpoints';

interface CompanyResponse {
  businessId: string;
  data: NonListedCompany;
}

export async function getCompanies(): Promise<CompanyResponse[]> {
  const token = Cookies.get('idToken');

  if (!token) {
    throw new Error('No token.');
  }

  try {
    const { sub }: { sub: string | undefined } = jwt_decode(token);
    const { data } = await apiClient.get(
      `${PRH_MOCK_BASE_URL}/users/${sub}/companies`
    );
    return data;
  } catch (error) {
    throw new Error('Invalid token.');
  }
}

export async function getLatestModifiedCompany(): Promise<CompanyResponse> {
  const token = Cookies.get('idToken');

  if (!token) {
    throw new Error('No token.');
  }

  try {
    const { sub }: { sub: string | undefined } = jwt_decode(token);
    const { data } = await apiClient.get(
      `${PRH_MOCK_BASE_URL}/users/${sub}/companies:last-modified`
    );
    return data;
  } catch (error) {
    throw new Error('Invalid token.');
  }
}

export async function getCompany(
  businessId: string
): Promise<NonListedCompany> {
  const { data } = await apiClient.post(
    `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/Establishment`,
    businessId,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return data;
}

export async function createCompanyDirectlyToPRH(
  company: NonListedCompany
): Promise<string> {
  const token = Cookies.get('idToken');

  if (!token) {
    throw new Error('No token.');
  }

  try {
    const { sub }: { sub: string | undefined } = jwt_decode(token);
    const { data } = await apiClient.post(
      `${PRH_MOCK_BASE_URL}/users/${sub}/companies`,
      company
    );
    return data;
  } catch (error) {
    throw new Error('Invalid token.');
  }
}

export async function saveCompanyDirectlyToPRH(
  businessId: string,
  payload: Partial<NonListedCompany>
) {
  const token = Cookies.get('idToken');

  if (!token) {
    throw new Error('No token.');
  }

  try {
    const { sub }: { sub: string | undefined } = jwt_decode(token);
    const { data } = await apiClient.patch(
      `${PRH_MOCK_BASE_URL}/users/${sub}/companies/${businessId}`,
      payload
    );
    return data;
  } catch (error) {
    throw new Error('Invalid token.');
  }
}

export async function saveCompany(
  payload: Partial<NonListedCompany>
): Promise<NonListedCompany> {
  const { data } = await apiClient.post(
    `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/Establishment/Write`,
    payload
  );
  return data;
}

export async function getBeneficialOwners(
  businessId: string
): Promise<BenecifialOwners> {
  const { data } = await apiClient.post(
    `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/BeneficialOwners`,
    businessId,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return data;
}

export async function saveBeneficialOwners(
  businessId: string,
  beneficialOwners: Partial<BenecifialOwners>
): Promise<BenecifialOwners> {
  const { data } = await apiClient.post(
    `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/BeneficialOwners/Write`,
    { businessId, data: beneficialOwners }
  );
  return data;
}

export async function getSignatoryRights(
  businessId: string
): Promise<SignatoryRights> {
  const { data } = await apiClient.post(
    `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights`,
    businessId,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return data;
}

export async function saveSignatoryRights(
  businessId: string,
  signatoryRights: Partial<SignatoryRights>
): Promise<SignatoryRights> {
  const { data } = await apiClient.post(
    `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights/Write`,
    { businessId, data: signatoryRights }
  );
  return data;
}
