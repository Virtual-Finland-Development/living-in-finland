import { Block } from 'suomifi-ui-components';
import { Button } from 'suomifi-ui-components';
import {
  CompanyContextConsumer,
  CompanyContextProvider,
} from '@/context/company-context';
import Page from '@/components/layout/page';
import CompanyRegistrant from '../components/company-form-1-registrant';
import CompanyDetails from '../components/company-form-2-details';
import CompanyAddress from '../components/company-form-3-address';
import CompanyShares from '../components/company-form-4-shares';
import CompanyDirectors from '../components/company-form-5-directors';
import CompanyMembers from '../components/company-form-6-members';
import CompanyWizardNav from '../components/company-wizard-nav';

const companyWizardSteps = [
  <CompanyRegistrant key="registrant" />,
  <CompanyDetails key="details" />,
  <CompanyAddress key="address" />,
  <CompanyShares key="shares" />,
  <CompanyDirectors key="directors" />,
  <CompanyMembers key="members" />,
];

export default function Establishment() {
  return (
    <Page title="Company Establishment">
      <CompanyContextProvider>
        <CompanyContextConsumer>
          {provider => {
            if (!provider) {
              return null;
            }

            const { steps, step, setStep } = provider;

            return (
              <>
                <div className="block md:hidden px-4 py-6">
                  <div className="border">
                    <CompanyWizardNav />
                  </div>
                </div>

                <Block variant="section" className="bg-white">
                  <div className="flex flex-col md:flex-row">
                    <div className="hidden md:block border-r px-4 py-6 flex-shrink-0">
                      <CompanyWizardNav />
                    </div>
                    <div className="px-4 py-6 w-full">
                      {step > 0 && (
                        <Button
                          variant="secondary"
                          onClick={() => setStep(step - 1)}
                        >
                          Back
                        </Button>
                      )}
                      {companyWizardSteps[step]}
                    </div>
                  </div>
                </Block>
              </>
            );
          }}
        </CompanyContextConsumer>
      </CompanyContextProvider>
    </Page>
  );
}