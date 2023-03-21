import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Paragraph } from 'suomifi-ui-components';
import { AuthProvider } from '@/types';
import api from '@/lib/api';
import { LOCAL_STORAGE_REDIRECT_KEY } from '@/lib/constants';
import { generateAppContextHash } from '@/lib/utils';
import { JSONLocalStorage } from '@/lib/utils/JSONStorage';
import { useAuth } from '@/context/auth-context';
import Alert from '@/components/ui/alert';
import Loading from '@/components/ui/loading';

export default function AuthPage() {
  const { logIn, logOut } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();
  const { provider, loginCode, event, success, message } = router.query;

  const handleAuth = useCallback(async () => {
    try {
      const loggedInState = await api.auth.logIn({
        loginCode: loginCode as string,
        appContext: generateAppContextHash(),
      });

      logIn(loggedInState);
      const redirectPath = JSONLocalStorage.get(LOCAL_STORAGE_REDIRECT_KEY);
      router.push(redirectPath || '/');
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setAuthError(error ? (error as string) : 'Logging out failed.');
    }
  }, [logIn, loginCode, router]);

  const routerActions = useCallback(() => {
    setLoading(true);

    // False positives
    if (!provider || !(event === 'login' || event === 'logout')) {
      setLoading(false);
      return;
    }

    // Failures
    if (success !== 'true') {
      setLoading(false);
      setAuthError(message ? (message as string) : `${event} failed.`);
      return;
    }

    // Successes
    if (event === 'login') {
      if (provider === AuthProvider.TESTBED) {
        handleAuth();
      } else {
        router.push('/');
      }
    } else {
      logOut();
      router.push('/');
    }
  }, [provider, event, success, message, handleAuth, router, logOut]);

  useEffect(() => {
    if (router.isReady) {
      routerActions();
    }
  }, [router.isReady, router.query, routerActions]);

  if (isLoading) {
    return <Loading />;
  }

  if (authError) {
    return (
      <Alert status="error" labelText="Error error!">
        <div className="w-96">
          <Paragraph>{authError}</Paragraph>
        </div>
      </Alert>
    );
  }

  return null;
}
