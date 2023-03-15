import ExportedImage from 'next-image-export-optimizer';
import { useState } from 'react';
import { Button, Text } from 'suomifi-ui-components';
import { StaticIcon } from 'suomifi-ui-components';
import api from '@/lib/api';
import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';
import CustomText from '@/components/ui/custom-text';
import manLaptopImage from '../../../public/images/man-laptop.jpg';

export default function NotAuthenticated() {
  const [isLoading, setLoading] = useState(false);

  const loginHandler = () => {
    setLoading(true);
    api.auth.directToAuthGwLogin('/company');
  };

  return (
    <>
      <Page.Block className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 lg:-mx-12">
          <div className="bg-suomifi-light text-white flex flex-col gap-8 items-center justify-center px-4 py-8">
            <div className="hidden md:block">
              <StaticIcon
                icon="buildings"
                className="h-16 w-16 flex-shrink-0 bg-white rounded-full"
              />
            </div>
            <CustomHeading variant="h2" center>
              Establish a company or modify company information
            </CustomHeading>
            <CustomText $center>
              Identify yourself into Company. You can then establish a company
              or modify existing company information.
            </CustomText>
            <Button
              icon="login"
              variant="inverted"
              onClick={loginHandler}
              disabled={isLoading}
            >
              {isLoading ? 'Redirecting...' : 'Identification'}
            </Button>
          </div>
          <div className="hidden md:block relative">
            <ExportedImage
              src={manLaptopImage}
              alt="Man with laptop"
              className="object-cover h-full w-full"
              width={537}
              height={395}
              priority
            />
          </div>
        </div>
        <div className="flex flex-col mt-8 gap-6">
          <CustomHeading variant="h2" suomiFiBlue="dark">
            Company page header
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
        </div>
      </Page.Block>
    </>
  );
}
