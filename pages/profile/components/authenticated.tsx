import { StaticIcon, Text } from 'suomifi-ui-components';
import { useProfile } from '@/lib/hooks/profile';
import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';
import Loading from '@/components/ui/loading';
import ProfileForm from './profile-form';

export default function ProfileAuthenticated() {
  const { data: profile, isLoading, isFetching, error } = useProfile();

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <>
      <Page.Block className="bg-suomifi-blue-bg-light">
        <div className="flex flex-col gap-6">
          <div className="flex flex-row items-center">
            <StaticIcon icon="userProfile" className="h-16 w-16" />
            <CustomHeading variant="h2" suomiFiBlue="dark">
              Let’s create your profile
            </CustomHeading>
          </div>
          <Text>
            Please choose the best described options of yourself. This
            information is under your control all the time and you will decide
            to whom you want to share it.
          </Text>
        </div>
      </Page.Block>
      <Page.Block className="bg-white">
        <div className="flex flex-col gap-6">
          <CustomHeading variant="h2" suomiFiBlue="dark">
            Personal information
          </CustomHeading>
          <ProfileForm profile={profile} />
        </div>
      </Page.Block>
    </>
  );
}
