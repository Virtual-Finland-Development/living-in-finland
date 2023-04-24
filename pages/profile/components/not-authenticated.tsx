import { useState } from 'react';
import { Button, Checkbox, Text } from 'suomifi-ui-components';
import api from '@/lib/api';
import { LOCAL_STORAGE_PRIVACY_STATEMENT_PERMISSION } from '@/lib/constants';
import { JSONLocalStorage } from '@/lib/utils/JSONStorage';
import { useModal } from '@/context/modal-context';
import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';
import PrivacyStatement from './privacy-statement';

export default function ProfileNotAuthenticated() {
  const [isLoading, setLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(
    JSONLocalStorage.get(LOCAL_STORAGE_PRIVACY_STATEMENT_PERMISSION) === 'true'
  );
  const { openModal, closeModal } = useModal();

  const loginHandler = () => {
    JSONLocalStorage.set(LOCAL_STORAGE_PRIVACY_STATEMENT_PERMISSION, 'true');
    setLoading(true);
    api.auth.directToAuthGwLogin('/profile');
  };

  const openPrivacyStatement = () =>
    openModal({
      title: 'Privacy statement for Virtual Finland services',
      titleVariant: 'h2',
      content: <PrivacyStatement />,
      onClose: closeModal,
      closeOnEsc: false,
      footerContent: modalBottomReached => (
        <div className="flex flex-row gap-3">
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button
            onClick={() => {
              setPermissionGranted(true);
              closeModal();
            }}
            disabled={!modalBottomReached && !permissionGranted}
          >
            I accept
          </Button>
        </div>
      ),
    });

  const onPermissionCheckboxClick = () => {
    if (!permissionGranted) {
      openPrivacyStatement();
    } else {
      setPermissionGranted(!permissionGranted);
      if (permissionGranted) {
        JSONLocalStorage.set(LOCAL_STORAGE_PRIVACY_STATEMENT_PERMISSION, false);
      }
    }
  };

  return (
    <Page.Block className="bg-white">
      <CustomHeading variant="h2" suomiFiBlue="dark">
        Create your profile
      </CustomHeading>
      <div className="flex flex-col mt-8 gap-6 p-4 bg-suomifi-blue-bg-light">
        <CustomHeading variant="h4">About your personal account</CustomHeading>
        <Text>
          We will create your digital profile. Any data we will ask is not for
          us - it is for you. Granting permission for this account will help you
          to provide information only once and use it afterwords whenever
          needed.
        </Text>
        <a
          role="button"
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          onClick={openPrivacyStatement}
        >
          Privacy statement for Virtual Finland services
        </a>
        <Checkbox
          hintText="I have read and accpeted the Privacy statement for Virtual Finland services"
          checked={permissionGranted}
          onClick={onPermissionCheckboxClick}
        >
          Grant permission
        </Checkbox>
      </div>
      <div className="flex flex-col items-start gap-4 mt-6">
        <Text>Let’s sign in to Virtual Finland</Text>
        <Button
          onClick={loginHandler}
          disabled={isLoading || !permissionGranted}
          className="!w-auto"
        >
          {isLoading ? 'Redirecting...' : 'Sign in with testbed'}
        </Button>
      </div>
    </Page.Block>
  );
}
