import { CompanyContextProvider } from '@/context/company-context';
import AuthSentry from '@/components/auth-sentry';
import Page from '@/components/layout/page';
import CompanyWizard from '../components/company-wizard/company-wizard';

export default function SignatoryRightsPage() {
  return (
    <AuthSentry redirectPath="/company">
      <Page title="Company wizard - signatory rights" withBorder={false}>
        <CompanyWizard wizardType="signatoryRights" />
      </Page>
    </AuthSentry>
  );
}

SignatoryRightsPage.provider = CompanyContextProvider;
