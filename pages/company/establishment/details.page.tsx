import { CompanyContextProvider } from '@/context/company-context';
import AuthSentry from '@/components/auth-sentry';
import Page from '@/components/layout/page';
import CompanyWizard from '../components/company-wizard/company-wizard';

export default function DetailsPage() {
  return (
    <AuthSentry redirectPath="/company">
      <Page title="Company wizard - details" withBorder={false}>
        <CompanyWizard wizardType="company" />
      </Page>
    </AuthSentry>
  );
}

DetailsPage.provider = CompanyContextProvider;
