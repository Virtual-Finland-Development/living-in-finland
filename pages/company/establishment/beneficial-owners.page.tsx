import { CompanyContextProvider } from '@/context/company-context';
import AuthSentry from '@/components/auth-sentry';
import Page from '@/components/layout/page';
import CompanyWizard from '../components/company-wizard/company-wizard';

export default function BeneficialOwnersPage() {
  return (
    <AuthSentry redirectPath="/company">
      <Page title="Company wizard - beneficial owners" withBorder={false}>
        <CompanyWizard wizardType="beneficialOwners" />
      </Page>
    </AuthSentry>
  );
}

BeneficialOwnersPage.provider = CompanyContextProvider;
