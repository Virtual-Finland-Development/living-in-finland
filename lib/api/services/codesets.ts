import type {
  Country,
  Currency,
  EducationLevel,
  Language,
  Municipality,
  Nace,
  Region,
  WorkPermit,
} from '@/types';
import apiClient from '../api-client';
import { CODESETS_BASE_URL } from '../endpoints';

export async function getCountries(): Promise<Country[]> {
  const { data } = await apiClient.get(
    `${CODESETS_BASE_URL}/resources/ISO3166CountriesURL?filters=testbed`
  );
  return data;
}

export async function getCurrencies(): Promise<Currency[]> {
  const { data } = await apiClient.get(
    `${CODESETS_BASE_URL}/resources/ISO4217Currencies?filters=nsg`
  );
  return data;
}

export async function getLanguages(): Promise<Language[]> {
  const { data } = await apiClient.get(
    `${CODESETS_BASE_URL}/resources/ISO639Languages`
  );
  return data;
}

export async function getNaceCodes(): Promise<Nace[]> {
  const { data } = await apiClient.get(
    `${CODESETS_BASE_URL}/resources/SuomiFiKoodistotNace`
  );
  return data;
}

export async function getEducationLevels(): Promise<EducationLevel[]> {
  const { data } = await apiClient.get(
    `${CODESETS_BASE_URL}/resources/LevelsOfEducation`
  );
  return data;
}

export async function getWorkPermits(): Promise<WorkPermit[]> {
  const { data } = await apiClient.get(
    `${CODESETS_BASE_URL}/resources/WorkPermits`
  );
  return data;
}

export async function getRegions(): Promise<Region[]> {
  const { data } = await apiClient.get(
    `${CODESETS_BASE_URL}/resources/Regions`
  );
  return data;
}

export async function getMunicipalities(): Promise<Municipality[]> {
  const { data } = await apiClient.get(
    `${CODESETS_BASE_URL}/resources/Municipalities`
  );
  return data;
}
