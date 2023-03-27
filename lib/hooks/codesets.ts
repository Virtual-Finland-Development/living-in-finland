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

export { useCountries, useCurrencies, useLanguages, useNaceCodes };
