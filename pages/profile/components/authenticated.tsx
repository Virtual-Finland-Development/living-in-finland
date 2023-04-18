import { useRouter } from 'next/router';
import { Button, Text } from 'suomifi-ui-components';
import tw, { css } from 'twin.macro';
import {
  useJobApplicantProfile,
  usePersonBasicInfo,
} from '@/lib/hooks/profile';
import { useModal } from '@/context/modal-context';
import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';
import DangerButton from '@/components/ui/danger-button';
import Loading from '@/components/ui/loading';
import ProfileDeleteConfirmation from './profile-delete-confirmation';

export default function ProfileAuthenticated() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const { data: personBasicInformation, isLoading: basicInformationLoading } =
    usePersonBasicInfo();
  const {
    data: jobApplicationProfile,
    isLoading: jobApplicationProfileLoading,
  } = useJobApplicantProfile();

  const isLoading = basicInformationLoading || jobApplicationProfileLoading;

  const onDelete = () =>
    openModal({
      title: 'Delete profile',
      content: <ProfileDeleteConfirmation onCancel={closeModal} />,
      onClose: closeModal,
      closeOnEsc: false,
    });

  return (
    <>
      {isLoading ? (
        <Page.Block className="bg-white flex items-center justify-center min-h-[200px]">
          <Loading />
        </Page.Block>
      ) : (
        <Page.Block className="bg-white">
          <div className="flex flex-col gap-6 items-start">
            <div className="flex flex-row items-center">
              <CustomHeading variant="h2" suomiFiBlue="dark">
                Profile
              </CustomHeading>
            </div>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
              tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid
              ex ea commodi consequat. Quis aute iure reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              obcaecat cupiditat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </Text>
            <Button onClick={() => router.push('/profile/personal-profile')}>
              Your personal profile
            </Button>
            <Button onClick={() => router.push('/profile/working-profile')}>
              Your working profile
            </Button>
            {(personBasicInformation || jobApplicationProfile) && (
              <DangerButton onClick={onDelete}>
                Delete your profile
              </DangerButton>
            )}
          </div>
        </Page.Block>
      )}
    </>
  );
}
