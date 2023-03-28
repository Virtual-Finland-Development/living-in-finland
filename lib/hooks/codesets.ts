import { useQuery } from '@tanstack/react-query';
import api from '../api';
import useErrorToast from './use-error-toast';

const OPTIONS = {
  refetchOnWindowFocus: false,
  cacheTime: Infinity,
  staleTime: 30_000,
};

function useCountries() {
  const query = useQuery(
    ['countries'],
    async () => await api.codesets.getCountries(),
    OPTIONS
  );

  useErrorToast({
    title: 'Could not fetch codesets: countries',
    error: query.error,
  });

  return query;
}

function useCurrencies() {
  const query = useQuery(
    ['currencies'],
    async () => await api.codesets.getCurrencies(),
    OPTIONS
  );

  useErrorToast({
    title: 'Could not fetch codesets: currencies',
    error: query.error,
  });

  return query;
}

function useLanguages() {
  const query = useQuery(
    ['languages'],
    async () => await api.codesets.getLanguages(),
    OPTIONS
  );

  useErrorToast({
    title: 'Could not fetch codesets: languages',
    error: query.error,
  });

  return query;
}

function useNaceCodes() {
  const query = useQuery(
    ['nace'],
    async () => await api.codesets.getNaceCodes(),
    OPTIONS
  );

  useErrorToast({
    title: 'Could not fetch codesets: nace codes',
    error: query.error,
  });

  return query;
}

function useEducationLevels() {
  const query = useQuery(
    ['education-levels'],
    async () => await api.codesets.getEducationLevels(),
    OPTIONS
  );

  useErrorToast({
    title: 'Could not fetch codesets: education levels',
    error: query.error,
  });

  return query;
}

function useWorkPermits() {
  const query = useQuery(
    ['permits'],
    async () => await api.codesets.getWorkPermits(),
    OPTIONS
  );

  useErrorToast({
    title: 'Could not fetch codesets: work permits',
    error: query.error,
  });

  return query;
}

function useRegions() {
  const query = useQuery(
    ['regions'],
    async () => await api.codesets.getRegions(),
    OPTIONS
  );

  useErrorToast({
    title: 'Could not fetch codesets: regions',
    error: query.error,
  });

  return query;
}

function useMunicipalities() {
  const query = useQuery(
    ['municipalities'],
    async () => await api.codesets.getMunicipalities(),
    OPTIONS
  );

  useErrorToast({
    title: 'Could not fetch codesets: municipalities',
    error: query.error,
  });

  return query;
}

export {
  useCountries,
  useCurrencies,
  useLanguages,
  useNaceCodes,
  useEducationLevels,
  useWorkPermits,
  useRegions,
  useMunicipalities,
};
