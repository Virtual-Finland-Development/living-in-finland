import { useState } from 'react';
import { Button, InlineAlert, Text, TextInput } from 'suomifi-ui-components';
import api from '@/lib/api';
import {
  ReferrerProvider,
  useReferrerContext,
} from '@/context/referrer-context';
import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';

export default function ProfilePage() {
  const [isLoading, setLoading] = useState(false);
  const { referrerSettings } = useReferrerContext();

  const loginHandler = () => {
    setLoading(true);
    api.auth.directToAuthGwLogin('/profile');
  };

  return (
    <Page title="Profile">
      <Page.Block className="bg-white">
        <CustomHeading variant="h2" suomiFiBlue="dark">
          Create your profile
        </CustomHeading>
        <div className="flex flex-col mt-8 gap-6">
          {referrerSettings && (
            <InlineAlert>
              <div className="flex flex-col gap-3 items-start">
                <Text>{referrerSettings.text}</Text>
                <a
                  href={referrerSettings.redirectUrl}
                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                >
                  {referrerSettings.redirectText}
                </a>
              </div>
            </InlineAlert>
          )}
          <Text>
            Choose which service to use to log in to Living in Finland.
          </Text>
          <div>
            <Button onClick={loginHandler} disabled={isLoading}>
              {isLoading ? 'Redirecting...' : 'Login with testbed'}
            </Button>
          </div>
        </div>
      </Page.Block>
      <Page.Block className="bg-suomifi-blue-bg-light">
        <CustomHeading variant="h2" suomiFiBlue="dark">
          Or register with email address
        </CustomHeading>
        <form className="flex flex-col items-start mt-8 gap-6">
          <TextInput labelText="First name" />
          <TextInput labelText="Last name" />
          <TextInput labelText="Email address" type="email" />
          <Button>Create profile</Button>
        </form>
      </Page.Block>
    </Page>
  );
}

ProfilePage.provider = ReferrerProvider;
