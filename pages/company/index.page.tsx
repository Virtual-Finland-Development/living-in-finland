import { useAuth } from '@/context/auth-context';
import Page from '@/components/layout/page';
import Authenticated from './components/authenticated';
import NotAuthenticated from './components/not-authenticated';

export default function CompanyPage() {
  const { isAuthenticated } = useAuth();

  return (
    <Page title="Company">
      {!isAuthenticated ? <NotAuthenticated /> : <Authenticated />}
    </Page>
  );
}
