import { useRouter } from 'next/router';
import { Button, StaticIcon, Text } from 'suomifi-ui-components';
import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';
import CustomLink from '@/components/ui/custom-link';

export default function ProfileAuthenticated() {
  const router = useRouter();

  return (
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
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex
          ea commodi consequat. Quis aute iure reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat
          cupiditat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum.
        </Text>
        <Button onClick={() => router.push('/profile/personal-profile')}>
          Your personal profile
        </Button>
        <Button onClick={() => router.push('/profile/working-profile')}>
          Your working profile
        </Button>
      </div>
    </Page.Block>
  );
}
