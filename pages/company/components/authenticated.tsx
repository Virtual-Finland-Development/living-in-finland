import { useRouter } from 'next/router';
import { Button, Text } from 'suomifi-ui-components';
import { useCompanies } from '@/lib/hooks/companies';
import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';
import CustomLink from '@/components/ui/custom-link';
import CustomText from '@/components/ui/custom-text';
import Loading from '@/components/ui/loading';

export default function Authenticated() {
  const { data: companies, isLoading, isFetching } = useCompanies();
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
          {isLoading || isFetching ? (
            <Loading />
          ) : (
            <>
              {!companies?.length ? (
                <CustomText $bold>No companies established.</CustomText>
              ) : (
                <div className="flex flex-col gap-4">
                  {companies.map((company, index) => (
                    <CustomLink
                      key={company.nationalIdentifier}
                      href={`/company/edit/${company.nationalIdentifier}`}
                    >{`${index + 1}. ${
                      company.data.companyDetails.name
                    }`}</CustomLink>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </Page.Block>
    </>
  );
}
