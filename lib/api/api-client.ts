import axios from 'axios';
import Cookies from 'js-cookie';
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
  `${TESTBED_API_BASE_URL}/testbed/productizer/nsg/basic-information?source=fi`,
  `${TESTBED_API_BASE_URL}/testbed/productizer/nsg/basic-information?source=se`,
  `${TESTBED_API_BASE_URL}/testbed/productizer/nsg/basic-information?source=no`,
];

apiClient.interceptors.request.use(config => {
  if (config.url !== undefined && config.headers !== undefined) {
    if (DATA_URLS.includes(config.url)) {
      const idToken = Cookies.get('idToken');
      config.headers.Authorization = idToken ? `Bearer ${idToken}` : '';
    }
  }

  return config;
});

export default apiClient;
