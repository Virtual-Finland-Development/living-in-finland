import { useQuery } from '@tanstack/react-query';
import api from '../api';
import useErrorToast from './use-error-toast';

const OPTIONS = {
  refetchOnWindowFocus: false,
  retry: false,
  cacheTime: Infinity,
  staleTime: 300_000,
};

function queryFunction<T>(
  queryKeys: string[],
  apiCall: () => Promise<T>,
  enabled: boolean
) {
  const query = useQuery(queryKeys, apiCall, { ...OPTIONS, enabled });

  useErrorToast({
    title: `Could not fetch codesets: ${queryKeys.join(', ')}`,
    error: query.error,
  });

  return {
    ...query,
    isLoading: query.isLoading && query.fetchStatus !== 'idle',
  };
}

function useCountries(enabled: boolean = true) {
  return queryFunction(
    ['countries'],
    async () => await api.codesets.getCountries(),
    enabled
  );
}

function useCurrencies(enabled: boolean = true) {
  return queryFunction(
    ['currencies'],
    async () => await api.codesets.getCurrencies(),
    enabled
  );
}

function useLanguages(enabled: boolean = true) {
  return queryFunction(
    ['languages'],
    async () => await api.codesets.getLanguages(),
    enabled
  );
}

function useEscoLanguages(enabled: boolean = true) {
  return queryFunction(
    ['esco-languages'],
    async () => await api.codesets.getEscoLanguages(),
    enabled
  );
}

function useLanguageSkillLevels(enabled: boolean = true) {
  return queryFunction(
    ['language-skill-levels'],
    async () => await api.codesets.getLanguageSkillLevels(),
    enabled
  );
}

function useNaceCodes(enabled: boolean = true) {
  return queryFunction(
    ['nace'],
    async () => await api.codesets.getNaceCodes(),
    enabled
  );
}

function useEducationFields(enabled: boolean = true) {
  return queryFunction(
    ['education-fields'],
    async () => await api.codesets.getEducationFields(),
    enabled
  );
}

function useEducationLevels(enabled: boolean = true) {
  return queryFunction(
    ['education-levels'],
    async () => await api.codesets.getEducationLevels(),
    enabled
  );
}

function useWorkPermits(enabled: boolean = true) {
  return queryFunction(
    ['permits'],
    async () => await api.codesets.getWorkPermits(),
    enabled
  );
}

function useRegions(enabled: boolean = true) {
  return queryFunction(
    ['regions'],
    async () => await api.codesets.getRegions(),
    enabled
  );
}

function useMunicipalities(enabled: boolean = true) {
  return queryFunction(
    ['municipalities'],
    async () => await api.codesets.getMunicipalities(),
    enabled
  );
}

function useOccupations(enabled: boolean = true) {
  return queryFunction(
    ['occupations-flat'],
    async () => await api.codesets.getOccupationsFlat(),
    enabled
  );
}

function useEscoSkills(enabled: boolean = true) {
  return queryFunction(
    ['esco-skills'],
    async () => await api.codesets.getEscoSkills(),
    enabled
  );
}

export {
  useCountries,
  useCurrencies,
  useLanguages,
  useEscoLanguages,
  useLanguageSkillLevels,
  useNaceCodes,
  useEducationFields,
  useEducationLevels,
  useWorkPermits,
  useRegions,
  useMunicipalities,
  useOccupations,
  useEscoSkills,
};
