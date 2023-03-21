import axios from 'axios';
import { isPast, parseISO } from 'date-fns';
import { LOCAL_STORAGE_AUTH_KEY, REQUEST_NOT_AUTHORIZED } from '../constants';
import { JSONLocalStorage } from '../utils/JSONStorage';
import { PRH_MOCK_BASE_URL, TESTBED_API_BASE_URL } from './endpoints';

const apiClient = axios.create({});

const DATA_URLS = [
  `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/Establishment`,
  `${TESTBED_API_BASE_URL}/testbed/productizer/non-listed-company/establishment`,
  `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/Establishment/Write`,
  `${TESTBED_API_BASE_URL}/testbed/productizer/non-listed-company/beneficial-owners`,
  `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/BeneficialOwners/Write`,
  `${TESTBED_API_BASE_URL}/testbed/productizer/non-listed-company/signatory-rights`,
  `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights/Write`,
];

apiClient.interceptors.request.use(config => {
  if (config.url !== undefined && config.headers !== undefined) {
    if (DATA_URLS.includes(config.url)) {
      const idToken = JSONLocalStorage.get(LOCAL_STORAGE_AUTH_KEY).idToken;
      config.headers.Authorization = idToken ? `Bearer ${idToken}` : '';
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    const storedAuthState = JSONLocalStorage.get(LOCAL_STORAGE_AUTH_KEY);
    const hasExpired = storedAuthState?.expiresAt
      ? isPast(parseISO(storedAuthState.expiresAt))
      : false;

    if (
      error.config?.url &&
      DATA_URLS.includes(error.config.url) &&
      hasExpired
    ) {
      window.postMessage(REQUEST_NOT_AUTHORIZED);
      return new Promise(() => {});
    }

    return Promise.reject(error);
  }
);

export default apiClient;
