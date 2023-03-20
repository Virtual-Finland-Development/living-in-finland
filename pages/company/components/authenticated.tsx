import { useRouter } from 'next/router';
import { Button, Text } from 'suomifi-ui-components';
import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';

export default function Authenticated() {
  const router = useRouter();

  return (
    <>
      <Page.Block className="bg-white">
        <div className="flex flex-col gap-6 items-start">
          <CustomHeading variant="h2" suomiFiBlue="dark">
            Company establishment
          </CustomHeading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
            tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex
            ea commodi consequat. Quis aute iure reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Text>

          <Button onClick={() => router.push('/company/establishment')}>
            Establish company
          </Button>
        </div>

        <div className="flex flex-col mt-8 gap-6 items-start">
          <CustomHeading variant="h2" suomiFiBlue="dark">
            Modify company
          </CustomHeading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
            tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex
            ea commodi consequat. Quis aute iure reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Text>
          <Button onClick={() => router.push('/company/edit')}>
            Modify existing companies
          </Button>
        </div>

        <div className="flex flex-col mt-8 gap-6 items-start">
          <CustomHeading variant="h2" suomiFiBlue="dark">
            Search companies
          </CustomHeading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
            tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex
            ea commodi consequat. Quis aute iure reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Text>
          <Button onClick={() => router.push('/company/search')}>
            Search companies
          </Button>
        </div>
      </Page.Block>
    </>
  );
}
