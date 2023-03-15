import { useRouter } from 'next/router';
import { CompanyContextProvider } from '@/context/company-context';
import { useCompanyContext } from '@/context/company-context';
import AuthSentry from '@/components/auth-sentry';
import Page from '@/components/layout/page';
import Loading from '@/components/ui/loading';
import CompanyWizard from '../../components/company-wizard/company-wizard';

export default function BeneficialOwnersPage() {
  const router = useRouter();
  const { nationalIdentifier } = router.query;
  const { contextIsLoading } = useCompanyContext();
  if (!nationalIdentifier) return null;

  return (
    <AuthSentry redirectPath="/company">
      <Page title="Company edit - beneficial owners" withBorder={false}>
        {contextIsLoading ? (
          <Loading />
        ) : (
          <CompanyWizard wizardType="beneficialOwners" />
        )}
      </Page>
    </AuthSentry>
  );
}

BeneficialOwnersPage.provider = CompanyContextProvider;
